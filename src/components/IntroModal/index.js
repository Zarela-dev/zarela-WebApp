import React from 'react';
import styled from 'styled-components';
import noMetamaskBackdrop from '../../assets/no-meta-backdrop.png';
import LogoImage from '../../assets/icons/logo.png';
import { LinkButton } from '../Elements/Button';
import metamaskIcon from '../../assets/icons/wallets/metamask.svg';

const Container = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: ${(props) => props.theme.spacing(1.5)};
	z-index: 9999;

	&::before {
		content: '';
		background-image: url(${noMetamaskBackdrop});
		background-repeat: no-repeat;
		background-size: cover;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		position: absolute;
		z-index: -1;
	}
`;

const Modal = styled.div`
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0px 14.6965px 26.4537px rgba(81, 197, 234, 0.06);
	border-radius: 30px 30px 10px 30px;
	padding: ${(props) => props.theme.spacing(1.5)};
	overflow: hidden;
`;

const Header = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Logo = styled.img`
	width: 120px;
	margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const Title = styled.h1`
	font-weight: bold;
	font-size: 20px;
	text-align: center;
	color: ${(props) => props.theme.textPrimary};
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: ${(props) => props.theme.spacing(4)};
`;

const Message = styled.p`
	font-weight: 500;
	font-size: 13px;
	line-height: 18px;
	text-align: center;
`;

const WalletsList = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

const WalletItem = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: ${(props) => props.theme.spacing(2)};
`;

const WalletIcon = styled.img`
	width: 45px;
	margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const WalletTitle = styled.p`
	font-style: normal;
	font-weight: 600;
	font-size: 8.56056px;
	line-height: 10px;
	color: ${(props) => props.theme.textPrimary};
`;

const Divider = styled.div`
	width: 100%;
	height: 1px;
	background: rgba(58, 104, 222, 0.5);
	margin: ${(props) => props.theme.spacing(3)} 0;
`;

const SectionTitle = styled.h3`
	font-weight: bold;
	font-size: 16px;
	line-height: 19px;
	color: ${(props) => props.theme.textPrimary};
`;

const MessageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const LearnMoreButton = styled(LinkButton).attrs((props) => {
	return {
		variant: 'secondary',
	};
})`
	margin-top: ${props => props.theme.spacing(2)};
	margin-right: 0;
	min-width: 127px;
`;

const Footer = styled.footer`
	display: flex;
	justify-content: center;
`;

const SocialList = styled.div`
	display: flex;
	flex-wrap: nowrap;
`;

const SocialLink = styled.a`
	flex: 1;
`;

const SocialIcon = styled.img`
	width: 35px;
`;

const IntroModal = () => {
	return (
		<Container>
			<Modal>
				<Header>
					<Logo src={LogoImage} />
					<Title>Welcome to Zarela ! :)</Title>
				</Header>
				<Content>
					<Message>
						To continue please sync your digital wallet or download one of these trusted
						wallets.
					</Message>
					<WalletsList>
						{Array(5)
							.fill(null)
							.map(() => (
								<WalletItem>
									<WalletIcon src={metamaskIcon} />
									<WalletTitle>wallet name</WalletTitle>
								</WalletItem>
							))}
					</WalletsList>
					<Divider />
					<MessageContainer>
						<Message>you don't know ...</Message>
						<LearnMoreButton>learn more</LearnMoreButton>
					</MessageContainer>
				</Content>
				<Footer>
					<SocialList>
						<SocialLink>
							<SocialIcon />
						</SocialLink>
					</SocialList>
				</Footer>
			</Modal>
		</Container>
	);
};

export default IntroModal;
