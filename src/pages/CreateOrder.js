import React, { useState, useEffect, useContext, useRef } from 'react';
import { Buffer } from 'buffer';
import { web3Context } from '../web3Provider';
import { create } from 'ipfs-http-client';
import TextField from '../components/Elements/TextField';
import styled from 'styled-components';
import TitleBar from '../components/TitleBar';
import FileInput from '../components/FileInput';
import Checkbox from '../components/Elements/Checkbox';
import { Button } from '../components/Elements/Button';

const SubmitButton = styled.button`
	${Button};
	width: 260px;
	height: 50px;
	margin-bottom: ${props => props.theme.spacing(4)};
	font-size: 20px;
	font-weight: 500;
	color: #252222;
`;

const Wrapper = styled.div`
	max-width: ${props => props.theme.maxWidth};
	margin: 0 auto;
`;

const Divider = styled.div`
	width: 100%;
	background: rgba(144, 144, 144, 0.3);
	border-radius: 24px;
	height: 3px;
	margin: ${props => props.theme.spacing(4)}  0;
`;

// #todo sync form data with localStorage
const CreateOrder = () => {
	const fileRef = useRef(null);
	const { Web3 } = useContext(web3Context);
	const [formValues, setFormValues] = useState({ agreement: false, whitePaper: null, storageValue: 0, web3: null, accounts: null, whitePaperHash: '', contract: null, title: '', category: '', desc: '', whitePaper: '', tokenPay: '', instanceCount: '' });

	const onSubmit = (e) => {
		e.preventDefault();
		const { title, desc, tokenPay, whitePaperHash, instanceCount, category } = formValues;
		const reader = new FileReader();
		console.log('state', formValues);

		reader.readAsArrayBuffer(fileRef.current.files[0]); // Read Provided File

		reader.onloadend = async () => {
			const ipfs = create(process.env.REACT_APP_IPFS); // Connect to IPFS
			const buf = Buffer(reader.result); // Convert data into buffer
			console.log('state from ipfs', formValues);

			try {
				const ipfsResponse = await ipfs.add(buf);
				setFormValues({ whitePaperHash: ipfsResponse.path });
				let url = `https://ipfs.io/ipfs/${ipfsResponse.path}`;
				console.log(`Document Of Conditions --> ${url}`);

				// const doc = document.getElementById("_White_Paper");
				Web3.contract.methods.SetOrderBoard(title, desc, ipfsResponse.path, tokenPay, instanceCount, category)
					.send({ from: Web3.accounts[0], to: "0xBf23D9f1e75439657c2Cc5ddd200120e265a2ed4"}, (error, result) => {
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
	};

	useEffect(() => {
		window.ethereum.enable();
	}, []);
	useEffect(() => {
		console.log('accounts', Web3.accounts);
	}, [Web3.accounts]);

	return (
		<>
			<TitleBar />
			<Wrapper>
				{
					Web3.accounts.length === 0 ?
						<div>
							please connect
						</div> :
						<form onSubmit={onSubmit}>
							<TextField
								placeholder={'write main topics in your test'}
								label='Title *'
								type='text'
								name={'title'}
								value={formValues.title}
								onChange={(e) => {
									setFormValues(values => ({
										...values,
										title: e.target.value
									}));
								}}
							/>
							<TextField
								placeholder={'How many people do you need to done the test?'}
								label='Description *'
								type='text'
								name={'desc'}
								value={formValues.desc}
								onChange={(e) => {
									setFormValues(values => ({
										...values,
										desc: e.target.value
									}));
								}}
							/>
							<TextField
								placeholder={'How many biobits will you pay for each contributor?'}
								label='Allocated Biobits *'
								type='text'
								name={'tokenPay'}
								value={formValues.tokenPay}
								onChange={(e) => {
									setFormValues(values => ({
										...values,
										tokenPay: e.target.value
									}));
								}}
							/>
							<TextField
								placeholder={'What’s your test about?'}
								label='Contributors *'
								type='text'
								name={'instanceCount'}
								value={formValues.instanceCount}
								onChange={(e) => {
									setFormValues(values => ({
										...values,
										instanceCount: e.target.value
									}));
								}}
							/>
							<TextField
								placeholder={'Category'}
								label='Category *'
								type='text'
								name={'category'}
								value={formValues.category}
								onChange={(e) => {
									setFormValues(values => ({
										...values,
										category: e.target.value
									}));
								}}
							/>
							<FileInput
								hasBorder={false}
								showSelected
								buttonLabel='Upload'
								label={'Upload your white paper here'}
								ref={fileRef}
								name={'whitepaper'}
								value={formValues.whitepaper}
								onChange={(e) => {
									setFormValues(values => ({
										...values,
										whitepaper: e.target.value
									}));
								}}
							/>
							{/* <button type='submit'>
								submit
							</button> */}
							<Divider />
							<Checkbox checked={formValues.agreement} onChange={(e) => setFormValues(data => ({ ...data, agreement: e.target.checked }))}>
								Your request won’t be able to be edited, make sure every data you added is correct and final. By marking this box you claim your agreement towards policies.
							</Checkbox>
							<SubmitButton>
								Submit
							</SubmitButton>
						</form>
				}
			</Wrapper>
		</>
	);
};

export default CreateOrder;