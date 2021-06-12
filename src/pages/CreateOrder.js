import React, { useState, useEffect, useContext, useRef } from 'react';
import { Buffer } from 'buffer';
import { web3Context } from '../web3Provider';
import { create } from 'ipfs-http-client';
import styled from 'styled-components';
import TitleBar from '../components/TitleBar';
import CreateOrderForm from '../components/CreateOrderForm';
import maxWidthWrapper from '../components/Elements/MaxWidth';
import ConnectDialog from '../components/Dialog/ConnectDialog';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Wrapper = styled.div`
	${maxWidthWrapper}
`;

// #todo sync form data with localStorage
const CreateOrder = () => {
	const fileRef = useRef(null);
	const { Web3 } = useContext(web3Context);
	const [showDialog, setDialog] = useState(false);

	const validationErrors = {
		required: name => `${name} is required to create your order.`,
		notEnoughTokens: 'you do not have enough tokens to create this order.',
		terms: 'you must agree to the term before submitting your order',
		number: name => `${name} must be a number`,
		string: name => `${name} must be a string`
	};

	const formik = useFormik({
		initialValues: {
			title: '',
			desc: '',
			tokenPay: '',
			instanceCount: '',
			category: '',
			whitepaper: '',
			terms: false
		},
		validationSchema: yup.object().shape({
			title: yup.string(validationErrors.string('title')).required(validationErrors.required('title')),
			desc: yup.string(validationErrors.string('description')).required(validationErrors.required('description')),
			tokenPay: yup.number().typeError(validationErrors.number('Allocated Biobits')).required(validationErrors.required('Allocated Biobit')),
			instanceCount: yup.number().typeError(validationErrors.number('Contributors')).required(validationErrors.required('Contributors')),
			category: yup.string().required(validationErrors.required('category')),
			whitepaper: yup.mixed(),
			terms: yup.boolean().required()
		}),
		onSubmit: (values => {
			setDialog(true);
			if (formik.isValid)
				if (!values.terms) {
					formik.setFieldError('terms', validationErrors.terms);
				} else {
					if (Web3.accounts.length > 0) {
						setDialog(false);
						const { title, desc, tokenPay, instanceCount, category } = values;
						const reader = new FileReader();

						reader.readAsArrayBuffer(fileRef.current.files[0]); // Read Provided File

						reader.onloadend = async () => {
							const ipfs = create(process.env.REACT_APP_IPFS); // Connect to IPFS
							const buf = Buffer(reader.result); // Convert data into buffer

							try {
								const ipfsResponse = await ipfs.add(buf);
								formik.setFieldValue('whitepaper', ipfsResponse.path);
								let url = `https://ipfs.io/ipfs/${ipfsResponse.path}`;
								console.log(`Document Of Conditions --> ${url}`);

								// const doc = document.getElementById("_White_Paper");
								var allocatedBiobits = tokenPay * Math.pow(10, 9);
								Web3.contract.methods.SetOrderBoard(title, desc, ipfsResponse.path, allocatedBiobits, instanceCount, category)
									.send({ from: Web3.accounts[0], to: process.env.REACT_APP_ZarelaContractAddress }, (error, result) => {
										if (!error) {
											alert(JSON.stringify('Transaction Hash is :  ' + result));
										}
										else {
											alert(error.message);
										}
									});
								Web3.contract.events.OrderRegistered({}, function (error, result) {
									if (!error) {
										let returnValues = result.returnValues;
										alert(JSON.stringify('Great !! Succes :) ' + '     <<New Order Created ! >>        Owner address is  :  ' + returnValues[0] +
											'   & Order Number is   :  ' + returnValues[1]));
									}
									else {
										alert(error.message);
									}
								});
							} catch (error) {
								console.error(error);
							}
						};
					}
				}
		})
	});

	useEffect(() => {
		console.log('accounts', Web3.accounts);
	}, [Web3.accounts]);

	return (
		<>
			<TitleBar>
				Create Request
			</TitleBar>
			<Wrapper>
				{

					<>
						{
							Web3.accounts.length < 1 && showDialog ?
								<ConnectDialog />
								: null
						}
						<CreateOrderForm
							formik={formik}
							ref={fileRef}
						/>
					</>
				}
			</Wrapper>
		</>
	);
};

export default CreateOrder;