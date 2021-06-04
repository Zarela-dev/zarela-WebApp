import React, { useState, useEffect, useContext, useRef } from 'react';
import { Buffer } from 'buffer';
import { web3Context } from '../web3Provider';
import { create } from 'ipfs-http-client';
import styled from 'styled-components';
import TitleBar from '../components/TitleBar';
import CreateOrderForm from '../components/CreateOrderForm';

const Wrapper = styled.div`
	max-width: ${props => props.theme.maxWidth};
	margin: 0 auto;
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
					.send({ from: Web3.accounts[0], to: "0xBf23D9f1e75439657c2Cc5ddd200120e265a2ed4" }, (error, result) => {
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
						<CreateOrderForm
							onSubmit={onSubmit}
							formValues={formValues}
							setFormValues={setFormValues}
							ref={fileRef}
						/>
				}
			</Wrapper>
		</>
	);
};

export default CreateOrder;