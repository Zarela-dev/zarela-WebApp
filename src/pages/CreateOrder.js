import React, { useState, useEffect, useContext, useRef } from 'react';
import { Buffer } from 'buffer';
import { web3Context } from '../web3Provider';
import { create } from 'ipfs-http-client';

// #todo sync form data with localStorage
const CreateOrder = () => {
	const fileRef = useRef(null);
	const { Web3 } = useContext(web3Context);
	const [formValues, setFormValues] = useState({ storageValue: 0, web3: null, accounts: null, whitePaperHash: '', contract: null, title: '', category: '', desc: '', whitePaper: '', tokenPay: '', instanceCount: '' });

	useEffect(() => {
		window.ethereum.enable();
	}, []);
	useEffect(() => {
		console.log('accounts', Web3.accounts);
	}, [Web3.accounts]);

	return (
		<div>
			{
				Web3.accounts.length === 0 ?
					<div>
						please connect
					</div> :
					<form onSubmit={(e) => {
						e.preventDefault();
						const { title, desc, tokenPay, whitePaperHash, instanceCount, category } = formValues;
						const reader = new FileReader();

						reader.onloadend = () => {
							const ipfs = create('http://127.0.0.1:5001'); // Connect to IPFS
							const buf = Buffer(reader.result); // Convert data into buffer
							ipfs.add(buf, (err, result) => { // Upload buffer to IPFS
								if (err) {
									console.error(err);
									return;
								}

								setFormValues({ whitePaperHash: result[0].hash });
								let url = `https://ipfs.io/ipfs/${result[0].hash}`;
								console.log(`Document Of Conditions --> ${url}`);
							});
						};

						// const doc = document.getElementById("_White_Paper");
						reader.readAsArrayBuffer(fileRef.current.files[0]); // Read Provided File

						Web3.contract.methods.SetOrderBoard(title, desc, whitePaperHash, tokenPay, instanceCount, category)
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


					}}>
						<input type='text' name={'title'} value={formValues.title} onChange={(e) => {
							setFormValues(values => ({
								...values,
								title: e.target.value
							}));
						}} />
						<input type='text' name={'desc'} value={formValues.desc} onChange={(e) => {
							setFormValues(values => ({
								...values,
								desc: e.target.value
							}));
						}} />
						<input type='file' ref={fileRef} name={'whitepaper'} value={formValues.whitepaper} onChange={(e) => {
							setFormValues(values => ({
								...values,
								whitepaper: e.target.value
							}));
						}} />
						<input type='text' name={'tokenPay'} value={formValues.tokenPay} onChange={(e) => {
							setFormValues(values => ({
								...values,
								tokenPay: e.target.value
							}));
						}} />
						<input type='text' name={'instanceCount'} value={formValues.instanceCount} onChange={(e) => {
							setFormValues(values => ({
								...values,
								instanceCount: e.target.value
							}));
						}} />
						<input type='text' name={'category'} value={formValues.category} onChange={(e) => {
							setFormValues(values => ({
								...values,
								category: e.target.value
							}));
						}} />
						<button type='submit'>
							submit
						</button>
					</form>
			}
		</div>
	);
};

export default CreateOrder;