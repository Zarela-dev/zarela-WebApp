import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Spacer } from './Elements/Spacer';
import { WithPointerCursor } from './Elements/WithPointerCursor';
import {
	ContributorsIcon,
	ContributorBadge,
	TokenIcon,
	OrderNumber,
	BiobitToDollarPair,
	BadgeRow,
	BadgeLabel,
	TokenValue,
	ValueLabel,
	BiobitToDollarValue
} from './Elements/OrderCard';
import { Typography } from './Elements/Typography';
import biobitIcon from '../assets/icons/biobit-black.svg';
import contributorIcon from '../assets/icons/user-blue.svg';
import OrderFilesTable from './OrderFilesTable';
import { web3Context } from '../web3Provider';
import { Button } from './Elements/Button';
import axios from 'axios';
import { Buffer } from 'buffer';
import fileType from 'file-type';

const Wrapper = styled.div`
	background: ${props => props.seen ? '#EDFBF8' : '#EAF2FF'};
	opacity: 0.8;
	border-radius: 8px;
	padding: ${props => props.theme.spacing(3)} ${props => props.theme.spacing(3.5)};
	margin-bottom: ${props => props.theme.spacing(2)};
`;

const Header = styled.header`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
`;

const OrderNumberWithPointer = styled(OrderNumber)`
	${WithPointerCursor};
`;

const Title = styled(Typography)`
	${WithPointerCursor};
`;

const TotalBadge = styled.div`
	background: #2EECA8;
	min-width: 32px;
	height: 32px;
	padding: ${props => props.theme.spacing(0.8)} ${props => props.theme.spacing(0.6)};
	border-radius: 32px;

	text-align: center;
	font-weight: bold;
	font-size: 16px;
	line-height: 18px;
	color: white;
`;

const Divider = styled.div`
	width: 1px;
	background: #3C87AA;
	min-height: 37px;
	margin: 0 ${props => props.theme.spacing(1)};
`;

const Body = styled.section`

`;

