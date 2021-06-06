import React, { useState, useEffect, useContext, useRef } from 'react';
import { Buffer } from 'buffer';
import { web3Context } from '../web3Provider';
import { create } from 'ipfs-http-client';
import styled from 'styled-components';
import TitleBar from '../components/TitleBar';
import CreateOrderForm from '../components/CreateOrderForm';
import maxWidthWrapper from '../components/Elements/MaxWidth';
import ConnectDialog from '../components/Dialog/ConnectDialog';

const Wrapper = styled.div`
	${maxWidthWrapper}
`;

// #todo sync form data with localStorage
const CreateOrder = () => {
	const fileRef = useRef(null);
	const { Web3 } = useContext(web3Context);
	const [formValues, setFormValues] = useState({ agreement: false, whitePaper: null, storageValue: 0, web3: null, accounts: null, whitePaperHash: '', contract: null, title: '', category: '', desc: '', whitePaper: '', tokenPay: '', instanceCount: '' });
	const [showDialog, setDialog] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		setDialog(true);
		
		if (Web3.accounts.length > 0) {
			setDialog(false);
			const { title, desc, tokenPay, whitePaperHash, instanceCount, category } = formValues;
			const reader = new FileReader();

			reader.readAsArrayBuffer(fileRef.current.files[0]); // Read Provided File

			reader.onloadend = async () => {
				const ipfs = create(process.env.REACT_APP_IPFS); // Connect to IPFS
				const buf = Buffer(reader.result); // Convert data into buffer

				try {
					const ipfsResponse = await ipfs.add(buf);
					setFormValues({ whitePaperHash: ipfsResponse.path });
					let url = `https://ipfs.io/ipfs/${ipfsResponse.path}`;
					console.log(`Document Of Conditions --> ${url}`);

					// const doc = document.getElementById("_White_Paper");
					Web3.contract.methods.SetOrderBoard(title, desc, ipfsResponse.path, tokenPay, instanceCount, category)
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
	};

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
							onSubmit={onSubmit}
							formValues={formValues}
							setFormValues={setFormValues}
							ref={fileRef}
						/>
					</>
				}
			</Wrapper>
		</>
	);
};

export default CreateOrder;