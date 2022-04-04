import React, { useState, useEffect, useCallback } from 'react';
import { Card, CustomFileInput, HelperText, ErrorText } from './FileCard';
import { Buffer } from 'buffer';
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
import { ThemeButton } from './../Elements/Button';
import { BodyText } from './../Elements/Typography';

const StickyButton = styled(ThemeButton)`
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
			setDialogMessage(<ContributionForm ref={fileInputRef} submitSignal={submitSignal} fileInputProps={props} />);
	}, [fileInputRef.current?.files]);

	const submitSignal = (angelAddress, hubAddress, rewardGainer, _account, _contract) => {
		const fileRef = { ...fileInputRef };
		if (fileRef !== null) {
			if (_account) {
				if (fileRef.current.value !== null && fileRef.current.value !== '') {
					setIsContributing(true);
					setSubmittingFile(true);
					setSpinner(true);
					setClosable(false);
					setDialogMessage('encrypting file');
					const workerInstance = worker();

					workerInstance.initEncrypt();

					const ipfs = create(process.env.REACT_APP_IPFS); // Connect to IPFS
					// generate KEY and NONCE for chacha20 encryption
					const KEY = ZRNG();
					const NONCE = ZRNG();

					workerInstance.postMessage({
						KEY,
						NONCE,
						file: fileRef.current.files[0],
					});

					workerInstance.addEventListener('message', async (event) => {
						if (event.data.type === 'terminate') {
							workerInstance.terminate();
						}
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
								const fileMeta = {
									NONCE,
									KEY,
									FILE_EXT: getFileNameWithExt(fileRef)[1],
									FILE_NAME: getFileNameWithExt(fileRef)[0],
									FILE_MIMETYPE: getFileNameWithExt(fileRef)[2],
								};
								// AES key encryption using Metamask
								const encryptedFileMeta = ethUtil.bufferToHex(
									Buffer.from(
										JSON.stringify(
											encrypt(
												request.encryptionPublicKey,
												{ data: JSON.stringify(fileMeta) },
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
								/* encrypted is an array */
								const fileMetaResponse = await ipfs.add(encryptedFileMeta, {
									pin: true,
								});

								setDialogMessage('Approve it from your Wallet');
								_contract
									.contribute(
										request.requestID,
										angelAddress, // angel
										hubAddress, // laboratory
										rewardGainer === 'angel' ? true : false, // true: angel receives reward. false: laboratory receives reward.
										request.requesterAddress,
										event.data.ipfs_path, // encrypted file CID
										fileMetaResponse.path, // file metadata CID
										{ from: _account }
									)
									.then((result) => {
										clearSubmitDialog();
										toast(`TX Hash: ${result}`, 'success', true, result, {
											toastId: result,
										});
										if (fileInputRef.current !== null) fileInputRef.current.value = null;
									})
									.catch((error) => {
										console.error(error);
										clearSubmitDialog();
										toast(error.message || error, 'error');
									});
							} catch (error) {
								clearSubmitDialog();
								console.error(error);
							}
						}
					});
				} else {
					setError('please select files to upload');
				}
			} else {
				toast('no account found', 'error');
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
					size="medium"
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
					setDialogMessage(<ContributionForm ref={fileInputRef} submitSignal={submitSignal} fileInputProps={props} />);
				}}
			/>
			<BodyText variant="timestamp" mt={5}>
				{helperText}
			</BodyText>
			{error ? (
				<BodyText variant="timestamp" color="error" mt={5}>
					{error}
				</BodyText>
			) : null}
		</Card>
	);
};

export default UploadFileCard;