const NoContributionMessage = styled.div`
	margin-top: ${props => props.theme.spacing(2)};
	margin-left: ${props => props.theme.spacing(12)};
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
	margin-top: ${props => props.theme.spacing(3)};
	padding: ${props => props.theme.spacing(0.5)} ${props => props.theme.spacing(1.5)};
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

const OrderListItem = ({
	showContributions,
	total,
	orderId,
	title,
	tokenPay,
	contributors,
	handleConfirm
}) => {
	const [isOpen, setOpen] = useState(false);
	const { Web3 } = useContext(web3Context);
	const [formattedData, setFormattedData] = useState({});
	const [selected, setSelected] = useState({});

	const isAllChecked = () => {
		const chosen = Object.values(selected).reduce((acc, curr) => acc.concat(...curr), []);
		const total = Object.values(formattedData).reduce((acc, curr) => acc.concat(...curr), []);
		return chosen.length === total.length;
	};

	const changeAll = (type) => {
		const allSelected = {};
		Object.keys(formattedData).forEach(address => {
			allSelected[address] = formattedData[address].map(item => item.ipfsHash);
		});

		if (type === 'check')
			setSelected(allSelected);
		if (type === 'uncheck')
			setSelected(values => {
				let result = {};

				Object.keys(values).forEach(address => {
					result[address] = [];
				});

				return result;
			});
	};

	const onBulkChange = (type, address) => {
		if (type === 'check')
			setSelected(values => ({
				...values,
				[address]: formattedData[address].map(item => item.ipfsHash)
			}));
		if (type === 'uncheck')
			setSelected(values => {
				return {
					...values,
					[address]: []
				};
			});
	};

	const onChange = (type, address, fileHash) => {
		if (type === 'check')
			setSelected(values => ({
				...values,
				[address]: [...values[address], fileHash]
			}));
		if (type === 'uncheck')
			setSelected(values => {
				return {
					...values,
					[address]: values[address].filter(item => item !== fileHash)
				};
			});
	};

	const signalDownloadHandler = (fileHash) => {
		// Start file download.
		axios.get(`${process.env.REACT_APP_IPFS_LINK + fileHash}`)
			.then(fileRes => {
				window.ethereum
					.request({
						method: 'eth_decrypt',
						params: [fileRes.data, Web3.accounts[0]],
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
							var anchorTag = document.createElement("a");
							document.body.appendChild(anchorTag);
							anchorTag.style = "display: none";

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
						}());
						saveByteArray(decryptedMessage, fileHash);
					})
					.catch((error) => console.log(error.message));
			})
			.catch((error) => console.log(error.message));
	};

	useEffect(() => {
		if (showContributions && Web3.contract !== null) {
			Web3.contract.methods.GetOrderFiles(orderId).call({ from: Web3.accounts[0] }, (error, result) => {
				if (!error) {
					let formatted = {};
					let selected = {};
					let uniqueAddresses = [...new Set(result[1])];
					let pairs = [];

					result[0].forEach((file, fileIndex) => {
						pairs.push({
							file,
							address: result[1][fileIndex],
							timestamp: result[2][fileIndex]
						});
					});

					uniqueAddresses.forEach((uAddress, uIndex) => {
						pairs.forEach((tempItem, tempIndex) => {
							if (tempItem.address === uAddress) {
								if (Object(formatted).hasOwnProperty(uAddress)) {
									formatted[uAddress].push({ ipfsHash: tempItem.file, timestamp: tempItem.timestamp });
								} else {
									formatted[uAddress] = [{ ipfsHash: tempItem.file, timestamp: tempItem.timestamp }];
								}
								selected[uAddress] = [];
							}
						});
					});

					setFormattedData(formatted);
					setSelected(selected);
				} else {
					console.error(error.message);
				}
			});
		}
	}, [Web3.contract]);

	return (
		<Wrapper>
			<Header onClick={() => setOpen(!isOpen)}>
				<OrderNumberWithPointer>
					{orderId}
				</OrderNumberWithPointer>
				<Title variant='title' weight='semiBold'>
					{title.length < 135 ? title : title.substr(0, 135) + '...'}
				</Title>
				<Spacer />
				<BiobitToDollarPair>
					<BadgeRow>
						<TokenIcon src={biobitIcon} />
						<TokenValue>
							{tokenPay}
						</TokenValue>
						<ValueLabel>
							BioBit
						</ValueLabel>
						<EqualSign>
							=
						</EqualSign>
						<BiobitToDollarValue>
							{'$' + tokenPay}
						</BiobitToDollarValue>
						<ValueLabel colored>
							Dollar
						</ValueLabel>
					</BadgeRow>
				</BiobitToDollarPair>
				<Divider />
				<CustomContributeBadge>
					<BadgeRow>
						<ContributorsIcon src={contributorIcon} />
						<BadgeLabel>
							{contributors}
						</BadgeLabel>
					</BadgeRow>
				</CustomContributeBadge>
				<Divider />
				<TotalBadge>
					{total}
				</TotalBadge>
			</Header>
			{
				showContributions && isOpen ?
					Object.keys(formattedData).length > 0 ?
						<>
							<Body>
								<OrderFilesTable
									signalDownloadHandler={signalDownloadHandler}
									data={formattedData}
									selected={selected}
									onChange={onChange}
									onBulkChange={onBulkChange}
									isAllChecked={isAllChecked}
									changeAll={changeAll}
								/>
							</Body>
							<Footer>
								<SubmitButton onClick={() => {
									let payload = [];

									Object.keys(selected).forEach(item => {
										payload.push(...selected[item].map(fileHash => {
											// we need the duplicated addresses here
											return item;
										}));
									});
									if (payload.length > 0)
										handleConfirm(orderId, payload);
								}}>
									Send Tokens
								</SubmitButton>
							</Footer>
						</>
						: <Body>
							<NoContributionMessage>
								There are no contributions for now
							</NoContributionMessage>
						</Body>
					: null
			}
		</Wrapper>
	);
};

export default OrderListItem;
