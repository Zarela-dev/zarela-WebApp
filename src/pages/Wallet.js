import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { web3Context } from '../web3Provider';
import styled, { css } from 'styled-components';
import TitleBar from '../components/TitleBar';
import { Tabs } from '../components/Tabs';
import WalletTransactions from '../components/WalletTransactions';
import WalletDeposit from '../components/WalletDeposit';

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
	const { Web3 } = useContext(web3Context);
	const [logs, setLogs] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (Web3.accounts.length && isLoading === true)
			axios.get('https://api-kovan.etherscan.io/api', {
				params: {
					module: 'account',
					action: 'tokentx',
					contractaddress: process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS,
					address: Web3.accounts[0],
					page: 1,
					offset: 0,
					sort: 'desc',
					apikey: process.env.REACT_APP_ETHEREUM_API_KEY,
				}
			}).then(res => {
				if (res.data.message === 'OK')
					setLogs(res.data.result);
			}).catch(error => {
				console.error(error);
			}).finally(() => {
				setLoading(false);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, Web3.accounts.length]);

	return (
		<Wrapper>
			<WalletTitlebar>
				<Title>Wallet</Title>
				<Balance>
					{`Balance: ${+Web3.biobitBalance / Math.pow(10, 9)} Biobit`}
				</Balance>
			</WalletTitlebar>
			<Tabs data={[
				{
					label: 'Deposit',
					component: (
						<WalletInnerContainer elevated>
							<WalletDeposit />
						</WalletInnerContainer>
					)
				},
				{
					label: 'Withdraw',
					component: null
				},
				{
					label: 'Transactions',
					component: (
						!isLoading ?
							<WalletInnerContainer>
								<WalletTransactions data={logs.reverse()} />
							</WalletInnerContainer>
							: 'loading'
					)
				},
			]}>
			</Tabs>
		</Wrapper>
	);
};

export default Wallet;
