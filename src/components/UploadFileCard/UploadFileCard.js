import React, { useState, useContext, useEffect } from 'react';
import { Card, CustomFileInput } from './FileCard';
import { mainContext } from '../../state';
import { Buffer } from 'buffer';
import { useWeb3React } from '@web3-react/core';
import { CID, create } from 'ipfs-http-client';
import * as ethUtil from 'ethereumjs-util';
import { encrypt } from 'eth-sig-util';
import { toast, ZRNG } from '../../utils';
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
			setDialogMessage(<ContributionForm ref={fileInputRef} submitSignal={submitSignal} fileInputProps={props} />);
	}, [fileInputRef.current?.files]);

	const submitSignal = async (angelAddress, hubAddress, rewardGainer) => {
		const fileRef = { ...fileInputRef };
		let uploadedFiles = [];

		if (fileRef !== null) {
			if (account) {
				if (fileRef.current.value !== null && fileRef.current.value !== '') {
					setIsContributing(true);
					setSubmittingFile(true);
					setSpinner(true);
					setClosable(false);
					setDialogMessage('encrypting file');
					// workerInstance.initEncrypt();

					const ipfs = create(process.env.REACT_APP_IPFS); // Connect to IPFS
					// generate KEY and NONCE for chacha20 encryption
					const KEY = ZRNG();
					const NONCE = ZRNG();

					for (let index = 0; index < fileRef.current.files.length; index++) {
						const file = fileRef.current.files[index];
						try {
							const workerInstance = worker();
							uploadedFiles.push(await workerInstance.encrypt(KEY, NONCE, file));
							workerInstance.terminate();
						} catch (error) {
							clearSubmitDialog();
							console.error(error);
							toast(
								error.message ||
									'there was an error uploading your signal, please try again or reach support for help.',
								'error'
							);
						}
					}
					console.log('result', uploadedFiles);
					try {
						const secretKeys = {
							NONCE,
							KEY,
						};
						// AES key encryption using Metamask
						const encryptedSecretKeys = ethUtil.bufferToHex(
							Buffer.from(
								JSON.stringify(
									encrypt(request.encryptionPublicKey, { data: JSON.stringify(secretKeys) }, 'x25519-xsalsa20-poly1305')
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
						const encryptedSecretKeysCID = await ipfs.dag.put(
							{ encryptedSecretKeys },
							{
								storeCodec: 'dag-cbor',
								pin: false,
							}
						);
						setDialogMessage('Approve it from your Wallet');
						const directory = await ipfs.dag.put(
							{
								[request.requestID]: {
									contributions: {
										[account]: {
											key: encryptedSecretKeysCID,
											files: uploadedFiles.map((file) => ({ cid: CID.parse(file.fileContentCID) })),
										},
									},
								},
							},
							{
								storeCodec: 'dag-cbor',
							}
						);

						console.log('container node', directory);
						appState.contract.methods
							.contribute(
								request.requestID,
								angelAddress, // angel
								hubAddress, // laboratory
								rewardGainer === 'angel' ? true : false, // true: angel receives reward. false: laboratory receives reward.
								request.requesterAddress,
								directory.toString(), // encrypted file CID
								encryptedSecretKeysCID.toString() // file metadata CID
								// note: after using dags in IPFS, we can remove this from Smart Contract parameters to reduce transaction fee.
							)
							.send(
								{
									from: account,
								},
								async (error, result) => {
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
