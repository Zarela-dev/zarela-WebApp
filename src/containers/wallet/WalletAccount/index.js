import React from 'react';
import Note from './../../../components/Note';
import styled from 'styled-components';
import nextStepIcon from './../../../assets/icons/next-step-arrow.svg';
import { CopyableText } from './../../../utils';
import { Content, Row, Column } from './Layout';
import WalletsList from '../../../components/IntroModal/WalletsList';
import { Header, BodyText } from './../../../components/Elements/Typography';
import { ThemeButton } from './../../../components/Elements/Button';

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
		<Row>
			<Content>
				<Column fixed>
					<WalletsList view='list' />
				</Column>
				<NextStepArrow>
					<NextStepIcon src={nextStepIcon} />
				</NextStepArrow>
				<Column>
					<Row>
						<Column center>
							<Header variant='heading5' as='h5' fontWeight='semiBold'>
								BBit account address
							</Header>
							<BodyText variant='small' mb={5}>
								{address}
							</BodyText>
							<CopyableText textToCopy={address}>
								<ThemeButton variant='secondary' size='normal'>
									Copy address
								</ThemeButton>
							</CopyableText>
						</Column>
					</Row>
					<Row>
						<Notice title={'Advice'}>
							By copying your account address and sending it to others, you can
							easily have financial transactions, including Biobit, Ethereum,
							etc. Also, You must never give your private keys to anyone.
						</Notice>
					</Row>
				</Column>
			</Content>
		</Row>
	);
};

export default WalletAccount;
