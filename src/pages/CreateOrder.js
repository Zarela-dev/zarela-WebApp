import React, { useState, useEffect, useContext, useRef } from 'react';
import { Buffer } from 'buffer';
import { web3Context } from '../web3Provider';
import { useHistory } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import styled from 'styled-components';
import TitleBar from '../components/TitleBar';
import CreateOrderForm from '../components/CreateOrderForm';
import maxWidthWrapper from '../components/Elements/MaxWidth';
import ConnectDialog from '../components/Dialog/ConnectDialog';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Persist } from 'formik-persist';
import { toast } from '../utils';
import Dialog from '../components/Dialog';

const Wrapper = styled.div`
	${maxWidthWrapper}
`;

// #todo sync form data with localStorage
const CreateOrder = () => {
	const fileRef = useRef(null);
	const { Web3 } = useContext(web3Context);
	const [showDialog, setDialog] = useState(false);
	const history = useHistory();
	const [isUploading, setUploading] = useState(false);
	const [dialogMessage, setDialogMessage] = useState('');

	const clearSubmitDialog = () => {
		setUploading(false);
		setDialogMessage('');
		formik.setSubmitting(false);

		if (fileRef.current !== null)
			fileRef.current.value = null;
	};
	const validationErrors = {
		required: name => `${name} is required to create your order.`,
		notEnoughTokens: 'you do not have enough tokens to create this order.',
		terms: 'you must agree to the term before submitting your order',
		number: name => `${name} must be a number`,
		string: name => `${name} must be a string`,
	};

	const formik = useFormik({
		initialValues: {
			title: '',
			desc: '',
			tokenPay: '',
			instanceCount: '',
			category: '',
			zpaper: '',
			terms: false
		},
		validationSchema: yup.object().shape({
			title: yup.string(validationErrors.string('title')).required(validationErrors.required('title')),
			desc: yup.string(validationErrors.string('description')).required(validationErrors.required('description')),
			tokenPay: yup.number().typeError(validationErrors.number('Allocated Biobits')).required(validationErrors.required('Allocated Biobit')),
			instanceCount: yup.number().typeError(validationErrors.number('Contributors')).required(validationErrors.required('Contributors')),
			category: yup.string().required(validationErrors.required('category')),
			zpaper: yup.mixed(),
			terms: yup.boolean().required()
		}),
		onSubmit: (values => {
			if (formik.isValid) {
				if (+values.tokenPay * +values.instanceCount > +Web3.biobitBalance / Math.pow(10, 9)) {
					formik.setFieldError('tokenPay', validationErrors.notEnoughTokens);
					formik.setSubmitting(false);
				} else {
					if (!values.terms) {
						formik.setFieldError('terms', validationErrors.terms);
						formik.setSubmitting(false);
					} else {
						if (Web3.accounts.length > 0) {
							setDialog(false);
							if (fileRef.current.value !== null && fileRef.current.value !== '') {
								setUploading(true);
								setDialogMessage('in order to secure the file, so only you can access it we require your public key to encrypt the file');

								const { title, desc, tokenPay, instanceCount, category } = values;
								const reader = new FileReader();

								window.ethereum
									.request({
										method: 'eth_getEncryptionPublicKey',
										params: [Web3.accounts[0]], // you must have access to the specified account
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
												let url = `${process.env.REACT_APP_IPFS_LINK + ipfsResponse.path}`;
												console.log(`Document Of Conditions --> ${url}`);

												setDialogMessage('awaiting confirmation');

												Web3.contract.methods.SetOrderBoard(title, desc, ipfsResponse.path, +tokenPay * Math.pow(10, 9), instanceCount, category, encryptionPublicKey)
													.send({ from: Web3.accounts[0], to: process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS, gasPrice: +Web3.gas.average * Math.pow(10, 8) }, (error, result) => {
														if (!error) {
															clearSubmitDialog();
															toast(result, 'success', true, result);
														}
														else {
															clearSubmitDialog();
															toast(error.message, 'error');
														}
													});


												Web3.contract.events.OrderRegistered({})
													.on('data', (event) => {
														clearSubmitDialog();

														toast(
															`Transaction #${event.returnValues[1]} has been created successfully.`,
															'success',
															false,
															null,
															{
																toastId: event.id
															}
														);
														history.push(`/order/${event.returnValues[1]}`);

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
											console.log("We can't encrypt anything without the key.");
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
		})
	});

	useEffect(() => {
		if (Web3.accounts.length > 0) {
			setDialog(false);
			formik.setSubmitting(false);
		}
	}, [Web3.accounts.length]);

	return (
		<>
			<TitleBar>
				Create Request
			</TitleBar>
			<Wrapper>
				{
					<>
						<Dialog
							isOpen={isUploading}
							content={(
								dialogMessage
							)}
							onClose={() => {
								clearSubmitDialog();
							}}
							hasSpinner
							type='success'
						/>
						<ConnectDialog isOpen={showDialog} onClose={() => {
							formik.setSubmitting(false);
							setDialog(false);
						}} />
						<CreateOrderForm
							formik={formik}
							ref={fileRef}
						>
							<Persist />
						</CreateOrderForm>
					</>
				}
			</Wrapper>
		</>
	);
};

export default CreateOrder;