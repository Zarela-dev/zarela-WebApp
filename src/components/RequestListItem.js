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
import { mainContext, confirmationContext } from '../state';
import { Button } from './Elements/Button';
import axios from 'axios';
import { Buffer } from 'buffer';
import fileType from 'file-type';
import { useWeb3React } from '@web3-react/core';
import { arraySymmetricDiff } from '../utils';

const Wrapper = styled.div`
	background: #eef5ff;
	border-radius: 8px;
	padding: ${(props) => props.theme.spacing(3)} ${(props) => props.theme.spacing(3.5)};
	margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const Header = styled.header`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
`;

const RequestNumberWithPointer = styled(RequestNumber)`
	${WithPointerCursor};
`;

const Title = styled(Typography)`
	${WithPointerCursor};
`;

const TotalBadge = styled.div`
	background: #2eeca8;
	min-width: 32px;
	height: 32px;
	padding: ${(props) => props.theme.spacing(0.8)} ${(props) => props.theme.spacing(0.6)};
	border-radius: 32px;

	text-align: center;
	font-weight: bold;
	font-size: 16px;
	line-height: 18px;
	color: white;
`;

const Divider = styled.div`
	width: 1px;
	background: #3c87aa;
	min-height: 37px;
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

const RequestListItem = ({
	showContributions,
	total,
	requestID,
	title,
	tokenPay,
	contributors,
	handleConfirm,
}) => {
	const [isOpen, setOpen] = useState(false);
	const { appState } = useContext(mainContext);
	const { confirmations } = useContext(confirmationContext);
	const [formattedData, setFormattedData] = useState({});
	const [unstaged, setUnstaged] = useState({});
	const { account } = useWeb3React();

	/* 
		here we need to extract the contributors object from local storage and give it to 
		selected data type (the state that captures the user file selection)

		now due to the nature of the ethereum network for a transaction to be confirmed
		it might take up to hours in some cases, but normally it happens way faster.

		we have 2 events, one that gets triggered when the transaction hash is ready, and 
		one that triggers when the transaction is mined and it's considered "confirmed".

		when the user changes the value of a checkbox, we store that in "selected" state 
		locally to this component. after the user has made his/her/it's selection, they try
		submitting, after the transaction hash is generated and returned to us, we take that
		selection along with other required data and store it as stagedFiles (sf) in localstorage.

		now we empty the "selected" state, and will show the checkboxes as checked and readonly
		but with a different color so the user knows these files are not yet fully approved on the blockchain.

		and after the completion event is triggered, we move the stagedFiles into confirmedFiles 
		and will remove those form stagedFiles on localstorage.

	*/
	const getLocalConfirmations = (confirmations, requestID, state = 'confirmed') => {
		let localStorageData = confirmations[state];

		let formattedConfirmedFiles = {};

		Object.values(localStorageData).forEach((item) => {
			if (item?.requestID === requestID) {
				if (formattedConfirmedFiles[requestID] !== undefined) {
					let union = {};

					Object.keys(formattedConfirmedFiles[requestID]).forEach(
						(contributorAddress) => {
							let theFiles = formattedConfirmedFiles[requestID][contributorAddress];

							if (theFiles.length > 0) {
								union[contributorAddress] = [
									...theFiles,
									...item.contributions[contributorAddress],
								];
							} else {
								union[contributorAddress] = item.contributions[contributorAddress];
							}
						}
					);

					formattedConfirmedFiles[requestID] = union;
				} else {
					formattedConfirmedFiles[requestID] = item.contributions;
				}
			}
		});

		return formattedConfirmedFiles[requestID] || {};
	};

	const isAllChecked = () => {
		const chosen = Object.values(unstaged).reduce((acc, curr) => acc.concat(...curr), []);
		const total = Object.values(formattedData).reduce((acc, curr) => acc.concat(...curr), []);
		return chosen.length === total.length;
	};

	const changeAll = (type) => {
		let locallyConfirmed = getLocalConfirmations(confirmations, requestID);
		let locallyStaged = getLocalConfirmations(confirmations, requestID, 'staged');
		let totalUnstagedFiles = {};

		Object.keys(formattedData).forEach((address) => {
			let filesFromBoth = locallyConfirmed[address]?.concat(locallyStaged[address] || []);
			let allFiles = formattedData[address].map((item) => item.ipfsHash);
			let remainingUnstagedFiles = arraySymmetricDiff(allFiles || [], filesFromBoth || []);
			totalUnstagedFiles[address] = remainingUnstagedFiles;
		});

		if (type === 'check') setUnstaged(totalUnstagedFiles);
		if (type === 'uncheck')
			setUnstaged((values) => {
				let result = {};

				Object.keys(values).forEach((address) => {
					result[address] = [];
				});

				return result;
			});
	};

	const onBulkChange = (type, address) => {
		if (type === 'check') {
			let locallyConfirmed = getLocalConfirmations(confirmations, requestID);
			let locallyStaged = getLocalConfirmations(confirmations, requestID, 'staged');
			let filesFromBoth = locallyConfirmed[address]?.concat(locallyStaged[address] || []);
			let allFiles = formattedData[address].map((item) => item.ipfsHash);
			let remainingUnstagedFiles = arraySymmetricDiff(allFiles || [], filesFromBoth || []);

			setUnstaged((values) => {
				return {
					...values,
					[address]: remainingUnstagedFiles,
				};
			});
		}

		if (type === 'uncheck')
			setUnstaged((values) => {
				return {
					...values,
					[address]: [],
				};
			});
	};

	const onChange = (type, address, fileHash) => {
		if (type === 'check')
			setUnstaged((values) => {
				return {
					...values,
					[address]: [...values[address], fileHash],
				};
			});
		if (type === 'uncheck')
			setUnstaged((values) => {
				return {
					...values,
					[address]: values[address].filter((item) => item !== fileHash),
				};
			});
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
			appState.contract.methods
				.GetOrderFiles(requestID)
				.call({ from: account }, (error, result) => {
					const files = result[0],
						addresses = result[1],
						timestamps = result[2];

					if (!error) {
						let formatted = {};
						let selected = {};
						let uniqueAddresses = [...new Set(addresses)];
						let contributions = [];

						files.forEach((file, fileIndex) => {
							contributions.push({
								file,
								// indexes on both arrays are synced
								address: addresses[fileIndex],
								timestamp: timestamps[fileIndex],
							});
						});

						uniqueAddresses.forEach((uAddress /* unique address */, uIndex) => {
							contributions.forEach((contribution, tempIndex) => {
								if (contribution.address === uAddress) {
									if (Object(formatted).hasOwnProperty(uAddress)) {
										formatted[uAddress].push({
											ipfsHash: contribution.file,
											timestamp: contribution.timestamp,
										});
									} else {
										formatted[uAddress] = [
											{
												ipfsHash: contribution.file,
												timestamp: contribution.timestamp,
											},
										];
									}
									selected[uAddress] = [];
								}
							});
						});

						setFormattedData(formatted);
						setUnstaged(selected);
					} else {
						console.error(error.message);
					}
				});
		}
	}, [appState.contract]);

	return (
		<Wrapper>
			<Header onClick={() => setOpen(!isOpen)}>
				<RequestNumberWithPointer>{requestID}</RequestNumberWithPointer>
				<Title variant="title" weight="semiBold">
					{title.length < 135 ? title : title.substr(0, 135) + '...'}
				</Title>
				<Spacer />
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
				<TotalBadge>{total}</TotalBadge>
			</Header>
			{showContributions && isOpen ? (
				Object.keys(formattedData).length > 0 ? (
					<>
						<Body>
							<RequestFilesTable
								signalDownloadHandler={signalDownloadHandler}
								data={formattedData}
								unstaged={unstaged}
								confirmed={getLocalConfirmations(confirmations, requestID)}
								staged={getLocalConfirmations(confirmations, requestID, 'staged')}
								onChange={onChange}
								onBulkChange={onBulkChange}
								isAllChecked={isAllChecked}
								changeAll={changeAll}
							/>
						</Body>
						<Footer>
							<SubmitButton
								onClick={() => {
									let payload = [];

									Object.keys(unstaged).forEach((item) => {
										payload.push(
											...unstaged[item].map((fileHash) => {
												// we need the duplicated addresses here
												return item;
											})
										);
									});

									if (payload.length > 0)
										handleConfirm(
											requestID,
											payload,
											unstaged,
											setUnstaged
										);
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
