import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import TitleBar from '../../components/TitleBar/TitleBar';
import { Tabs } from '../../components/Tabs';
import { mainContext } from '../../state';
import WalletTransactions from '../../components/Tabs/DesktopContents/WalletTransactions';
import WalletDeposit from '../../components/Tabs/DesktopContents/WalletDeposit';
import WalletSendAssets from '../../components/Tabs/DesktopContents/WalletSendAssets';
import ConnectToMetamask from '../../components/ConnectToMetamask';
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




const Desktop = ({ account, logs, isLoading }) => {
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
        <Tabs data={[
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
        </Tabs>
      </Wrapper>
  );
}

export default Desktop;