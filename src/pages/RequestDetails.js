import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router';
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
import RequestDetails from '../components/RequestDetails';
import { mainContext } from '../state';
import { timeSince, convertToBiobit } from '../utils';
import ConnectDialog from '../components/Dialog/ConnectDialog';
import * as ethUtil from 'ethereumjs-util';
import { encrypt } from 'eth-sig-util';
import { toast } from '../utils';
import Dialog from '../components/Dialog';
import { useWeb3React } from '@web3-react/core';

const RequestDetailsPage = () => {
	const { id } = useParams();
	const [request, setRequest] = useState({});
	const { appState } = useContext(mainContext);
	const sendSignalRef = useRef(null);
	const [showDialog, setDialog] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);
	const [dialogMessage, setDialogMessage] = useState('');
	const [error, setError] = useState(false);
	const { account } = useWeb3React();

	const clearSubmitDialog = () => {
		setSubmitting(false);
		setDialogMessage('');
		if (sendSignalRef.current !== null)
			sendSignalRef.current.value = null;
	};

	const submitSignal = (e) => {
		if (Object.keys(request).length !== 0)
			if (sendSignalRef !== null) {
				setDialog(true);
				if (account) {
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
												request.encryptionPublicKey,
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
								appState.contract.methods.SendFile(request.requestID, request.requesterAddress, ipfsResponse.path)
									.send({ from: account, gas: 700000, gasPrice: +appState.gas.average * Math.pow(10, 8) }, (error, result) => {
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

								appState.contract.events.Contributed({})
									.on('data', (event) => {
										clearSubmitDialog();
										toast(
											`signal submitted on request #${event.returnValues[1]} for address: ${event.returnValues[2]}`,
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
		if (appState.contract !== null) {
			appState.contract.methods.ord_file(id).call((error, result) => {
				if (!error) {
					const requestTemplate = {
						requestID: result[0],
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
					setRequest(requestTemplate);
				} else {
					console.error(error.message);
				}
			});
		}
	}, [id, appState.contract]);

	return (
		<div>
			<ConnectDialog isOpen={!account && showDialog} />
			<Dialog
				isOpen={isSubmitting}
				content={(
					dialogMessage
				)}
				hasSpinner
				type='success'
			/>
			<RequestDetails
				request={request}
				ref={sendSignalRef}
				submitSignal={submitSignal}
				timestamp={timeSince(request.timestamp)}
				error={error}
				setError={setError}
			/>
		</div>
	);
};

export default RequestDetailsPage;
