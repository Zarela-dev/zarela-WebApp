import React from 'react';
import Note from '../Note';
import styled, { css } from 'styled-components';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import etherIcon from '../../assets/icons/ether-black.png';
import nextStepIcon from '../../assets/icons/next-step-arrow.svg';
import qrCodeImage from '../../assets/icons/qr-code.png';
import { CopyableText } from '../../utils';
import { Wrapper, Content, Row, Column } from './Layout';
import {
	Title, TokenList, TokenButton, TokenIcon, TokenName, Token
} from './DepositChoices';
import { QRCode, QRCodeImage, SaveQRCodeButton, AddressTitle, Address, CopyAddressButton } from './WalletInfo';

const NextStepArrow = styled.div`
	height: 100%;
	width: 24px;
	display: flex;
	justify-content:center;
	align-items: center;
	flex-direction: column;
	height: 260px;

	&::before {
		content: '';
		height: 50%;
		width: 1px;
		background: #C4C4C4;
	}
	&::after {
		content: '';
		height: 50%;
		width: 1px;
		background: #C4C4C4;
	}
`;

const NextStepIcon = styled.img`
	width: 24px;
	margin: ${props => props.theme.spacing(0.7)}
`;

const WalletDeposit = ({ address }) => {
	return (
		<Wrapper>
			<Content>
				<Column fixed>
					<Title>
						Choose the token
					</Title>
					<TokenList setApart>
						<Token active>
							<TokenIcon src={biobitIcon} />
							<TokenName>
								BBit
							</TokenName>
						</Token>
						<Token>
							<TokenIcon src={etherIcon} />
							<TokenName>
								Ethereum
							</TokenName>
						</Token>
					</TokenList>
					<Title>
						Choose the token
					</Title>
					<TokenList>
						<Token active>
							<TokenButton>
								ERC20
							</TokenButton>
						</Token>
					</TokenList>
				</Column>
				<NextStepArrow>
					<NextStepIcon src={nextStepIcon} />
				</NextStepArrow>
				<Column>
					<Row>
						<Column center>
							<QRCode>
								<QRCodeImage src={qrCodeImage} />
							</QRCode>
							<SaveQRCodeButton variant='secondary'>
								save QR code
							</SaveQRCodeButton>
						</Column>
						<Column center>
							<AddressTitle>
								BBit deposit address
							</AddressTitle>
							<Address>
								{address}
							</Address>
							<CopyableText textToCopy={address}>
								<CopyAddressButton variant='secondary'>
									Copy address
								</CopyAddressButton>
							</CopyableText>
						</Column>
					</Row>
				</Column>
			</Content>
			<Note title={'Important'}>
				dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
			</Note>
		</Wrapper>
	);
};

export default WalletDeposit;
