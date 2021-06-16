import React from 'react';
import styled from 'styled-components';
import {
	Title, TokenList, TokenButton, TokenIcon, TokenName, Token
} from './WalletDeposit/DepositChoices';
import { Content, Row, Column } from './WalletDeposit/Layout';
import biobitIcon from '../assets/icons/biobit-black.svg';
import etherIcon from '../assets/icons/ether-black.png';
import Textfield from './Elements/TextField';
import Button from './Elements/Button';
import copyImage from '../assets/icons/copy.svg';
import { CopyableText } from '../utils';

const WalletInput = styled(Textfield)`
	min-width: 510px;
	margin-bottom: ${props => props.theme.spacing(4)}
`;

const CopyIcon = styled.img`

`;

const WithdrawButton = styled(Button)`
	align-self: flex-end;
    margin: 0;
`;

const Wrapper = styled.div`
	width: 510px;
`;

const WalletWithdraw = () => {
	return (
		<Wrapper>
			<Content>
				<Column>
					<Title>
						Current cryptocurrency
					</Title>
					<TokenList>
						<Token>
							<TokenIcon src={biobitIcon} />
							<TokenName>
								Biobit
							</TokenName>
						</Token>
					</TokenList>
					<WalletInput
						label={'Address'}
						placeholder={'Please enter the wallet address'}
						actions={[
							{
								content: (
									<CopyableText>
										<CopyIcon src={copyImage} />
									</CopyableText>
								),
								onClick: () => { console.log('bar'); }
							}
						]}
					/>
					<Title>
						Choose Token
					</Title>
					<TokenList>
						<Token>
							<TokenIcon src={biobitIcon} />
							<TokenName>
								Biobit
							</TokenName>
						</Token>
						<Token>
							<TokenIcon src={etherIcon} />
							<TokenName>
								Ethereum
							</TokenName>
						</Token>
					</TokenList>
					<WalletInput
						label={'Amount'}
						helperText={'Transaction fee: 0 USTD'}
						placeholder={'Minimum 0 USTD'}
						hint={'Available: 256000 BBIT'}
						adornment={'Max'}
						coloredAdornment
					/>
					<WalletInput helperText="= $ 0.0000056" placeholder={'You will get'} adornment={'0 ETH.'}/>
					<WithdrawButton variant='primary'>
						Withdraw
					</WithdrawButton>
				</Column>
			</Content>
		</Wrapper>
	);
};

export default WalletWithdraw;
