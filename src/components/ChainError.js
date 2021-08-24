import React from 'react';
import styled from 'styled-components';
import noMetamaskBackdrop from '../assets/no-meta-backdrop.png';
import LogoImage from '../assets/icons/logo.png';

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: ${(props) => props.theme.spacing(1.5)};
	z-index: ${(props) => props.theme.z_modal};

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
	font-size: 0px;
	text-align: center;
	color: ${(props) => props.theme.textPrimary};

	@media only screen and (min-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		font-weight: bold;
		font-size: 50px;
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
	font-size: 18px;
	line-height: 18px;
	text-align: center;
`;

const ChainErrorDialog = () => {
	return (
		<Container>
			<Modal>
				<Header>
					<Logo src={LogoImage} />
					<Title>Welcome to Zarela ! :)</Title>
				</Header>
				<Content>
					<Message>Zarela is currently on test network, switch your wallet network to Ropsten.</Message>
				</Content>
			</Modal>
		</Container>
	);
};

export default ChainErrorDialog;
