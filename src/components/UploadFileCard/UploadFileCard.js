import React, { useState, useContext } from 'react';
import { Card, CustomFileInput, HelperText, ErrorText } from './FileCard';
import styled from 'styled-components';
import Button from '../Elements/Button';
import { mainContext } from '../../state';
import { Buffer } from 'buffer';
import { useWeb3React } from '@web3-react/core';
import { create } from 'ipfs-http-client';
import * as ethUtil from 'ethereumjs-util';
import { encrypt } from 'eth-sig-util';
import { toast, ZRNG, getFileNameWithExt } from '../../utils';
import Dialog from '../Dialog';
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!../../workers/encrypt.js';

const SubmitButton = styled(Button)`
	margin-top: ${(props) => props.theme.spacing(4)};
	@media only screen and (max-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		margin-top: 0;
	}
`;

const ActionFooter = styled.div`
	display: flex;
	justify-content: center;
`;
const ref = React.createRef();

const UploadFileCard = ({
	showSelected,
	buttonLabel,
	label,
	helperText,
	name,
	value,
	error,
	setError,
	disableUpload,
	onChange,
	request,
}) => {
	const [isSubmitting, setSubmitting] = useState(false);
	const [dialogMessage, setDialogMessage] = useState('');
	const { account } = useWeb3React();
	const { appState } = useContext(mainContext);

	const clearSubmitDialog = () => {
		setSubmitting(false);
		setDialogMessage('');
		if (ref.current !== null) ref.current.value = null;
	};

	const submitSignal = () => {
		if (ref !== null) {
			if (account) {
				if (ref.current.value !== null && ref.current.value !== '') {
					setSubmitting(true);
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
						file: ref.current.files[0],
					});

					workerInstance.addEventListener('message', async (event) => {
						if (event.data.type === 'feedback') {
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
									FILE_EXT: getFileNameWithExt(ref)[1],
									FILE_NAME: getFileNameWithExt(ref)[0],
									FILE_MIMETYPE: getFileNameWithExt(ref)[2],
								};

								/* encrypted is an array */
								const fileStuffResponse = await ipfs.add(JSON.stringify(fileStuff), {
									pin: true,
								});

								setDialogMessage('awaiting confirmation');
								appState.contract.methods
									.contribute(
										request.requestID,
										account, // angel
										account, // laboratory
										true, // true: angel receives reward. false: laboratory receives reward.
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
												if (ref.current !== null) ref.current.value = null;
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

	return (
		<Card data-tour="request-details-three">
			<Dialog isOpen={isSubmitting} content={dialogMessage} hasSpinner type="success" />
			<CustomFileInput
				hasBorder
				disableUpload={disableUpload}
				showSelected={showSelected}
				buttonLabel={buttonLabel}
				label={label}
				ref={ref}
				name={name}
				value={value}
				onChange={(e) => {
					if (e.target.value !== '' && e.target.value !== null) {
						setError(null);
						onChange(e);
					}
				}}
			/>
			<HelperText>{helperText}</HelperText>
			<ErrorText>{error}</ErrorText>
			<ActionFooter>
				<SubmitButton disabled={error !== null} variant="primary" onClick={submitSignal}>
					Submit
				</SubmitButton>
			</ActionFooter>
		</Card>
	);
};

export default UploadFileCard;
