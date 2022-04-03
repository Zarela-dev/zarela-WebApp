import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import styled from 'styled-components';
import CreateRequestForm from '../components/createRequest/CreateRequestForm';
import maxWidthWrapper from '../components/Elements/MaxWidth';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getFileNameWithExt, toast } from '../utils';
import Dialog from '../components/Dialog';
import NoMobileSupportMessage from '../components/NoMobileSupportMessage';
import BigNumber from 'bignumber.js';
import { useStore } from '../state/store';
import WalletDialog from '../components/Dialog/WalletDialog';
import { getConnectorHooks } from '../utils/getConnectorHooks';

const Wrapper = styled.div`
	${maxWidthWrapper}
`;

// #todo sync form data with localStorage
const CreateRequest = () => {
	const fileRef = useRef(null);
	const history = useHistory();
	const [isUploading, setUploading] = useState(false);
	const [dialogMessage, setDialogMessage] = useState('');
	const { isMobile, contract, setCreateRequestFormData, biobitBalance, activeConnector } = useStore();
	const { useProvider, useAccount } = getConnectorHooks(activeConnector);
	const MMProvider = useProvider();
	const account = useAccount();

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
		biobit: 'Max allowed decimals is 9',
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
				.string()
				.matches(new RegExp(/^[0-9]{1,9}(\.[0-9]{0,9})*$/, 'g'), validationErrors.biobit)
				.test('angelTokenPay', 'Max allowed amount is 20,000,000 BBIT', (value) => {
					if (new BigNumber(value).isGreaterThan(20000000)) {
						return false;
					}
					return true;
				})
				.required(validationErrors.required('Angel Allocated Biobit')),
			laboratoryTokenPay: yup
				.string()
				.matches(new RegExp(/^[0-9]{1,9}(\.[0-9]{0,9})*$/, 'g'), validationErrors.biobit)
				.test('laboratoryTokenPay', 'Max allowed amount is 20,000,000 BBIT', (value) => {
					if (new BigNumber(value).isGreaterThan(20000000)) {
						return false;
					}
					return true;
				})
				.required(validationErrors.required('Laboratory Allocated Biobit')),
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
				const safeAngelTokenPay = new BigNumber(values.angelTokenPay),
					safeLaboratoryTokenPay = new BigNumber(values.laboratoryTokenPay);

				/* to prevent the Mage from submitting the request with insufficient assets */
				if (
					safeAngelTokenPay
						.plus(safeLaboratoryTokenPay)
						.times(+values.instanceCount)
						.gt(biobitBalance)
				) {
					formik.setFieldError('angelTokenPay', validationErrors.notEnoughTokens);
					formik.setSubmitting(false);
				} else {
					if (!values.terms) {
						formik.setFieldError('terms', validationErrors.terms);
						formik.setSubmitting(false);
					} else {
						if (account) {
							if (fileRef.current.value !== null && fileRef.current.value !== '') {
								const { title, desc, instanceCount, category } = values;

								try {
									setUploading(true);
									setDialogMessage(
										'to secure your files, you need to provide your encryption public key (using Metamask)'
									);
									const encryptionPublicKey = await MMProvider.provider.request({
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
													const uploadedPercent = Math.ceil((uploaded / fileRef.current.files[0].size) * 100);

													setDialogMessage(`uploading to ipfs - ${uploadedPercent}%`);
												},
											}
											/*
												we use wrapWithDirectory option to be able to download the file with proper file name and extension later.
												*/
										);
										const zpaper_CID = ipfsResponse.cid.toString();

										formik.setFieldValue('zpaper', zpaper_CID);
										let url = `${process.env.REACT_APP_IPFS_GET_LINK + zpaper_CID}`;
										console.log(`Zpaper --> ${url}`);

										setDialogMessage('Approve it from your Wallet');

										contract
											.submitNewRequest(
												title,
												desc,
												zpaper_CID,
												safeAngelTokenPay.times(1000000000).toString(), // angel
												safeLaboratoryTokenPay.times(1000000000).toString(), // laboratory
												instanceCount,
												category.map((item) => item.value).join(','),
												process.env.REACT_APP_ZARELA_BUSINESS_CATEGORY,
												encryptionPublicKey,
												{
													from: account,
													// to: process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS,
												}
											)
											.then((tx) => {
												clearSubmitDialog();
												toast(`TX Hash: ${tx.hash}`, 'success', true, tx, {
													toastId: tx.hash,
												});
												history.replace(`/`);
												setCreateRequestFormData({});
												localStorage.removeItem('create_request_values');
											})
											.catch((error) => {
												clearSubmitDialog();
												toast(error.message, 'error');
											});
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
						}
					}
				}
			}
		},
	});

	return (
		<>
			<Wrapper>
				{isMobile ? (
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
						<WalletDialog forceMetamask />
						<CreateRequestForm formik={formik} ref={fileRef}></CreateRequestForm>
					</>
				)}
			</Wrapper>
		</>
	);
};

export default CreateRequest;
