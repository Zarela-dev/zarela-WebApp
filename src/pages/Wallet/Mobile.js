import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import TitleBarMobile from '../../components/TitleBar/TitleBarMobile';
import { MobileTabs } from '../../components/Tabs/Mobile';
import { mainContext } from '../../state';
import WalletTransactions from '../../components/Tabs/MobileContents/WalletTransactions';
import WalletDeposit from '../../components/Tabs/MobileContents/WalletDeposit';
import WalletSendAssets from '../../components/Tabs/MobileContents/WalletSendAssets';
import ConnectToMetamask from '../../components/ConnectToMetamask';
import MobileLayout from '../../components/MobileLayout';

const Wrapper = styled.div`
`;


const WalletInnerContainer = styled.div`
padding: 0;
margin: 0;
background: ${props => props.elevated ? '#FFFFFF' : '#F4F8FE'};
border: ${props => props.elevated ? '0.5px solid rgba(133, 206, 238, 0.5)' : 'none'};
box-shadow: ${props => props.elevated ? '0px 4px 18px rgba(223, 236, 255, 0.3)' : 'none'};
border-radius: 8px;
`;

const WalletTitlebar = styled(TitleBarMobile)`
display: flex;
flex-wrap: nowrap;
justify-content: space-between;

height: 85px;
padding: 0 18px;
flex-direction: row;
display: flex;
width: 100%;
align-items: center;


`;

const Title = styled.div`
font-weight: 500;
font-size: 22px;
line-height: 28px;
color: ${props => props.theme.textPrimary};
padding:0;
`;

const Balance = styled.div`
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 18px;
color: ${props => props.theme.textPrimary};
`;

const Mobile = ({ account, logs, isLoading }) => {
  const { appState } = useContext(mainContext);

  return (
    !account ?
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
        <MobileLayout>
          <MobileTabs data={[
            {
              label: 'Deposit',
              component: (
                <WalletInnerContainer elevated>
                  <WalletDeposit address={account ? account : 'please connect to Metamask'} />
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
                  <WalletTransactions isLoading={isLoading} account={account} data={logs} />
                </WalletInnerContainer>
              )
            },
          ]}>
          </MobileTabs>
        </MobileLayout>
      </Wrapper>
  );
}

export default Mobile;