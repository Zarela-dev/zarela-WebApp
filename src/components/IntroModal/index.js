import React from 'react';
import styled from 'styled-components';
import noMetamaskBackdrop from '../../assets/no-meta-backdrop.png';
import LogoImage from '../../assets/icons/logo.png';
import { LinkButton } from '../Elements/Button';
import twitterIcon from '../../assets/icons/social/twitter.svg';
import instagramIcon from '../../assets/icons/social/instagram.svg';
import linkedinIcon from '../../assets/icons/social/linkedin.svg';
import { Spacer } from '../Elements/Spacer';
import metamaskIcon from '../../assets/icons/wallets/metamask.svg';
import walletConnectIcon from '../../assets/icons/wallets/walletConnect.svg';
import coinbaseIcon from '../../assets/icons/wallets/coinbase.svg';
import portisIcon from '../../assets/icons/wallets/portis.svg';
import fortmaticIcon from '../../assets/icons/wallets/fortmatic.svg';

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: ${(props) => props.theme.spacing(1.5)};
	z-index: 9999;
	
	@media only screen and (min-width: ${({ theme }) => theme.tablet_sm_breakpoint}) {
		padding: ${(props) => props.theme.spacing(6)};
	}
	
	&::before {
		position: fixed;
		content: '';
		background-image: url(${noMetamaskBackdrop});
		background-repeat: no-repeat;
		background-size: cover;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: -1;
	}
`;

const Modal = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 100%;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0px 14.6965px 26.4537px rgba(81, 197, 234, 0.06);
	border-radius: 30px 30px 10px 30px;
	padding: ${(props) => props.theme.spacing(1.5)};
	overflow: auto;

	margin-bottom: ${(props) => props.theme.spacing(1.5)};
	
	@media only screen and (min-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		margin-bottom: ${(props) => props.theme.spacing(6)};
		padding: ${(props) => props.theme.spacing(4)} 10%;
	}
`;

const Header = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media only screen and (min-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		padding-top: 70px;
	}
`;

const Logo = styled.img`
	width: 120px;
	margin-bottom: ${(props) => props.theme.spacing(2)};

	@media only screen and (min-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		position: absolute;
		left: 40px;
		top: 30px;
	}
`;

const Title = styled.h1`
	font-weight: bold;
	font-size: 20px;
	text-align: center;
	color: ${(props) => props.theme.textPrimary};

	@media only screen and (min-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		font-weight: bold;
		font-size: 64px;
		line-height: 20px;
	}
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
	width: 100%;
	margin-top: ${(props) => props.theme.spacing(1)};

	@media only screen and (min-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		margin-top: ${(props) => props.theme.spacing(4)};
		justify-content: space-around;
	}
`;

const WalletItem = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(2)};
	opacity: ${(props) => (props.active ? 1 : 0.5)};
	cursor: ${(props) => (props.active ? 'pointer' : 'not-allowed')};
`;

const WalletIcon = styled.img`
	width: 45px;
	margin-bottom: ${(props) => props.theme.spacing(1)};

	@media only screen and (min-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		width: 75px;
	}
`;

const WalletTitle = styled.p`
	font-style: normal;
	font-weight: 600;
	font-size: 18px;
	line-height: 20px;
	color: ${(props) => props.theme.textPrimary};
	white-space: nowrap;
	margin-top: ${(props) => props.theme.spacing(2)};
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
	margin-top: ${(props) => props.theme.spacing(2)};
	margin-right: 0;
	min-width: 127px;
`;

const Footer = styled.footer`
	display: flex;
	justify-content: center;
	margin-top: ${(props) => props.theme.spacing(4)};
`;

const SocialList = styled.div`
	display: flex;
	flex-wrap: nowrap;
`;

const SocialLink = styled.a`
	flex: 1;
	padding: 0 ${(props) => props.theme.spacing(2)};

	&:focus {
		outline: none;
	}
`;

const SocialIcon = styled.img`
	width: 18px;
`;

const wallets = [
	{
		name: 'Metamask',
		icon: metamaskIcon,
		active: true
	},
	{
		name: 'Fortmatic',
		icon: fortmaticIcon,
		active: false
	},
	{
		name: 'Portis',
		icon: portisIcon,
		active: false
	},
	{
		name: 'Coinbase',
		icon: coinbaseIcon,
		active: false
	},
	{
		name: 'WalletConnect',
		icon: walletConnectIcon,
		active: false
	},
];

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
						{wallets.map(({ name, icon, active }) => (
							<WalletItem active={active}>
								<WalletIcon src={icon} />
								<WalletTitle>{name}</WalletTitle>
							</WalletItem>
						))}
					</WalletsList>
					<Divider />
					<MessageContainer>
						<Message>you don't know ...</Message>
						<LearnMoreButton>learn more</LearnMoreButton>
					</MessageContainer>
				</Content>
				<Spacer />
				<Footer>
					<SocialList>
						<SocialLink
							href="https://www.instagram.com/zarela.io/?hl=en"
							target="_blank"
						>
							<SocialIcon src={instagramIcon} />
						</SocialLink>
						<SocialLink href="https://twitter.com/zarela_io" target="_blank">
							<SocialIcon src={twitterIcon} />
						</SocialLink>
						<SocialLink href="https://twitter.com/zarela_io" target="_blank">
							<SocialIcon src={linkedinIcon} />
						</SocialLink>
					</SocialList>
				</Footer>
			</Modal>
		</Container>
	);
};

export default IntroModal;
