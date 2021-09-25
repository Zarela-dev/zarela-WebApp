import React, { useState, useEffect, useContext, useRef } from 'react';
import { Buffer } from 'buffer';
import { mainContext } from '../state';
import { useHistory } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import styled from 'styled-components';
import TitleBar from '../components/TitleBar/TitleBar';
import CreateRequestForm from '../components/createRequest/CreateRequestForm';
import maxWidthWrapper from '../components/Elements/MaxWidth';
import ConnectDialog from '../components/Dialog/ConnectDialog';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Persist } from 'formik-persist';
import { getFileNameWithExt, toast } from '../utils';
import Dialog from '../components/Dialog';
import { useWeb3React } from '@web3-react/core';
import NoMobileSupportMessage from '../components/NoMobileSupportMessage';
import { hexToRgb } from '@material-ui/core';
import { actionTypes } from '../state';

const Wrapper = styled.div`
	${maxWidthWrapper}
`;

// #todo sync form data with localStorage
const CreateRequest = () => {
	const fileRef = useRef(null);
	const { appState, dispatch } = useContext(mainContext);
	const [showDialog, setDialog] = useState(false);
	const history = useHistory();
	const [isUploading, setUploading] = useState(false);
	const [dialogMessage, setDialogMessage] = useState('');
	const { account, library } = useWeb3React();

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
		enableReinitialize: true,
		initialValues: {
			title: '',
			desc: '',
			angelTokenPay: '',
			laboratoryTokenPay: '',
			instanceCount: '',
			category: [],
			zpaper: '',
			terms: false,
		},
		validationSchema: yup.object().shape({
			title: yup.string(validationErrors.string('title')).required(validationErrors.required('title')),
			desc: yup.string(validationErrors.string('description')).required(validationErrors.required('description')),
			angelTokenPay: yup
				.number()
				.typeError(validationErrors.number('Angel Allocated Biobits'))
				.required(validationErrors.required('Angel Allocated Biobit')),
			laboratoryTokenPay: yup
				.number()
				.typeError(validationErrors.number('Lab Allocated Biobits'))
				.required(validationErrors.required('Lab Allocated Biobit')),
			instanceCount: yup
				.number()
				.typeError(validationErrors.number('Contributors'))
				.required(validationErrors.required('Contributors')),
			category: yup.array().min(1, validationErrors.required('category')),
			zpaper: yup.mixed(),
			terms: yup.boolean().required(),
		}),
		onSubmit: async (values) => {
			if (formik.isValid) {
				/* to prevent the Mage from submitting the request with insufficient assets */
				if (
					(+values.angelTokenPay + +values.laboratoryTokenPay) * +values.instanceCount >
					+appState.biobitBalance
				) {
					formik.setFieldError('angelTokenPay', validationErrors.notEnoughTokens);
					formik.setSubmitting(false);
				} else {
					if (!values.terms) {
						formik.setFieldError('terms', validationErrors.terms);
						formik.setSubmitting(false);
					} else {
						if (account) {
							setDialog(false);
							if (fileRef.current.value !== null && fileRef.current.value !== '') {
								const { title, desc, angelTokenPay, laboratoryTokenPay, instanceCount, category } =
									values;

								try {
									setUploading(true);
									setDialogMessage(
										'to secure your files, you need to provide your encryption public key (using Metamask)'
									);
									const encryptionPublicKey = await window.ethereum.request({
										method: 'eth_getEncryptionPublicKey',
										params: [account], // you must have access to the specified account
									});
									setDialogMessage('uploading to ipfs');

									const ipfs = create(process.env.REACT_APP_IPFS); // create IPFS instance, connecting to desired node

									try {
										// since it may take quite a while for a request to fulfill, we pin it
										// on IPFS so it'd be available for later uses
										const fileMeta = getFileNameWithExt(fileRef);

										const ipfsResponse = await ipfs.add(
											{
												content: fileRef.current.files[0],
												path: `${fileMeta[0]}.${fileMeta[1]}`,
											},
											{
												pin: true,
												wrapWithDirectory: true,
												progress: (uploaded) => {
													const uploadedPercent = Math.ceil(
														(uploaded / fileRef.current.files[0].size) * 100
													);

													setDialogMessage(`uploading to ipfs - ${uploadedPercent}%`);
												},
											}
											/*
											we use wrapWithDirectory option to be able to download the file with proper file name and extension later.
											*/
										);
										const zpaper_CID = ipfsResponse.cid.toString();

										formik.setFieldValue('zpaper', zpaper_CID);
										let url = `${process.env.REACT_APP_IPFS_LINK + zpaper_CID}`;
										console.log(`Zpaper --> ${url}`);

										setDialogMessage('Approve it from your Wallet');

										appState.contract.methods
											.submitNewRequest(
												title,
												desc,
												zpaper_CID,
												+angelTokenPay * Math.pow(10, 9), // angel
												+laboratoryTokenPay * Math.pow(10, 9), // laboratory
												instanceCount,
												category.map((item) => item.value).join(','),
												process.env.REACT_APP_ZARELA_BUSINESS_CATEGORY,
												encryptionPublicKey
											)
											.send(
												{
													from: account,
													to: process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS,
													gasPrice: +appState.gas.average * Math.pow(10, 8),
												},
												(error, result) => {
													if (!error) {
														clearSubmitDialog();
														toast(`TX Hash: ${result}`, 'success', true, result, {
															toastId: result,
														});
														history.replace(`/`);
														dispatch({
															type: actionTypes.SET_OLD_DATA_FORM,
															payload: {},
														});
														localStorage.removeItem('create_request_values');
													} else {
														clearSubmitDialog();
														toast(error.message, 'error');
													}
												}
											);
									} catch (error) {
										console.error(error);
									}
								} catch (error) {
									if (error.code === 4001) {
										// EIP-1193 userRejectedRequest error
										clearSubmitDialog();
										console.log("We can't encrypt anything without the key.");
									} else {
										console.error(error);
									}
								}
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account]);

	return (
		<>
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
						<CreateRequestForm formik={formik} ref={fileRef} appState={appState} dispatch={dispatch}>
							<Persist />
						</CreateRequestForm>
					</>
				)}
			</Wrapper>
		</>
	);
};

export default CreateRequest;
