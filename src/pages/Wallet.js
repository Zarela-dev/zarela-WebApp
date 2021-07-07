import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { mainContext } from '../state';
import styled, { css } from 'styled-components';
import TitleBar from '../components/TitleBar';
import { Tabs } from '../components/Tabs';
import WalletTransactions from '../components/WalletTransactions';
import WalletDeposit from '../components/WalletDeposit';
import WalletSendAssets from '../components/WalletSendAssets';
import ConnectToMetamask from '../components/ConnectToMetamask';

const Wrapper = styled.div`

`;

function getInnerPadding(props) {
	if (props.elevated)
		return css`
			padding: ${props => props.theme.spacing(3.6)} ${props => props.theme.spacing(5.7)};
		`;
	return css`
		padding: ${props => props.theme.spacing(2.5)} ${props => props.theme.spacing(2)};
	`;
}

const WalletInnerContainer = styled.div`
	${props => getInnerPadding(props)};
	background: ${props => props.elevated ? '#FFFFFF' : '#F4F8FE'};
	border: ${props => props.elevated ? '0.5px solid rgba(133, 206, 238, 0.5)' : 'none'};
	box-shadow: ${props => props.elevated ? '0px 4px 18px rgba(223, 236, 255, 0.3)' : 'none'};
	border-radius: 8px;
`;

const WalletTitlebar = styled(TitleBar)`
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
`;

const Title = styled.div`
	font-weight: 500;
	font-size: 26px;
	line-height: 34px;
	color: ${props => props.theme.textPrimary};
`;

const Balance = styled.div`
	font-style: normal;
	font-weight: 500;
	font-size: 22px;
	line-height: 29px;
	color: ${props => props.theme.textPrimary};
`;

const Wallet = () => {
	const { appState } = useContext(mainContext);
	const [logs, setLogs] = useState([]);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		if (appState.accounts.length) {
			setLoading(true);
			axios.get('https://api-kovan.etherscan.io/api', {
				params: {
					module: 'account',
					action: 'txlist',
					address: appState.accounts[0],
					sort: 'desc',
					apikey: process.env.REACT_APP_ETHEREUM_API_KEY,
				}
			}).then(txListRes => {
				if (txListRes.data.message === 'OK') {
					axios.get('https://api-kovan.etherscan.io/api', {
						params: {
							module: 'account',
							action: 'tokentx',
							address: appState.accounts[0],
							contractaddress: process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS,
							sort: 'desc',
							apikey: process.env.REACT_APP_ETHEREUM_API_KEY,
						}
					}).then(async tokentxRes => {
						/* 
							here we have a two APIs from etherscan that each of them give parts of the list we want,
							here we take the parts that we want from each list them merge and sort them.

							here is a list of what we want and where they are located on the APIs.

								tokentx																txlist		
							-----------------------------------------------------------------------------------
								reward (from both pool and request owners)							tx inputs
								proper values														contribution
								BBit transfers														ETH transfer
																									confirmation
																									create request

							results will include all transactions from above lists. but the values are overridden by tokentx.
							also the inputs are overridden by txlist.
						*/
						if (tokentxRes.data.message === 'OK') {
							const smartContactAddress = process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS.toLowerCase();

							const txlist = txListRes.data.result;
							const tokentx = tokentxRes.data.result;

							const tokentxFormatted = {};
							const txlistFormatted = {};

							tokentx.forEach(item => {
								tokentxFormatted[item.hash] = item;
							});

							txlist.forEach(item => {
								txlistFormatted[item.hash] = item;
							});

							let result = [];

							txlist.forEach(item => {
								result.push({
									...item,
									value: tokentxFormatted[item.hash]?.value || txlistFormatted[item.hash]?.value || 0
								});
								/* 
									we exclude the data that is already present on txlist to prevent duplication
									on final results
								*/
								delete tokentxFormatted[item.hash];
							});

							async function hasZarelaContract(txObject) {
								/* 
									to detect if the address is a contract so we can filter it
									(we don't want to show txs from other dApps or our previous smart contracts)
								*/
								let from = await appState.fallbackWeb3Instance.eth.getCode(txObject.from);
								let to = await appState.fallbackWeb3Instance.eth.getCode(txObject.to);

								console.log('from ', from !== '0x', txObject.from === smartContactAddress);
								console.log('to ', to !== '0x', txObject.to === smartContactAddress);

								if (
									(from !== '0x' && txObject.from === smartContactAddress) ||
									(to !== '0x' && txObject.to === smartContactAddress)
								) {
									console.log('zarela transaction');
									return true;
								} else {
									console.log('non zarelean transaction');
									return false;
								}
							}

							const mergeResults = async () => {
								for (const txItem of Object.values(tokentxFormatted)) {
									console.log('checking recepient');
									const hasZarela = await hasZarelaContract(txItem);

									if (hasZarela) {
										console.log('checking recepient');
										result.push({
											...txItem,
											input: 'Reward'
										});
									} else {
										console.log('checking recepient');
										result.push({
											...txItem,
											input: 'BBit transfer'
										});
									}
								}
							};

							await mergeResults();
							result.sort((a, b) => +b.timeStamp - +a.timeStamp);

							setLogs(result);
						}
					}).catch(error => {
						console.error(error);
					}).finally(() => {
						setLoading(false);
					});
				}
			}).catch(error => {
				console.error(error);
			}).finally(() => {
				setLoading(false);
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appState.accounts]);

	return (
		appState.accounts.length === 0 ?
			<Wrapper>
				<WalletTitlebar>
					<Title>Wallet</Title>
				</WalletTitlebar>
				<ConnectToMetamask />
			</Wrapper>
			:
			<Wrapper>
				<WalletTitlebar>
					<Title>Wallet</Title>
					<Balance>
						{`Balance: ${+appState.biobitBalance / Math.pow(10, 9)} BBit`}
					</Balance>
				</WalletTitlebar>
				<Tabs data={[
					{
						label: 'Deposit',
						component: (
							<WalletInnerContainer elevated>
								<WalletDeposit address={appState.accounts.length ? appState.accounts[0] : 'please connect to Metamask'} />
							</WalletInnerContainer>
						)
					},
					{
						label: 'Send',
						component: (
							<WalletInnerContainer elevated>
								<WalletSendAssets />
							</WalletInnerContainer>
						)
					},
					{
						label: 'Transactions',
						component: (
							<WalletInnerContainer>
								<WalletTransactions isLoading={isLoading} accounts={appState.accounts} data={logs} />
							</WalletInnerContainer>
						)
					},
				]}>
				</Tabs>
			</Wrapper>
	);
};

export default Wallet;
