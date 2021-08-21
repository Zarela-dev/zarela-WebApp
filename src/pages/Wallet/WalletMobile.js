import React, { useContext } from 'react';
import styled from 'styled-components';
import TitleBar from '../../components/TitleBar/TitleBar';
import { Tabs } from '../../components/Tabs';
import { mainContext } from '../../state';
import MobileLayout from '../../components/MobileLayout';
import WalletTransactionsMobile from './../../containers/wallet/WalletTransactionsMobile';
import WalletAccountMobile from './../../containers/wallet/WalletAccount/Mobile';
import WalletSendAssets from './../../containers/wallet/WalletSendAssets';
import ConnectDialog from '../../components/Dialog/ConnectDialog';

const Wrapper = styled.div``;

const WalletInnerContainer = styled.div`
	padding: 0;
	margin: 0;
	background: ${(props) => (props.elevated ? '#FFFFFF' : '#F4F8FE')};
	border: ${(props) => (props.elevated ? '0.5px solid rgba(133, 206, 238, 0.5)' : 'none')};
	box-shadow: ${(props) => (props.elevated ? '0px 4px 18px rgba(223, 236, 255, 0.3)' : 'none')};
	border-radius: 8px;
`;

const WalletTitlebar = styled(TitleBar)`
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	height: ${(props) => (props.isMobile ? '85px' : 'unset')};
	padding: ${(props) => props.isMobile && '0 18px'};
	flex-direction: row;
	width: 100%;
	align-items: center;
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
	font-size: 14px;
	line-height: 18px;
	color: ${(props) => props.theme.textPrimary};
`;

export const WalletMobile = ({ data, account, logs, isLoading, PAGE_SIZE }) => {
	const { appState } = useContext(mainContext);

	return !account ? (
		<Wrapper>
			<WalletTitlebar isMobile={appState.isMobile}>
				<Title>Wallet</Title>
			</WalletTitlebar>
			{!account ? <ConnectDialog isOpen={true} /> : null}
		</Wrapper>
	) : (
		<Wrapper>
			<WalletTitlebar isMobile={appState.isMobile}>
				<Title>Wallet</Title>
				<Balance>{`Balance: ${+appState.biobitBalance} BBit`}</Balance>
			</WalletTitlebar>
			<MobileLayout>
				<Tabs
					route="wallet"
					isMobile={appState.isMobile}
					data={[
						{
							label: 'Account',
							component: (
								<WalletInnerContainer elevated>
									<WalletAccountMobile address={account ? account : 'please connect to Metamask'} />
								</WalletInnerContainer>
							),
						},
						{
							label: 'Send',
							component: (
								<WalletInnerContainer elevated>
									<WalletSendAssets mobile />
								</WalletInnerContainer>
							),
						},
						{
							label: 'Transactions',
							component: (
								<WalletInnerContainer>
									<WalletTransactionsMobile
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
			</MobileLayout>
		</Wrapper>
	);
};
