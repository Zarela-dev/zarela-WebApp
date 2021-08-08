import React, { useState, useEffect, useContext, useRef } from 'react';
import { Buffer } from 'buffer';
import { mainContext } from '../state';
import { useHistory } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import styled from 'styled-components';
import TitleBar from '../components/TitleBar/TitleBar';
import CreateRequestForm from '../components/CreateRequestForm';
import maxWidthWrapper from '../components/Elements/MaxWidth';
import ConnectDialog from '../components/Dialog/ConnectDialog';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Persist } from 'formik-persist';
import { toast } from '../utils';
import Dialog from '../components/Dialog';
import { useWeb3React } from '@web3-react/core';
import NoMobileSupportMessage from '../components/NoMobileSupportMessage';

const Wrapper = styled.div`
	${maxWidthWrapper}
`;

// #todo sync form data with localStorage
const CreateRequest = () => {
	const fileRef = useRef(null);
	const { appState } = useContext(mainContext);
	const [showDialog, setDialog] = useState(false);
	const history = useHistory();
	const [isUploading, setUploading] = useState(false);
	const [dialogMessage, setDialogMessage] = useState('');
	const { account } = useWeb3React();

	const clearSubmitDialog = () => {
		setUploading(false);
		setDialogMessage('');
		formik.setSubmitting(false);

		if (fileRef.current !== null) fileRef.current.value = null;
	};
	const validationErrors = {
		required: (name) => `${name} is required to create your request.`,
		notEnoughTokens: 'you do not have enough tokens to create this request.',
		terms: 'you must agree to the term before submitting your request',
		number: (name) => `${name} must be a number`,
		string: (name) => `${name} must be a string`,
	};

	const formik = useFormik({
		initialValues: {
			title: '',
			desc: '',
			tokenPay: '',
			instanceCount: '',
			category: [],
			zpaper: '',
			terms: false,
		},
		validationSchema: yup.object().shape({
			title: yup
				.string(validationErrors.string('title'))
				.required(validationErrors.required('title')),
			desc: yup
				.string(validationErrors.string('description'))
				.required(validationErrors.required('description')),
			tokenPay: yup
				.number()
				.typeError(validationErrors.number('Allocated Biobits'))
				.required(validationErrors.required('Allocated Biobit')),
			instanceCount: yup
				.number()
				.typeError(validationErrors.number('Contributors'))
				.required(validationErrors.required('Contributors')),
			category: yup.array().required(validationErrors.required('category')),
			zpaper: yup.mixed(),
			terms: yup.boolean().required(),
		}),
		onSubmit: (values) => {
			console.log('values', values);
			if (formik.isValid) {
				if (
					+values.tokenPay * +values.instanceCount >
					+appState.biobitBalance / Math.pow(10, 9)
				) {
					formik.setFieldError('tokenPay', validationErrors.notEnoughTokens);
					formik.setSubmitting(false);
				} else {
					if (!values.terms) {
						formik.setFieldError('terms', validationErrors.terms);
						formik.setSubmitting(false);
					} else {
						if (account) {
							setDialog(false);
							if (fileRef.current.value !== null && fileRef.current.value !== '') {
								setUploading(true);
								setDialogMessage(
									'in request to secure the file, so only you can access it we require your public key to encrypt the file'
								);

								const { title, desc, tokenPay, instanceCount, category } = values;
								const reader = new FileReader();

								window.ethereum
									.request({
										method: 'eth_getEncryptionPublicKey',
										params: [account], // you must have access to the specified account
									})
									.then((result) => {
										setDialogMessage('uploading to ipfs');

										const encryptionPublicKey = result;
										reader.readAsArrayBuffer(fileRef.current.files[0]); // Read Provided File

										reader.onloadend = async () => {
											const ipfs = create(process.env.REACT_APP_IPFS); // Connect to IPFS
											const buf = Buffer(reader.result); // Convert data into buffer

											try {
												const ipfsResponse = await ipfs.add(buf);
												formik.setFieldValue('zpaper', ipfsResponse.path);
												let url = `${
													process.env.REACT_APP_IPFS_LINK +
													ipfsResponse.path
												}`;
												console.log(`Document Of Conditions --> ${url}`);

												setDialogMessage('awaiting confirmation');

												appState.contract.methods
													.SetOrderBoard(
														title,
														desc,
														ipfsResponse.path,
														+tokenPay * Math.pow(10, 9),
														instanceCount,
														category,
														encryptionPublicKey
													)
													.send(
														{
															from: account,
															to: process.env
																.REACT_APP_ZARELA_CONTRACT_ADDRESS,
															gasPrice:
																+appState.gas.average *
																Math.pow(10, 8),
														},
														(error, result) => {
															if (!error) {
																clearSubmitDialog();
																toast(
																	result,
																	'success',
																	true,
																	result
																);
															} else {
																clearSubmitDialog();
																toast(error.message, 'error');
															}
														}
													);

												appState.contract.events
													.OrderRegistered({})
													.on('data', (event) => {
														clearSubmitDialog();

														toast(
															`Transaction #${event.returnValues[1]} has been created successfully.`,
															'success',
															false,
															null,
															{
																toastId: event.id,
															}
														);
														history.push(
															`/request/${event.returnValues[1]}`
														);
													})
													.on('error', (error, receipt) => {
														clearSubmitDialog();

														toast(error.message, 'error');
														console.error(error, receipt);
													});
											} catch (error) {
												console.error(error);
											}
										};
									})
									.catch((error) => {
										if (error.code === 4001) {
											// EIP-1193 userRejectedRequest error
											clearSubmitDialog();
											console.log(
												"We can't encrypt anything without the key."
											);
										} else {
											console.error(error);
										}
									});
							} else {
								formik.setFieldError('zpaper', 'please select files to upload');
							}
						} else {
							setDialog(true);
						}
					}
				}
			}
		},
	});

	useEffect(() => {
		if (account > 0) {
			setDialog(false);
			formik.setSubmitting(false);
		}
	}, [account]);

	return (
		<>
			<TitleBar>Create Request</TitleBar>
			<Wrapper>
				{appState.isMobile ? (
					<NoMobileSupportMessage />
				) : (
					<>
						<Dialog
							isOpen={isUploading}
							content={dialogMessage}
							onClose={() => {
								clearSubmitDialog();
							}}
							hasSpinner
							type="success"
						/>
						<ConnectDialog
							isOpen={showDialog}
							onClose={() => {
								formik.setSubmitting(false);
								setDialog(false);
							}}
						/>
						<CreateRequestForm formik={formik} ref={fileRef}>
							<Persist />
						</CreateRequestForm>
					</>
				)}
			</Wrapper>
		</>
	);
};

export default CreateRequest;
