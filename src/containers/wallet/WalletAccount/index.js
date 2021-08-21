import React from 'react';
import Note from './../../../components/Note';
import styled from 'styled-components';
import nextStepIcon from './../../../assets/icons/next-step-arrow.svg';
import qrCodeImage from '../../../assets/icons/qr-code.png';
import { CopyableText } from './../../../utils';
import { Wrapper, Content, Row, Column } from './Layout';
import { QRCode, QRCodeImage, SaveQRCodeButton, AddressTitle, Address, CopyAddressButton } from './WalletInfo';
import WalletsList from '../../../components/IntroModal/WalletsList';

const NextStepArrow = styled.div`
	height: 100%;
	width: 24px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 230px;
	margin: 0 30px;

	&::before {
		content: '';
		height: 50%;
		width: 1px;
		background: #c4c4c4;
	}
	&::after {
		content: '';
		height: 50%;
		width: 1px;
		background: #c4c4c4;
	}
`;

const NextStepIcon = styled.img`
	width: 24px;
	margin: ${(props) => props.theme.spacing(0.7)};
`;

const Notice = styled(Note)`
	margin-left: -40px;
`;

const WalletAccount = ({ address }) => {
	return (
		<Wrapper>
			<Content>
				<Column fixed>
					<WalletsList view="list" />
				</Column>
				<NextStepArrow>
					<NextStepIcon src={nextStepIcon} />
				</NextStepArrow>
				<Column>
					<Row>
						{/* <Column center>
							<QRCode>
								<QRCodeImage src={qrCodeImage} />
							</QRCode>
							<SaveQRCodeButton variant="secondary">save QR code</SaveQRCodeButton>
						</Column> */}
						<Column center>
							<AddressTitle>BBit account address</AddressTitle>
							<Address>{address}</Address>
							<CopyableText textToCopy={address}>
								<CopyAddressButton variant="secondary">Copy address</CopyAddressButton>
							</CopyableText>
						</Column>
					</Row>
					<Row>
						<Notice title={'Advice'}>
							By copying your account address and sending it to others, you can easily have financial
							transactions, including Biobit, Ethereum, etc. Also, You must never give your private
							keys to anyone.
						</Notice>
					</Row>
				</Column>
			</Content>
		</Wrapper>
	);
};

export default WalletAccount;
