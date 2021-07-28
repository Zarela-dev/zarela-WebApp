import React from "react";
import Note from "../../../components/Note";
import styled, { css } from "styled-components";
// import biobitIcon from "../../../../assets/icons/biobit-black.svg";
// import etherIcon from "../../../../assets/icons/ether-black.png";
import nextStepIcon from "../../../assets/icons/next-step-arrow-down.svg";
import qrCodeImage from "../../../assets/icons/qr-code.png";
import { CopyableText } from "../../../utils";
import { Wrapper, Content, Row, Column , MobileColumn} from "./Layout";
import {
	Title,
	TokenList,
	TokenButton,
	TokenIcon,
	TokenName,
	Token,
} from "./DepositChoices";
import {
	QRCode,
	QRCodeMobile,
	QRCodeImage,
	SaveQRCodeButton,
	AddressTitle,
	AddressTitleMobile,
	Address,
	AddressMobile,
	CopyAddressButton,
} from "./WalletInfo";
import WalletsList from "./../../../components/IntroModal/WalletsList";

const WrapperMobile = styled(Wrapper)`
	padding: 19px;
`;

const NextStepArrow = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	height: 24px;

	&::before {
		content: "";
		width: 50%;
		height: 1px;
		background: #c4c4c4;
	}
	&::after {
		content: "";
		width: 50%;
		height: 1px;
		background: #c4c4c4;
	}
`;

const ContentMobile = styled(Content)`
	flex-direction: column;
`;

const NextStepIcon = styled.img`
	width: 24px;
	margin: ${(props) => props.theme.spacing(0.7)};
`;

const MetaMaskContainer = styled.div`
	min-height: 250px;
	width: 100%;
`;

const WalletDepositMobile = ({ address }) => {
	return (
		<WrapperMobile>
			<ContentMobile>
				<MobileColumn fixed>
					<Title>Choose the wallet you want to connect with</Title>
					<WalletsList />
				</MobileColumn>
				<NextStepArrow>
					<NextStepIcon src={nextStepIcon} />
				</NextStepArrow>
				<MobileColumn>
					<MobileColumn center>
						<QRCodeMobile>
							<QRCodeImage src={qrCodeImage} />
						</QRCodeMobile>
						<SaveQRCodeButton variant="secondary">
							save QR code
						</SaveQRCodeButton>
					</MobileColumn>
					<MobileColumn center>
						<AddressTitleMobile>BBit deposit address</AddressTitleMobile>
						<AddressMobile>{address}</AddressMobile>
						<CopyableText textToCopy={address}>
							<CopyAddressButton variant="secondary">
								Copy address
							</CopyAddressButton>
						</CopyableText>
					</MobileColumn>
				</MobileColumn>
			</ContentMobile>
			<Note title={"Important"}>
				dummy text of the printing and typesetting industry. Lorem Ipsum has
				been the industry's standard dummy text ever since the 1500s, when an
				unknown printer took a galley of type and scrambled it to make a type
				specimen book. It has survived not only five centuries, but also the
				leap into electronic typesetting, remaining essentially unchanged. It
				was popularised in the 1960s with the release of Letraset sheets
				containing Lorem Ipsum passages, and more recently with desktop
				publishing software like Aldus PageMaker including versions of Lorem
				Ipsum.
			</Note>
		</WrapperMobile>
	);
};

export default WalletDepositMobile;
