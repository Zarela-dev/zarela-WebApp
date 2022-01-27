import React, { useEffect, useCallback, useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import _ from 'lodash';
import { Spacer } from './Elements/Spacer';
import biobitIcon from '../assets/icons/biobit-black.svg';
import contributorIcon from '../assets/icons/user-blue.svg';
import RequestFilesTable from './RequestFilesTable';
import { mainContext } from '../state';
import { arraySymmetricDiff, arrayIntersection, toast } from '../utils';
import { useWeb3React } from '@web3-react/core';
import caretUpIcon from '../assets/icons/caret-up.svg';
import caretDownIcon from '../assets/icons/caret-down.svg';
import Dialog from './Dialog';
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!../workers/decrypt.js';
import { saveAs } from 'file-saver';
import useBiobit from '../hooks/useBiobit';
import { Header, BodyText } from './../components/Elements/Typography';
import { ThemeDivider } from './../components/Elements/Divider';
import { IdLabel } from './../components/Elements/IdLabel';
import { ThemeIcon } from './../components/Elements/Icon';
import { Row, Col } from './../components/Elements/Flex';
import { ApproveBadge } from './../components/Elements/ApproveBadge';
import { ThemeButton } from './../components/Elements/Button';
import { CID, create } from 'ipfs-http-client';
import JSZip from 'jszip';

const Wrapper = styled.div`
	background: ${(props) => (props.seen ? '#EDFBF8' : '#EAF2FF')};
	opacity: 0.8;
	border-radius: 8px;
	padding: ${(props) => props.theme.spacing(3)} ${(props) => props.theme.spacing(3.5)};
	margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const Body = styled.section``;

const ExpandToggle = styled.img`
	width: 24px;
	margin-left: ${(props) => props.theme.spacing(1.5)};
`;

const RequestListItem = ({
	showContributions,
	shouldRefresh,
	requestID,
	title,
	angelTokenPay,
	laboratoryTokenPay,
	contributors,
	pendingFiles,
	cleanSelected,
	setCleanSelected,
	handleConfirm,
	fulfilled,
	setAnyOpenBox,
}) => {
	const [isOpen, setOpen] = useState(false);
	const [unapprovedCount, setUnapprovedCount] = useState(0);
	const [selected, setSelected] = useState([]);
	const { appState } = useContext(mainContext);
	const [formattedData, setFormattedData] = useState({});
	const { account } = useWeb3React();
	const [isSubmitting, setSubmitting] = useState(false);
	const [dialogMessage, setDialogMessage] = useState('');
	const getBBIT = useBiobit();

	const getPendingIndexes = useCallback(
		(requestID) => {
			let temp_pending = {
				...pendingFiles.pending,
			};
			let filteredIndexes = [];

			Object.keys(temp_pending).forEach((txHash) => {
				if (temp_pending[txHash].requestID !== requestID) {
					delete temp_pending[txHash];
				}
			});

			Object.values(temp_pending).forEach(({ originalIndexes }) => {
				filteredIndexes = [...filteredIndexes, ...originalIndexes];
			});

			return filteredIndexes;
		},
		[pendingFiles]
	);

	const clearSubmitDialog = () => {
		setSubmitting(false);
		setDialogMessage('');
	};

	// files table selection methods START
	const changeAll = (type) => {
		const originalIndexes = [];
		const indexesAlreadyConfirmed = [];
		const all = Object.values(formattedData).reduce((acc, curr) => acc.concat(curr), []);

		all.forEach(({ status, originalIndex }) => {
			originalIndexes.push(originalIndex);
			if (Boolean(status)) {
				indexesAlreadyConfirmed.push(originalIndex);
			}
		});

		const selectableIndexes = originalIndexes.filter((index) => !indexesAlreadyConfirmed.includes(index));

		if (type === 'check') {
			setSelected(selectableIndexes);
		}
		if (type === 'uncheck') setSelected([]);
	};

	const isAllChecked = () => {
		const originalIndexes = [];
		const indexesAlreadyConfirmed = [];
		const pendingIndexes = getPendingIndexes(requestID);
		const selectedIndexes = [...selected];
		const all = Object.values(formattedData).reduce((acc, curr) => acc.concat(curr), []);

		all.forEach(({ status, originalIndex }) => {
			originalIndexes.push(originalIndex);
			if (Boolean(status) === true) indexesAlreadyConfirmed.push(originalIndex);
		});
		if (
			_.isEqual(
				[...selectedIndexes, ...indexesAlreadyConfirmed, ...arrayIntersection(pendingIndexes, originalIndexes)].sort(),
				originalIndexes.sort()
			)
		) {
			return true;
		}
		return false;
	};

	const isAllApproved = () => {
		const originalIndexes = [];
		const indexesAlreadyConfirmed = [];
		const pendingIndexes = getPendingIndexes(requestID);
		const all = Object.values(formattedData).reduce((acc, curr) => acc.concat(curr), []);

		all.forEach(({ status, originalIndex }) => {
			originalIndexes.push(originalIndex);
			if (Boolean(status) === true) indexesAlreadyConfirmed.push(originalIndex);
		});

		if (_.isEqual(originalIndexes.sort(), indexesAlreadyConfirmed.sort())) return 'approved';
		if (_.isEqual(arraySymmetricDiff(indexesAlreadyConfirmed, pendingIndexes).sort(), originalIndexes.sort()))
			return 'pending';
		return 'available';
	};

	const isBulkApproved = (contributorAddress) => {
		const originalIndexes = [];
		const indexesAlreadyConfirmed = [];
		const pendingIndexes = getPendingIndexes(requestID);

		formattedData[contributorAddress]?.forEach(({ originalIndex, status }) => {
			originalIndexes.push(originalIndex);
			if (Boolean(status) === true) {
				indexesAlreadyConfirmed.push(originalIndex);
			}
		});

		if (_.isEqual(indexesAlreadyConfirmed.sort(), originalIndexes.sort())) {
			return 'approved';
		}
		if (
			_.isEqual(
				arraySymmetricDiff(indexesAlreadyConfirmed, arrayIntersection(originalIndexes, pendingIndexes)).sort(),
				originalIndexes.sort()
			)
		) {
			return 'pending';
		}
		return 'available';
	};

	const isBulkChecked = (contributorAddress) => {
		const originalIndexes = [];
		const selectedIndexes = [];
		const indexesAlreadyConfirmed = [];
		const pendingIndexes = getPendingIndexes(requestID);

		formattedData[contributorAddress].forEach(({ originalIndex, status }) => {
			originalIndexes.push(originalIndex);
			if (selected.includes(originalIndex)) {
				selectedIndexes.push(originalIndex);
			}
			if (Boolean(status) === true) {
				indexesAlreadyConfirmed.push(originalIndex);
			}
		});

		if (
			_.isEqual(
				[...selectedIndexes, ...indexesAlreadyConfirmed, ...arrayIntersection(pendingIndexes, originalIndexes)].sort(),
				originalIndexes.sort()
			)
		) {
			return true;
		}
		return false;
	};

	const onBulkChange = (type, contributorAddress) => {
		const originalIndexes = [];
		const indexesAlreadyConfirmed = [];
		const pendingIndexes = getPendingIndexes(requestID);

		formattedData[contributorAddress].forEach(({ originalIndex, status }) => {
			originalIndexes.push(originalIndex);
			if (Boolean(status)) {
				indexesAlreadyConfirmed.push(originalIndex);
			}
		});

		const selectableIndexes = originalIndexes.filter(
			(index) => ![...indexesAlreadyConfirmed, ...pendingIndexes].includes(index)
		);

		if (type === 'check') {
			setSelected((values) => {
				let unique = new Set([...values, ...selectableIndexes]);
				return [...unique];
			});
		}
		if (type === 'uncheck')
			setSelected((values) => values.filter((selectedItem) => !originalIndexes.includes(selectedItem)));
	};

	const onChange = (type, originalIndex) => {
		if (type === 'check') setSelected((values) => [...values, originalIndex]);
		if (type === 'uncheck') setSelected((values) => values.filter((item) => +item !== +originalIndex));
	};
	// files table selection methods END

	const signalDownloadHandler = async (fileHash, fileMetaCID, angelAddress) => {
		setSubmitting(true);
		setDialogMessage('Downloading file metadata from IPFS');
		const ipfs = create(process.env.REACT_APP_IPFS);
		const workerInstance = worker();
		// workerInstance.initDecrypt();
		console.log('fileHash', fileHash);
		workerInstance.addEventListener('message', async (event) => {
			if (event.data.type === 'feedback') {
				setDialogMessage(event.data.message);
			}
		});

		try {
			const filesData = await ipfs.dag.get(CID.parse(fileHash));
			const files = filesData.value.contributions[requestID][angelAddress];
			/* fetch encrypted file's encrypted secret key */
			const encryptedKeys = await axios.get(`${process.env.REACT_APP_IPFS_GET_LINK + fileMetaCID}`);

			const decryptedFileMeta = await window.ethereum.request({
				method: 'eth_decrypt',
				params: [encryptedKeys.data, account],
			});
			const { KEY, NONCE } = JSON.parse(decryptedFileMeta);
			const zip = new JSZip();
			for (let fileName in files) {
				const decryptedFile = await workerInstance.decrypt(KEY, NONCE, files[fileName].path);
				zip.file(fileName, decryptedFile);
				clearSubmitDialog();
			}
			// saveAs(new Blob([decryptedFile]), `${fileName}`);
			zip.generateAsync({ type: 'blob' }).then(function (content) {
				// see FileSaver.js
				saveAs(content, 'example.zip');
				workerInstance.terminate();
			});
			setDialogMessage('Decrypting file metadata');
			/* decrypt secret key using metamask*/
		} catch (error) {
			clearSubmitDialog();
			toast('there was an error decrypting your file, please contact support for more information.', 'error');
			console.error(error);
		}
	};

	useEffect(() => {
		if (cleanSelected) {
			if (requestID === cleanSelected) {
				setSelected([]);
				setCleanSelected(null);
			}
		}
	}, [cleanSelected]);

	useEffect(() => {
		if (appState.contract !== null) {
			appState.contract.methods.getOrderData(requestID).call((orderInfoError, orderInfo) => {
				if (!orderInfoError) {
					appState.contract.methods.ownerSpecificData(requestID).call({ from: account }, (fileError, files) => {
						if (!fileError) {
							let angels = orderInfo[0]; // angels
							let timestamp = orderInfo[2];
							let status = orderInfo[4];
							let hubs = orderInfo[1];
							// let whoGainedReward = orderInfo[3];
							// let zarelaDay = orderInfo[5];

							let formatted = {};
							let uniqueHubAddresses = [...new Set(hubs)];
							let pairs = [];

							// count all the unapproved files
							setUnapprovedCount(status.filter((item) => Boolean(item) === false).length);

							hubs.forEach((address, originalIndex) => {
								pairs.push({
									file: files[0][originalIndex],
									angel: angels[originalIndex],
									AesEncryptedKey: files[1][originalIndex],
									address: address,
									timestamp: timestamp[originalIndex],
									originalIndex: originalIndex,
									status: status[originalIndex],
								});
							});

							uniqueHubAddresses.forEach((hubAddress, uIndex) => {
								pairs.forEach((tempItem, tempIndex) => {
									if (tempItem.address === hubAddress) {
										if (Object(formatted).hasOwnProperty(hubAddress)) {
											formatted[hubAddress].push({
												ipfsHash: tempItem.file,
												angel: tempItem.angel,
												timestamp: tempItem.timestamp,
												AesEncryptedKey: tempItem.AesEncryptedKey,
												originalIndex: tempItem.originalIndex,
												status: tempItem.status,
											});
										} else {
											formatted[hubAddress] = [
												{
													ipfsHash: tempItem.file,
													angel: tempItem.angel,
													timestamp: tempItem.timestamp,
													AesEncryptedKey: tempItem.AesEncryptedKey,
													originalIndex: tempItem.originalIndex,
													status: tempItem.status,
												},
											];
										}
									}
								});
							});

							setFormattedData(formatted);
						} else {
							console.error(fileError);
						}
					});
				} else {
					console.error(orderInfoError.message);
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appState.contract, shouldRefresh]);

	useEffect(() => {
		setOpen(showContributions);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Wrapper>
			<Dialog isOpen={isSubmitting} content={dialogMessage} hasSpinner type="success" />
			<Row
				onClick={() => {
					setOpen(!isOpen);
					setAnyOpenBox && setAnyOpenBox(true);
				}}
				flexWrap="wrap"
			>
				<Col width={2 / 3}>
					<Row>
						<Col mr={3}>
							<IdLabel>{requestID}</IdLabel>
						</Col>
						<Col>
							<Header variant="heading5" as="h5" weight="semiBold">
								{title.length < 160 ? title : title.substr(0, 160) + '...'}
							</Header>
							<Spacer />
						</Col>
					</Row>
				</Col>

				<Col width={1 / 3}>
					<Row justifyContent="flex-end">
						<Col>
							<Row sx={{ whiteSpace: 'nowrap' }}>
								<ThemeIcon variant="big" src={biobitIcon} />
								<BodyText variant="small" as="span" fontWeight="semiBold" mr={1}>
									{getBBIT(angelTokenPay, laboratoryTokenPay)[0]}
								</BodyText>
								<BodyText variant="small" fontWeight="semiBold" as="span" mr={2}>
									BBit
								</BodyText>
								{/* for this version, we combine both numbers, later both will be shown separately */}
								<BodyText variant="small" as="span" fontWeight="semiBold" noMargin>{`~ $${
									getBBIT(angelTokenPay, laboratoryTokenPay)[1]
								}`}</BodyText>
							</Row>
						</Col>
						<ThemeDivider variant="vertical" />

						<Col>
							<Row>
								<ThemeIcon variant="normal" src={contributorIcon} />
								<BodyText variant="small" color="textToken" fontWeight="semiBold">
									{contributors}
								</BodyText>
							</Row>
						</Col>

						<ThemeDivider variant="vertical" />

						<ApproveBadge fulfilled={fulfilled} value={unapprovedCount} />

						<ExpandToggle src={!isOpen ? caretDownIcon : caretUpIcon} />
					</Row>
				</Col>
			</Row>

			{isOpen ? (
				Object.keys(formattedData).length > 0 ? (
					<>
						<Body data-tour="inbox-one">
							<RequestFilesTable
								signalDownloadHandler={signalDownloadHandler}
								data={formattedData}
								selected={selected}
								onChange={onChange}
								fulfilled={fulfilled}
								onBulkChange={onBulkChange}
								isBulkChecked={isBulkChecked}
								isBulkApproved={isBulkApproved}
								isAllApproved={isAllApproved}
								isAllChecked={isAllChecked}
								changeAll={changeAll}
								requestID={requestID}
							/>
						</Body>
						<Row justifyContent="flex-end" mt={3}>
							<ThemeButton
								variant="primary"
								size="large"
								disabled={selected.length === 0}
								onClick={() => {
									handleConfirm(requestID, selected);
								}}
							>
								Send Tokens
							</ThemeButton>
						</Row>
					</>
				) : (
					<Row>
						<BodyText variant="small" ml="90px">
							There are no contributions for now
						</BodyText>
					</Row>
				)
			) : null}
		</Wrapper>
	);
};

export default RequestListItem;
