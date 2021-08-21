import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import TitleBar from '../../components/TitleBar/TitleBar';
import { Tabs } from '../../components/Tabs';
import { mainContext } from '../../state';
import WalletTransactions from './../../containers/wallet/WalletTransactions';
import WalletAccount from './../../containers/wallet/WalletAccount';
import WalletSendAssets from './../../containers/wallet/WalletSendAssets';
import ConnectDialog from '../../components/Dialog/ConnectDialog';

const Wrapper = styled.div``;

function getInnerPadding(props) {
	if (props.elevated)
		return css`
			padding: ${(props) => props.theme.spacing(3.6)} ${(props) => props.theme.spacing(5.7)};
		`;
	return css`
		padding: ${(props) => props.theme.spacing(2.5)} ${(props) => props.theme.spacing(2)};
	`;
}

const WalletInnerContainer = styled.div`
	${(props) => getInnerPadding(props)};
	background: ${(props) => (props.elevated ? '#FFFFFF' : '#F4F8FE')};
	border: ${(props) => (props.elevated ? '0.5px solid rgba(133, 206, 238, 0.5)' : 'none')};
	box-shadow: ${(props) => (props.elevated ? '0px 4px 18px rgba(223, 236, 255, 0.3)' : 'none')};
	border-radius: 8px;
`;

const WalletTitlebar = styled(TitleBar)`
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
`;

const Title = styled.div`
	font-weight: 700;
	font-size: 24px;
	line-height: 28px;
	color: ${(props) => props.theme.textPrimary};
	padding: 0;

	@media only screen and (max-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		font-size: 18px;
	}
`;

const Balance = styled.div`
	font-style: normal;
	font-weight: 500;
	font-size: 22px;
	line-height: 29px;
	color: ${(props) => props.theme.textPrimary};
`;

export const WalletDesktop = ({ account, logs, isLoading, PAGE_SIZE }) => {
	const { appState } = useContext(mainContext);

	return !account ? (
		<Wrapper>
			<WalletTitlebar>
				<Title>Wallet</Title>
			</WalletTitlebar>
			{!account ? <ConnectDialog isOpen={true} /> : null}
		</Wrapper>
	) : (
		<Wrapper>
			<WalletTitlebar>
				<Title>Wallet</Title>
				<Balance>{`Balance: ${+appState.biobitBalance} BBit`}</Balance>
			</WalletTitlebar>
			<Tabs
				route="wallet"
				data={[
					{
						label: 'Account',
						component: (
							<WalletInnerContainer elevated>
								<WalletAccount address={account ? account : 'please connect to Metamask'} />
							</WalletInnerContainer>
						),
					},
					{
						label: 'Send',
						component: (
							<WalletInnerContainer elevated>
								<WalletSendAssets />
							</WalletInnerContainer>
						),
					},
					{
						label: 'Transactions',
						component: (
							<WalletInnerContainer>
								<WalletTransactions
									isLoading={isLoading}
									account={account}
									data={logs}
									PAGE_SIZE={PAGE_SIZE}
								/>
							</WalletInnerContainer>
						),
					},
				]}
			></Tabs>
		</Wrapper>
	);
};
