import React from 'react';
import styled, { css } from 'styled-components';
import { Tabs } from '../../components/Tabs';
import WalletTransactions from './../../containers/wallet/WalletTransactions';
import WalletAccount from './../../containers/wallet/WalletAccount';
import WalletSendAssets from './../../containers/wallet/WalletSendAssets';
import { Row } from '../../components/Elements/Flex';
import WalletDialog from '../../components/Dialog/WalletDialog';

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
	background: ${(props) => (props.elevated ? props.theme.colors.bgWhite : props.theme.colors.bgDisabled)};
	border: ${(props) => (props.elevated ? '0.5px solid rgba(133, 206, 238, 0.5)' : 'none')};
	box-shadow: ${(props) => (props.elevated ? '0px 4px 18px rgba(223, 236, 255, 0.3)' : 'none')};
	border-radius: 8px;
`;

const EtherscanAttribution = styled.div`
	font-size: 14px;
`;
const EtherscanAttributionLink = styled.a`
	text-decoration: underline;
	color: ${(props) => props.theme.colors.textPrimary};
`;

export const WalletDesktop = ({ account, logs, isLoading, PAGE_SIZE }) => {
	return !account ? (
		<Row>{!account ? <WalletDialog /> : null}</Row>
	) : (
		<Wrapper>
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
								<EtherscanAttribution>
									Powered by{' '}
									<EtherscanAttributionLink target="_blank" href="https://etherscan.io">
										Etherscan.io
									</EtherscanAttributionLink>{' '}
									APIs{' '}
								</EtherscanAttribution>
							</WalletInnerContainer>
						),
					},
				]}
			></Tabs>
		</Wrapper>
	);
};
