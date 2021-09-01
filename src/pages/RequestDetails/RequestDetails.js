import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router';
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
import * as ethUtil from 'ethereumjs-util';
import { encrypt } from 'eth-sig-util';
import { useWeb3React } from '@web3-react/core';
import { mainContext } from '../../state';
import { convertToBiobit } from '../../utils';
import { toast, ZRNG, getFileNameWithExt } from '../../utils';
import Mobile from './Mobile';
import Desktop from './Desktop';
import Guide from './../../components/Guide/Guide';
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!../../workers/encrypt.js';

const steps = [
	{
		selector: '[data-tour="request-details-one"]',
		content: 'Mage’s public key on Ethereum Network is indicated here for checking by angles.',
	},
	{
		selector: '[data-tour="request-details-two"]',
		content: 'Mage creates the Zpaper, containing all the description and requirements.',
	},
	{
		selector: '[data-tour="request-details-three"]',
		content: 'For contributing, files must be selected here from your device.',
	},
	{
		selector: '',
		content:
			'Well done! You earn 100 BBits for this learning! want to earn more? learn every guide on pages and collect about 500 BBits!',
	},
];

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
		if (sendSignalRef.current !== null) sendSignalRef.current.value = null;
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
						const workerInstance = worker();

						workerInstance.initEncrypt();

						const ipfs = create(process.env.REACT_APP_IPFS); // Connect to IPFS
						// generate AES keys
						const AES_IV = ZRNG();
						const AES_KEY = ZRNG();

						workerInstance.postMessage({
							AES_IV,
							AES_KEY,
							file: sendSignalRef.current.files[0],
						});

						workerInstance.addEventListener('message', async (event) => {
							if (event.data.type === 'feedback') {
								setDialogMessage(event.data.message);
							}
							if (event.data.type === 'encryption') {
								try {
									// AES key encryption using Metamask
									const encryptedAesKey = ethUtil.bufferToHex(
										Buffer.from(
											JSON.stringify(
												encrypt(
													request.encryptionPublicKey,
													{ data: AES_KEY.toString() },
													'x25519-xsalsa20-poly1305'
												)
											),
											'utf8'
										)
									);
									/* 
										to download file later (in the inbox page) with proper name and extension,
										here we store these meta information in an object on IPFS then we store this IPFS
										hash on the blockchain using our SC contribute method.
									*/
									const fileStuff = {
										AES_KEY: encryptedAesKey,
										AES_IV,
										FILE_EXT: getFileNameWithExt(sendSignalRef)[1],
										FILE_NAME: getFileNameWithExt(sendSignalRef)[0],
										FILE_MIMETYPE: getFileNameWithExt(sendSignalRef)[2],
									};

									/* encrypted is an array */
									const fileStuffResponse = await ipfs.add(JSON.stringify(fileStuff), {
										pin: true,
									});

									setDialogMessage('awaiting confirmation');
									appState.contract.methods
										.contribute(
											request.requestID,
											account, // angel
											account, // laboratory
											true, // true: angel receives reward. false: laboratory receives reward.
											request.requesterAddress,
											event.data.ipfs_path, // encrypted file CID
											fileStuffResponse.path // file metadata CID
										)
										.send(
											{
												from: account,
											},
											(error, result) => {
												if (!error) {
													clearSubmitDialog();
													toast(`TX Hash: ${result}`, 'success', true, result, {
														toastId: result,
													});
													if (sendSignalRef.current !== null)
														sendSignalRef.current.value = null;
												} else {
													clearSubmitDialog();
													toast(error.message, 'error');
												}
											}
										);

									appState.contract.events
										.contributed()
										.on('data', (event) => {
											console.log(event);
											clearSubmitDialog();
											/* 
												returnValues[0] contributor
												returnValues[1] laboratory
												returnValues[2] orderId
												returnValues[3] orderOwner
												returnValues[4] difficulty
											*/
											toast(
												`signal submitted on request #${event.returnValues[2]} by: ${event.returnValues[0]}. Difficulty: ${event.returnValues[4]}`,
												'success',
												false,
												null,
												{
													toastId: event.id,
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
							}
						});
					} else {
						setError('please select files to upload');
					}
				}
			}
	};

	useEffect(() => {
		if (appState.contract !== null) {
			appState.contract.methods.Categories(id).call((error, result) => {
				if (!error) {
					let categories = result[0];
					let businessCategory = result[1];

					if (+businessCategory === +process.env.REACT_APP_ZARELA_BUSINESS_CATEGORY)
						// filter categories and only show Zarela requests
						appState.contract.methods.orders(id).call((error, result) => {
							if (!error) {
								const requestTemplate = {
									requestID: result[0],
									title: result[1],
									description: result[7],
									requesterAddress: result[2],
									angelTokenPay: convertToBiobit(result[3]),
									laboratoryTokenPay: convertToBiobit(result[4]),
									totalContributors: result[5], // total contributors required
									totalContributed: +result[5] - +result[8],
									whitePaper: result[6],
									timestamp: result[10],
									categories,
									encryptionPublicKey: result[11],
									totalContributedCount: result[9],
								};
								setRequest(requestTemplate);
							} else {
								console.error(error.message);
							}
						});
				} else {
					console.error(error.message);
				}
			});
		}
	}, [id, appState.contract]);

	return (
		<Guide steps={steps}>
			{appState.isMobile ? (
				<Mobile
					{...{
						account,
						showDialog,
						isSubmitting,
						dialogMessage,
						request,
						sendSignalRef,
						submitSignal,
						error,
						setDialog,
						setError,
					}}
				/>
			) : (
				<Desktop
					{...{
						account,
						showDialog,
						isSubmitting,
						dialogMessage,
						request,
						sendSignalRef,
						submitSignal,
						error,
						setDialog,
						setError,
					}}
				/>
			)}
		</Guide>
	);
};

export default RequestDetailsPage;
