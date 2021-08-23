import React from 'react';
import Note from '../../../components/Note';
import styled from 'styled-components';
import nextStepIcon from '../../../assets/icons/next-step-arrow-down.svg';
import { CopyableText } from '../../../utils';
import { Wrapper, Content, MobileColumn } from './Layout';
import { Title } from './AccountChoices';
import { AddressTitleMobile, AddressMobile, CopyAddressButton } from './WalletInfo';
import WalletsList from '../../../components/IntroModal/WalletsList';

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
		content: '';
		width: 50%;
		height: 1px;
		background: #c4c4c4;
	}
	&::after {
		content: '';
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

const WalletAccountMobile = ({ address }) => {
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
						<AddressTitleMobile>BBit account address</AddressTitleMobile>
						<AddressMobile>{address}</AddressMobile>
						<CopyableText textToCopy={address}>
							<CopyAddressButton variant="secondary">Copy address</CopyAddressButton>
						</CopyableText>
					</MobileColumn>
				</MobileColumn>
			</ContentMobile>
			<Note title={'Advice'}>
				By copying your account address and sending it to others, you can easily have financial transactions,
				including Biobit, Ethereum, etc. Also, You must never give your private keys to anyone.
			</Note>
		</WrapperMobile>
	);
};

export default WalletAccountMobile;
