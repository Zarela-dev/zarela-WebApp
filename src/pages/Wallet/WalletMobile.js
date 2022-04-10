import styled from 'styled-components';
import TitleBar from '../../components/TitleBar/TitleBar';
import { Tabs } from '../../components/Tabs';
import MobileLayout from '../../components/MobileLayout';
import WalletTransactionsMobile from './../../containers/wallet/WalletTransactionsMobile';
import WalletAccountMobile from './../../containers/wallet/WalletAccount/Mobile';
import WalletSendAssets from './../../containers/wallet/WalletSendAssets';
import { useStore } from '../../state/store';
import WalletDialog from '../../components/Dialog/WalletDialog';

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

export const WalletMobile = ({ data, account, logs, isLoading, PAGE_SIZE }) => {
	const { isMobile } = useStore();

	return !account ? (
		<Wrapper>
			<WalletTitlebar isMobile={isMobile}></WalletTitlebar>
			{!account ? <WalletDialog /> : null}
		</Wrapper>
	) : (
		<Wrapper>
			<MobileLayout>
				<Tabs
					route="wallet"
					isMobile={isMobile}
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
									<WalletTransactionsMobile isLoading={isLoading} account={account} data={logs} PAGE_SIZE={PAGE_SIZE} />
								</WalletInnerContainer>
							),
						},
					]}
				></Tabs>
			</MobileLayout>
		</Wrapper>
	);
};
