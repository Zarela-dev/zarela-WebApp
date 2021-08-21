import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router';
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
import { actionTypes, mainContext } from '../../state';
import { useHistory } from 'react-router-dom';
import { convertToBiobit } from '../../utils';
import * as ethUtil from 'ethereumjs-util';
import { encrypt } from 'eth-sig-util';
import { toast, ZRNG, getFileNameWithExt } from '../../utils';
import { useWeb3React } from '@web3-react/core';
import Mobile from './Mobile';
import Desktop from './Desktop';
import Guide from './../../components/Guide/Guide';
import { useLocation } from 'react-router';
import { twofish } from 'twofish';

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
	const { appState, dispatch } = useContext(mainContext);
	const sendSignalRef = useRef(null);
	const [showDialog, setDialog] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);
	const [dialogMessage, setDialogMessage] = useState('');
	const [error, setError] = useState(false);
	const { account } = useWeb3React();
	const location = useLocation();

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

						const reader = new FileReader();

						reader.readAsArrayBuffer(sendSignalRef.current.files[0]); // Read Provided File

						reader.onloadend = async () => {
							const ipfs = create(process.env.REACT_APP_IPFS); // Connect to IPFS
							const buff = Buffer(reader.result); // Convert data into buffer
							// generate AES related keys
							const AES_IV = ZRNG();
							const AES_KEY = ZRNG();

							// file encryption
							var twF = twofish(AES_IV),
								encryptedFile = twF.encryptCBC(AES_KEY, buff); /* twF.encryptCBC expects an array */

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

								setDialogMessage('uploading to ipfs');
								/* encrypted is an array */
								const fileResponse = await ipfs.add(encryptedFile, { pin: true });
								const fileStuffResponse = await ipfs.add(JSON.stringify(fileStuff), { pin: true });

								let url = `${process.env.REACT_APP_IPFS_LINK + fileResponse.path}`;
								console.log(`uploaded document --> ${url}`);

								setDialogMessage('awaiting confirmation');
								appState.contract.methods
									.contribute(
										request.requestID,
										account, // angel
										account, // laboratory
										request.requesterAddress,
										fileResponse.path,
										fileStuffResponse.path
									)
									.send(
										{
											from: account,
										},
										(error, result) => {
											if (!error) {
												clearSubmitDialog();
												toast(result, 'success', true, result);

												if (sendSignalRef.current !== null) sendSignalRef.current.value = null;
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
						};
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
						// only show zarela requests
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
						setSubmitting,
						dialogMessage,
						request,
						sendSignalRef,
						submitSignal,
						error,
						setError,
					}}
				/>
			) : (
				<Desktop
					{...{
						account,
						showDialog,
						isSubmitting,
						setSubmitting,
						dialogMessage,
						request,
						sendSignalRef,
						submitSignal,
						error,
						setError,
					}}
				/>
			)}
		</Guide>
	);
};

export default RequestDetailsPage;
