import React from 'react';
import styled from 'styled-components';
import noMetamaskBackdrop from '../assets/no-meta-backdrop.png';
import { LinkButton } from './Elements/Button';
import zarelaLogo from '../assets/icons/logo.png';
import metamaskLogo from '../assets/icons/metamask.png';
import { Spacer } from './Elements/Spacer';

const Container = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: ${(props) => props.theme.spacing(7)} ${(props) => props.theme.spacing(10)};
	z-index: ${(props) => props.theme.z_modal};

	&::before {
		content: '';
		background-image: url(${noMetamaskBackdrop});
		background-repeat: no-repeat;
		background-size: cover;
		opacity: 0.5;
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
	border-radius: 60px 60px 10px 60px;
	padding: ${(props) => props.theme.spacing(8)} ${(props) => props.theme.spacing(10)};
	overflow: hidden;
`;

const Header = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: ${(props) => props.theme.spacing(6)};
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Title = styled.div`
	font-weight: bold;
	font-size: 48px;
	line-height: 20px;
	text-align: center;
	color: #581d9f;
	margin-bottom: ${(props) => props.theme.spacing(3)};
	white-space: nowrap;
`;

const Subtitle = styled.div`
	font-weight: 500;
	font-size: 24px;
	line-height: 20px;
	text-align: center;
	white-space: nowrap;
	color: #581d9f;
`;

const Logo = styled.img`
	width: 320px;
	margin-right: ${(props) => props.theme.spacing(3)};
`;

const MetamaskContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const MetamaskIcon = styled.img`
	width: 320px;
`;

const DownloadMetamaskButton = styled(LinkButton)`
	height: 50px;
`;

const Link = styled.a`
	text-decoration: ${(props) => (props.inline ? 'underline' : 'none')};
	display: ${(props) => (props.inline ? 'inline' : 'block')};
	font-weight: bold;
	font-size: 24px;
	line-height: 36px;
	color: #581d9f;
`;

const Divider = styled.div`
	width: 100%;
	height: 2px;
	background: #3a68de;
	border-radius: 26.1352px;
	margin: ${(props) => props.theme.spacing(4)} 0;
`;

const Message = styled.div`
	font-weight: bold;
	font-size: 24px;
	line-height: 36px;
	color: #581d9f;
	word-break: break-word;
`;

const LetsGoButton = styled(LinkButton)`
	min-width: 150px;
`;

const Footer = styled.div`
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
`;

const NoMetamaskMessage = () => {
	return (
		<Container>
			<Modal>
				<Header>
					<Column>
						<Logo src={zarelaLogo} />
					</Column>
					<Spacer />
					<Column>
						<Title>Welcome to Zarela ! :)</Title>
						<Subtitle>To continue please sync your digital wallet</Subtitle>
					</Column>
				</Header>
				<MetamaskContainer>
					<MetamaskIcon src={metamaskLogo} />
					<DownloadMetamaskButton variant={'primary'} href={'https://metamask.io/download'} target="_blank">
						Download
					</DownloadMetamaskButton>
				</MetamaskContainer>
				<Link>Learn how to work with Zarela</Link>
				<Link>Social list</Link>
				<Divider />
				<Footer>
					<Message>
						Just looking around? Continue to{' '}
						<Link inline href="https://zarela.io" target="_blank">
							{' '}
							Zarela.io
						</Link>{' '}
						to get more familiar with us :)
					</Message>
					<LetsGoButton variant={'secondary'} href="https://zarela.io" target="_blank">
						Let's Go
					</LetsGoButton>
				</Footer>
			</Modal>
		</Container>
	);
};

export default NoMetamaskMessage;
