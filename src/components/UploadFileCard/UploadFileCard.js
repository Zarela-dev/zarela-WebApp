import React, { useState, useContext, useEffect } from 'react';
import { Card, CustomFileInput, HelperText, ErrorText } from './FileCard';
import { mainContext } from '../../state';
import { Buffer } from 'buffer';
import { useWeb3React } from '@web3-react/core';
import { create } from 'ipfs-http-client';
import * as ethUtil from 'ethereumjs-util';
import Button from '../Elements/Button';
import { encrypt } from 'eth-sig-util';
import { toast, ZRNG, getFileNameWithExt } from '../../utils';
import Dialog from '../Dialog';
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!../../workers/encrypt.js';
import ContributionForm from './ContributionForm';
import styled from 'styled-components';

const StickyButton = styled(Button)`
	position: fixed;
	bottom: 70px;
	left: 50%;
	transform: translate(-50%);
	height: 34px;

	& > * {
		font-size: 12px;
		padding: 0 ${(props) => props.theme.spacing(2)};
	}
`;

const fileInputRef = React.createRef();

const UploadFileCard = (props) => {
	const { buttonLabel, label, helperText, error, setError, disableUpload, request, isMobile } = props;
	const [isContributing, setIsContributing] = useState(false);
	const [isSubmittingFile, setSubmittingFile] = useState(false);
	const [hasSpinner, setSpinner] = useState(false);
	const [isClosable, setClosable] = useState(true);
	const [dialogMessage, setDialogMessage] = useState('');
	const { account } = useWeb3React();
	const { appState } = useContext(mainContext);

	const clearSubmitDialog = () => {
		setIsContributing(false);
		setSubmittingFile(false);
		setSpinner(false);
		setClosable(true);
		setDialogMessage('');
		if (fileInputRef.current !== null) fileInputRef.current.value = null;
	};

	useEffect(() => {
		if (isSubmittingFile === false)
			setDialogMessage(
				<ContributionForm ref={fileInputRef} submitSignal={submitSignal} fileInputProps={props} />
			);
	}, [fileInputRef.current?.files]);

	const submitSignal = (angelAddress, hubAddress, rewardGainer) => {
		const fileRef = { ...fileInputRef };

		if (fileRef !== null) {
			if (account) {
				if (fileRef.current.value !== null && fileRef.current.value !== '') {
					setIsContributing(true);
					setSubmittingFile(true);
					setSpinner(true);
					setClosable(false);
					setDialogMessage('encrypting file');
					const workerInstance = worker();

					workerInstance.initEncrypt();

					const ipfs = create(process.env.REACT_APP_IPFS); // Connect to IPFS
					// generate AES keys
					const AES_IV = ZRNG();
					const AES_KEY = ZRNG();

					workerInstance.postMessage({
						AES_IV,
						AES_KEY,
						file: fileRef.current.files[0],
					});

					workerInstance.addEventListener('message', async (event) => {
						if (event.data.type === 'encryption:error') {
							clearSubmitDialog();
							console.error(error);
							toast(
								error.message ||
									'there was an error uploading your signal, please try again or reach support for help.',
								'error'
							);
						}
						if (event.data.type === 'encryption:feedback') {
							setDialogMessage(event.data.message);
						}
						if (event.data.type === 'encryption') {
							try {
								// AES key encryption using Metamask
								const encryptedAesKey = ethUtil.bufferToHex(
									Buffer.from(
										JSON.stringify(
											encrypt(
												request.encryptionPublicKey,
												{ data: AES_KEY.toString() },
												'x25519-xsalsa20-poly1305'
											)
										),
										'utf8'
									)
								);
								/* 
									to download file later (in the inbox page) with proper name and extension,
									here we store these meta information in an object on IPFS then we store this IPFS
									hash on the blockchain using our SC contribute method.
								*/
								const fileStuff = {
									AES_KEY: encryptedAesKey,
									AES_IV,
									FILE_EXT: getFileNameWithExt(fileRef)[1],
									FILE_NAME: getFileNameWithExt(fileRef)[0],
									FILE_MIMETYPE: getFileNameWithExt(fileRef)[2],
								};

								/* encrypted is an array */
								const fileStuffResponse = await ipfs.add(JSON.stringify(fileStuff), {
									pin: true,
								});

								setDialogMessage('Approve it from your Wallet');
								appState.contract.methods
									.contribute(
										request.requestID,
										angelAddress, // angel
										hubAddress, // laboratory
										rewardGainer === 'angel' ? true : false, // true: angel receives reward. false: laboratory receives reward.
										request.requesterAddress,
										event.data.ipfs_path, // encrypted file CID
										fileStuffResponse.path // file metadata CID
									)
									.send(
										{
											from: account,
										},
										(error, result) => {
											if (!error) {
												clearSubmitDialog();
												toast(`TX Hash: ${result}`, 'success', true, result, {
													toastId: result,
												});
												if (fileInputRef.current !== null) fileInputRef.current.value = null;
											} else {
												clearSubmitDialog();
												toast(error.message, 'error');
											}
										}
									);
							} catch (error) {
								clearSubmitDialog();
								console.error(error);
							}
						}
					});
				} else {
					setError('please select files to upload');
				}
			}
		}
	};

	if (isMobile)
		return (
			<>
				<Dialog
					isOpen={isContributing}
					content={dialogMessage}
					onClose={isClosable ? () => clearSubmitDialog() : false}
					hasSpinner={hasSpinner}
					type="success"
				/>
				<StickyButton
					variant="primary"
					onClick={() => {
						setIsContributing(true);
						setDialogMessage(
							<ContributionForm ref={fileInputRef} submitSignal={submitSignal} fileInputProps={props} />
						);
					}}
				>
					Contribute
				</StickyButton>
			</>
		);
	return (
		<Card data-tour="request-details-three">
			<Dialog
				isOpen={isContributing}
				content={dialogMessage}
				onClose={isClosable ? () => clearSubmitDialog() : false}
				hasSpinner={hasSpinner}
				type="success"
			/>
			<CustomFileInput
				hasBorder
				disableUpload={disableUpload}
				buttonLabel={buttonLabel}
				label={label}
				onClick={() => {
					setIsContributing(true);
					setDialogMessage(
						<ContributionForm ref={fileInputRef} submitSignal={submitSignal} fileInputProps={props} />
					);
				}}
			/>
			<HelperText>{helperText}</HelperText>
			{error ? <ErrorText>{error}</ErrorText> : null}
		</Card>
	);
};

export default UploadFileCard;
