import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router';
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
import OrderDetails from '../components/OrderDetails';
import { web3Context } from '../web3Provider';
import { timeSince, convertToBiobit } from '../utils';
import ConnectDialog from '../components/Dialog/ConnectDialog';
import * as ethUtil from 'ethereumjs-util';
import { encrypt } from 'eth-sig-util';
import { toast } from '../utils';
import Dialog from '../components/Dialog';

const OrderDetailsPage = () => {
	const { id } = useParams();
	const { Web3 } = useContext(web3Context);
	const [order, setOrders] = useState({});
	const sendSignalRef = useRef(null);
	const [showDialog, setDialog] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);
	const [dialogMessage, setDialogMessage] = useState('');
	const [error, setError] = useState(false);

	const clearSubmitDialog = () => {
		setSubmitting(false);
		setDialogMessage('');
		if (sendSignalRef.current !== null)
			sendSignalRef.current.value = null;
	};

	const submitSignal = (e) => {
		if (Object.keys(order).length !== 0)
			if (sendSignalRef !== null) {
				setDialog(true);
				if (Web3.accounts.length > 0) {
					if (sendSignalRef.current.value !== null && sendSignalRef.current.value !== '') {
						setDialog(false);
						setSubmitting(true);
						setDialogMessage('encrypting file');

						const reader = new FileReader();

						reader.readAsArrayBuffer(sendSignalRef.current.files[0]); // Read Provided File

						reader.onloadend = async () => {
							const ipfs = create(process.env.REACT_APP_IPFS); // Connect to IPFS
							const buff = Buffer(reader.result); // Convert data into buffer
							// encrypt
							try {
								const encryptedMessage = ethUtil.bufferToHex(
									Buffer.from(
										JSON.stringify(
											encrypt(
												order.encryptionPublicKey,
												{ data: buff.toString('base64') },
												'x25519-xsalsa20-poly1305'
											)
										),
										'utf8'
									)
								);
								setDialogMessage('uploading to ipfs');
								const ipfsResponse = await ipfs.add(encryptedMessage);

								let url = `${process.env.REACT_APP_IPFS_LINK + ipfsResponse.path}`;
								console.log(`Document Of Conditions --> ${url}`);

								// const doc = document.getElementById("_White_Paper");
								setDialogMessage('awaiting confirmation');
								Web3.contract.methods.SendFile(order.orderId, order.requesterAddress, ipfsResponse.path)
									.send({ from: Web3.accounts[0], gas: 700000, gasPrice: +Web3.gas.average * Math.pow(10, 8) }, (error, result) => {
										if (!error) {
											clearSubmitDialog();
											toast(result, 'success', true, result);

											if (sendSignalRef.current !== null)
												sendSignalRef.current.value = null;
										}
										else {
											clearSubmitDialog();
											toast(error.message, 'error');
										}
									});

								Web3.contract.events.Contributed({})
									.on('data', (event) => {
										clearSubmitDialog();
										toast(
											`signal submitted on order #${event.returnValues[1]} for address: ${event.returnValues[2]}`,
											'success',
											false,
											null,
											{
												toastId: event.id
											}
										);
									})
									.on('error', (error, receipt) => {
										clearSubmitDialog();
										toast(error.message, 'error');
										console.error(error, receipt);
									});
							} catch (error) {
								clearSubmitDialog();
								console.error(error);
							}
						};

					} else {
						setError('please select files to upload');
					}
				}
			}
	};

	useEffect(() => {
		if (Web3.contract !== null) {
			Web3.contract.methods.ord_file(id).call((error, result) => {
				if (!error) {
					const orderTemplate = {
						orderId: result[0],
						title: result[1],
						description: result[6],
						requesterAddress: result[2],
						tokenPay: convertToBiobit(result[3]),
						totalContributors: result[4], // total contributors required
						totalContributed: +result[4] - +result[7],
						categories: result[8], // NOT TO BE USED IN DEMO
						whitePaper: result[5],
						timestamp: result[10],
						encryptionPublicKey: result[11],
						totalContributedCount: result[9]
					};
					setOrders(orderTemplate);
				} else {
					console.error(error.message);
				}
			});
		}
	}, [id, Web3.contract]);

	useEffect(() => {
		console.log('gas', Web3.gas.average);
	}, [Object.keys(Web3.gas).length]);

	return (
		<div>
			<ConnectDialog isOpen={Web3.accounts.length < 1 && showDialog} />
			<Dialog
				isOpen={isSubmitting}
				content={(
					dialogMessage
				)}
				hasSpinner
				type='success'
			/>
			<OrderDetails
				order={order}
				ref={sendSignalRef}
				submitSignal={submitSignal}
				timestamp={timeSince(order.timestamp)}
				error={error}
				setError={setError}
			/>
		</div>
	);
};

export default OrderDetailsPage;
