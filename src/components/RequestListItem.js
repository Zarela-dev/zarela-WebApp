import React, { useEffect, useCallback, useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import _ from 'lodash';
import { Spacer } from './Elements/Spacer';
import { WithPointerCursor } from './Elements/WithPointerCursor';
import {
	ContributorsIcon,
	ContributorBadge,
	TokenIcon,
	RequestNumber,
	BiobitToDollarPair,
	BadgeRow,
	BadgeLabel,
	TokenValue,
	ValueLabel,
	BiobitToDollarValue,
} from './Elements/RequestCard';
import { Typography } from './Elements/Typography';
import biobitIcon from '../assets/icons/biobit-black.svg';
import contributorIcon from '../assets/icons/user-blue.svg';
import RequestFilesTable from './RequestFilesTable';
import { mainContext } from '../state';
import { arraySymmetricDiff, arrayIntersection } from '../utils';
import Button from './Elements/Button';
import { useWeb3React } from '@web3-react/core';
import caretUpIcon from '../assets/icons/caret-up.svg';
import caretDownIcon from '../assets/icons/caret-down.svg';
import fulfilledIcon from '../assets/icons/check-green.svg';
import Dialog from './Dialog';
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!../workers/decrypt.js';
import { saveAs } from 'file-saver';

const Wrapper = styled.div`
	background: ${(props) => (props.seen ? '#EDFBF8' : '#EAF2FF')};
	opacity: 0.8;
	border-radius: 8px;
	padding: ${(props) => props.theme.spacing(3)} ${(props) => props.theme.spacing(3.5)};
	margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const Header = styled.header`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;

const TitleColumn = styled.div`
	display: flex;
	flex: 8;
`;

const DetailsColumn = styled.div`
	display: flex;
	flex: 4;
	justify-content: flex-end;
	height: 35px;
	align-items: center;

	@media (max-width: 768px) {
		align-items: center;
		margin-top: 21px;
		justify-content: center;
	}
`;

const RequestNumberWithPointer = styled(RequestNumber)`
	${WithPointerCursor};
	@media (max-width: 768px) {
		flex: 0 0 44px;
		height: 27px;
		border-radius: 10px 10px 0px 10px;
		padding: 0px 0px;
		margin-right: 8px;
		font-weight: bold;
		background: linear-gradient(246.29deg, #3a68de 12.69%, #3a68de 100%);
		font-size: 16px;
		line-height: 30px;
		color: #ffffff;
		text-align: center;
	}
`;

const Title = styled(Typography)`
	${WithPointerCursor};
	font-size: 16px;
	font-weight: 500;

	@media (max-width: 768px) {
		font-size: 12px;
	}
`;

const TotalBadge = styled.div`
	border: 2px solid ${(props) => props.theme.primary};
	background: transparent;
	min-width: 32px;
	height: 32px;
	padding: ${(props) => props.theme.spacing(0.5)} ${(props) => props.theme.spacing(0.6)};
	border-radius: 5px;

	text-align: center;
	font-weight: bold;
	font-size: 15px;
	line-height: 18px;
	color: ${(props) => props.theme.primary};
`;

const ApprovedBadge = styled.img`
	width: 36px;
`;

const Divider = styled.div`
	width: 1px;
	background: #3c87aa;
	height: 100%;
	margin: 0 ${(props) => props.theme.spacing(1)};
`;

const Body = styled.section``;

const NoContributionMessage = styled.div`
	margin-top: ${(props) => props.theme.spacing(2)};
	margin-left: ${(props) => props.theme.spacing(12)};
`;

const Footer = styled.footer`
	display: flex;
	justify-content: flex-end;
	width: 100%;
`;

const SubmitButton = styled(Button)`
	margin-right: 0;
	margin-top: ${(props) => props.theme.spacing(3)};
	font-weight: 500;
	font-size: 16px;
	white-space: nowrap;
	line-height: 18px;

	& > button {
		padding-top: 0;
		padding-bottom: 0;
	}
`;
const CustomContributeBadge = styled(ContributorBadge)`
	flex: 0 0 auto;
`;

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
				[
					...selectedIndexes,
					...indexesAlreadyConfirmed,
					...arrayIntersection(pendingIndexes, originalIndexes),
				].sort(),
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
				[
					...selectedIndexes,
					...indexesAlreadyConfirmed,
					...arrayIntersection(pendingIndexes, originalIndexes),
				].sort(),
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

	const signalDownloadHandler = async (fileHash, fileStuffPath) => {
		setSubmitting(true);
		setDialogMessage('Downloading encrypted AES secret key from IPFS');
		const workerInstance = worker();
		workerInstance.initDecrypt();

		try {
			/* fetch signal file metadata from IPFS */
			const fileStuffRes = await axios.get(`${process.env.REACT_APP_IPFS_LINK + fileStuffPath}`);
			const { AES_KEY, AES_IV, FILE_NAME, FILE_EXT } = fileStuffRes.data;
			setDialogMessage('Decrypting AES Secret key');
			/* decrypt secret key using metamask*/
			const AesDecryptedKey = await window.ethereum.request({
				method: 'eth_decrypt',
				params: [AES_KEY, account],
			});

			workerInstance.postMessage({
				fileHash,
				AES_KEY: AesDecryptedKey.split(',').map((item) => Number(item)),
				AES_IV: Object.values(AES_IV),
			});

			workerInstance.addEventListener('message', async (event) => {
				if (event.data.type === 'terminate') {
					workerInstance.terminate();
				}
				if (event.data.type === 'feedback') {
					setDialogMessage(event.data.message);
				}
				if (event.data.type === 'decrypted') {
					saveAs(new Blob([event.data.decrypted_file]), `${FILE_NAME}.${FILE_EXT}`);
					clearSubmitDialog();
				}
			});
		} catch (error) {
			clearSubmitDialog();
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
					appState.contract.methods
						.ownerSpecificData(requestID)
						.call({ from: account }, (fileError, files) => {
							if (!fileError) {
								let addresses = orderInfo[0];
								let timestamp = orderInfo[2];
								let status = orderInfo[4];
								// let laboratories = orderInfo[1];
								// let whoGainedReward = orderInfo[3];
								// let zarelaDay = orderInfo[5];

								let formatted = {};
								let uniqueAddresses = [...new Set(addresses)];
								let pairs = [];

								// count all the unapproved files
								setUnapprovedCount(status.filter((item) => Boolean(item) === false).length);

								addresses.forEach((address, fileIndex) => {
									pairs.push({
										file: files[0][fileIndex],
										AesEncryptedKey: files[1][fileIndex],
										address: address,
										timestamp: timestamp[fileIndex],
										originalIndex: fileIndex,
										status: status[fileIndex],
									});
								});

								uniqueAddresses.forEach((uAddress, uIndex) => {
									pairs.forEach((tempItem, tempIndex) => {
										if (tempItem.address === uAddress) {
											if (Object(formatted).hasOwnProperty(uAddress)) {
												formatted[uAddress].push({
													ipfsHash: tempItem.file,
													timestamp: tempItem.timestamp,
													AesEncryptedKey: tempItem.AesEncryptedKey,
													originalIndex: tempItem.originalIndex,
													status: tempItem.status,
												});
											} else {
												formatted[uAddress] = [
													{
														ipfsHash: tempItem.file,
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
			<Header
				onClick={() => {
					setOpen(!isOpen);
					setAnyOpenBox && setAnyOpenBox(true);
				}}
			>
				<TitleColumn>
					<RequestNumberWithPointer>{requestID}</RequestNumberWithPointer>
					<Title variant="title" weight="semiBold">
						{title.length < 160 ? title : title.substr(0, 160) + '...'}
					</Title>
					<Spacer />
				</TitleColumn>

				<DetailsColumn>
					<BiobitToDollarPair>
						<BadgeRow>
							<TokenIcon src={biobitIcon} />
							<TokenValue>{+angelTokenPay + +laboratoryTokenPay}</TokenValue>
							<ValueLabel>BBit</ValueLabel>
							{/* for this version, we combine both numbers, later both will be shown separately */}
							<BiobitToDollarValue noMargin>{`~ $${
								+angelTokenPay + +laboratoryTokenPay
							}`}</BiobitToDollarValue>
						</BadgeRow>
					</BiobitToDollarPair>
					<Divider />
					<CustomContributeBadge>
						<BadgeRow>
							<ContributorsIcon src={contributorIcon} />
							<BadgeLabel>{contributors}</BadgeLabel>
						</BadgeRow>
					</CustomContributeBadge>

					<Divider />
					{fulfilled ? <ApprovedBadge src={fulfilledIcon} /> : <TotalBadge>{unapprovedCount}</TotalBadge>}
					<ExpandToggle src={!isOpen ? caretDownIcon : caretUpIcon} />
				</DetailsColumn>
			</Header>
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
						<Footer>
							<SubmitButton
								variant="primary"
								disabled={selected.length === 0}
								onClick={() => {
									handleConfirm(requestID, selected);
								}}
							>
								Send Tokens
							</SubmitButton>
						</Footer>
					</>
				) : (
					<Body>
						<NoContributionMessage>There are no contributions for now</NoContributionMessage>
					</Body>
				)
			) : null}
		</Wrapper>
	);
};

export default RequestListItem;
