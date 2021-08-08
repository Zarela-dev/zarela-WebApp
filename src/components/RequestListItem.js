import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
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
import { Button } from './Elements/Button';
import axios from 'axios';
import { Buffer } from 'buffer';
import fileType from 'file-type';
import { useWeb3React } from '@web3-react/core';
import caretDownIcon from '../assets/icons/caret-down.svg';
import caretUpIcon from '../assets/icons/caret-up.svg';
import fulfilledIcon from '../assets/icons/check-green.svg';
import _ from 'lodash';

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

const SubmitButton = styled.button`
	${Button};
	width: 133px;
	height: 35px;
	margin-right: 0;
	margin-top: ${(props) => props.theme.spacing(3)};
	padding: ${(props) => props.theme.spacing(0.5)} ${(props) => props.theme.spacing(1.5)};
	font-weight: 500;
	font-size: 16px;
	line-height: 18px;
`;
const CustomContributeBadge = styled(ContributorBadge)`
	flex: 0 0 auto;
`;

const EqualSign = styled(BiobitToDollarValue)`
	margin: 0 5px;
`;

const ExpandToggle = styled.img`
	width: 24px;
	margin-left: ${(props) => props.theme.spacing(1.5)};
`;

const RequestListItem = ({
	showContributions,
	total,
	requestID,
	title,
	tokenPay,
	contributors,
	handleConfirm,
	fulfilled,
}) => {
	const [isOpen, setOpen] = useState(false);
	const [unapprovedCount, setUnapprovedCount] = useState(0);
	const [isFulfilled, setFulfilled] = useState(false);
	const { appState } = useContext(mainContext);
	const [formattedData, setFormattedData] = useState({});
	const [selected, setSelected] = useState([]);
	const { account } = useWeb3React();

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

		const selectableIndexes = originalIndexes.filter(
			(index) => !indexesAlreadyConfirmed.includes(index)
		);

		if (type === 'check') {
			setSelected(selectableIndexes);
		}
		if (type === 'uncheck') setSelected([]);
	};

	const isAllChecked = () => {
		const originalIndexes = [];
		const indexesAlreadyConfirmed = [];
		const selectedIndexes = [...selected];
		const all = Object.values(formattedData).reduce((acc, curr) => acc.concat(curr), []);

		all.forEach(({ status, originalIndex }) => {
			originalIndexes.push(originalIndex);
			if (Boolean(status) === true) indexesAlreadyConfirmed.push(originalIndex);
		});

		if (
			_.isEqual(
				[...selectedIndexes, ...indexesAlreadyConfirmed].sort(),
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
		const all = Object.values(formattedData).reduce((acc, curr) => acc.concat(curr), []);

		all.forEach(({ status, originalIndex }) => {
			originalIndexes.push(originalIndex);
			if (Boolean(status) === true) indexesAlreadyConfirmed.push(originalIndex);
		});

		if (_.isEqual(originalIndexes.sort(), indexesAlreadyConfirmed.sort())) return true;
		return false;
	};

	const isBulkApproved = (contributorAddress) => {
		const originalIndexes = [];
		const indexesAlreadyConfirmed = [];

		formattedData[contributorAddress]?.forEach(({ originalIndex, status }) => {
			originalIndexes.push(originalIndex);
			if (Boolean(status) === true) {
				indexesAlreadyConfirmed.push(originalIndex);
			}
		});

		if (_.isEqual(indexesAlreadyConfirmed.sort(), originalIndexes.sort())) {
			return true;
		}
		return false;
	};

	const isBulkChecked = (contributorAddress) => {
		const originalIndexes = [];
		const selectedIndexes = [];
		const indexesAlreadyConfirmed = [];

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
				[...selectedIndexes, ...indexesAlreadyConfirmed].sort(),
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

		formattedData[contributorAddress].forEach(({ originalIndex, status }) => {
			originalIndexes.push(originalIndex);
			if (Boolean(status)) {
				indexesAlreadyConfirmed.push(originalIndex);
			}
		});

		const selectableIndexes = originalIndexes.filter(
			(index) => !indexesAlreadyConfirmed.includes(index)
		);

		if (type === 'check') {
			setSelected((values) => [...values, ...selectableIndexes]);
		}
		if (type === 'uncheck')
			setSelected((values) =>
				values.filter((selectedItem) => !originalIndexes.includes(selectedItem))
			);
	};

	const onChange = (type, originalIndex) => {
		if (type === 'check') setSelected((values) => [...values, originalIndex]);
		if (type === 'uncheck')
			setSelected((values) => values.filter((item) => +item !== +originalIndex));
	};

	const signalDownloadHandler = (fileHash) => {
		// Start file download.
		axios
			.get(`${process.env.REACT_APP_IPFS_LINK + fileHash}`)
			.then((fileRes) => {
				window.ethereum
					.request({
						method: 'eth_decrypt',
						params: [fileRes.data, account],
					})
					.then((decryptedMessage) => {
						async function getDownloadUrl(base64) {
							var byteString = atob(base64);
							var ab = new ArrayBuffer(byteString.length);
							var ia = new Uint8Array(ab);
							var buff = Buffer.from(base64, 'base64');
							var contributionFileExt = await fileType.fromBuffer(buff);
							for (var i = 0; i < byteString.length; i++) {
								ia[i] = byteString.charCodeAt(i);
							}
							return `data:${contributionFileExt.mime};base64,${base64}`;
						}

						var saveByteArray = (function () {
							var anchorTag = document.createElement('a');
							document.body.appendChild(anchorTag);
							anchorTag.style = 'display: none';

							return async function (data, name) {
								try {
									var url = await getDownloadUrl(data);

									anchorTag.href = url;
									anchorTag.download = name;
									anchorTag.click();
								} catch (error) {
									console.error(error);
								}
							};
						})();
						saveByteArray(decryptedMessage, fileHash);
					})
					.catch((error) => console.log(error.message));
			})
			.catch((error) => console.log(error.message));
	};

	useEffect(() => {
		if (showContributions && appState.contract !== null) {
			appState.contract.methods.getOrderData(requestID).call((orderInfoError, orderInfo) => {
				if (!orderInfoError) {
					appState.contract.methods
						.ownerSpecificData(requestID)
						.call({ from: account }, (fileError, files) => {
							if (!fileError) {
								let addresses = orderInfo[0];
								let timestamp = orderInfo[1];
								let status = orderInfo[2];

								let formatted = {};
								let uniqueAddresses = [...new Set(addresses)];
								let pairs = [];

								// count all the unapproved files
								setUnapprovedCount(
									status.filter((item) => Boolean(item) === false).length
								);

								addresses.forEach((address, fileIndex) => {
									pairs.push({
										file: files[0][fileIndex],
										AesEncryptionKey: files[1][fileIndex],
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
													originalIndex: tempItem.originalIndex,
													status: tempItem.status,
												});
											} else {
												formatted[uAddress] = [
													{
														ipfsHash: tempItem.file,
														timestamp: tempItem.timestamp,
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
	}, [appState.contract]);

	return (
		<Wrapper>
			<Header onClick={() => setOpen(!isOpen)}>
				<TitleColumn>
					<RequestNumberWithPointer>{requestID}</RequestNumberWithPointer>
					<Title variant="title" weight="semiBold">
						{title.length < 135 ? title : title.substr(0, 135) + '...'}
					</Title>
					<Spacer />
				</TitleColumn>

				<DetailsColumn>
					<BiobitToDollarPair>
						<BadgeRow>
							<TokenIcon src={biobitIcon} />
							<TokenValue>{tokenPay}</TokenValue>
							<ValueLabel>BBit</ValueLabel>
							<BiobitToDollarValue noMargin>{'~ $' + tokenPay}</BiobitToDollarValue>
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
					{fulfilled ? (
						<ApprovedBadge src={fulfilledIcon} />
					) : (
						<TotalBadge>{unapprovedCount}</TotalBadge>
					)}
					<ExpandToggle src={!isOpen ? caretDownIcon : caretUpIcon} />
				</DetailsColumn>
			</Header>
			{showContributions && isOpen ? (
				Object.keys(formattedData).length > 0 ? (
					<>
						<Body>
							<RequestFilesTable
								signalDownloadHandler={signalDownloadHandler}
								data={formattedData}
								selected={selected}
								onChange={onChange}
								onBulkChange={onBulkChange}
								isBulkChecked={isBulkChecked}
								isBulkApproved={isBulkApproved}
								isAllApproved={isAllApproved}
								isAllChecked={isAllChecked}
								changeAll={changeAll}
							/>
						</Body>
						<Footer>
							<SubmitButton
								onClick={() => {
									// let payload = [];

									// Object.keys(selected).forEach((item) => {
									// 	payload.push(
									// 		...selected[item].map((fileHash) => {
									// 			// we need the duplicated addresses here
									// 			return item;
									// 		})
									// 	);
									// });
									handleConfirm(requestID, selected);
								}}
							>
								Send Tokens
							</SubmitButton>
						</Footer>
					</>
				) : (
					<Body>
						<NoContributionMessage>
							There are no contributions for now
						</NoContributionMessage>
					</Body>
				)
			) : null}
		</Wrapper>
	);
};

export default RequestListItem;
