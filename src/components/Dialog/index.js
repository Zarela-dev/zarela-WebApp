import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import closeIcon from '../../assets/icons/close-black.svg';
import Spinner from '../Spinner';
import { Spacer } from '../Elements/Spacer';

const getBorder = (type) => {
	if (type === 'success')
		return css`
			border: 1.5px solid #2eeca8;
		`;
	if (type === 'warning')
		return css`
			border: 1.5px solid #fec600;
		`;
	if (type === 'error')
		return css`
			border: 1.5px solid #f72d76;
		`;
	if (type === 'info')
		return css`
			border: 1.5px solid transparent;
		`;
};

const Header = styled.header`
	display: flex;
	position: relative;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	margin: 0 auto ${(props) => props.theme.spacing(3)};
`;

const Body = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Content = styled.div`
	font-weight: bold;
	font-size: 18px;
	line-height: 20px;
	text-align: center;
	color: #4fcfa1;
	width: 100%;

	@media only screen and (min-width: ${({ theme }) => theme.desktop_sm_breakpoint}) {
		width: 70%;
	}
`;

const Footer = styled.footer`
	font-weight: bold;
	font-size: 18px;
	line-height: 20px;
	text-align: center;
	color: #4fcfa1;
`;

const Backdrop = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	left: 0;
	width: 100vw;
	top: 0;
	height: 100vh;
	background: rgba(255, 255, 255, 0.6);
	z-index: ${(props) => props.theme.z_modal};

	@media only screen and (min-width: ${({ theme }) => theme.desktop_sm_breakpoint}) {
		top: 110px;
		height: calc(100vh - 110px);
	}
`;

const Card = styled.div`
	background: #fff;
	${(props) => getBorder(props.type)};
	box-sizing: border-box;
	box-shadow: 0px 10px 18px rgba(81, 197, 234, 0.06);
	border-radius: 8px;
	padding: ${(props) => props.theme.spacing(2.1)};
	width: calc(100% - 36px);

	@media only screen and (min-width: ${({ theme }) => theme.desktop_sm_breakpoint}) {
		width: 680px;
	}
`;

const TitleWrapper = styled.div`
	font-weight: bold;
	font-size: 18px;
	line-height: 20px;
	text-align: center;
	color: #4fcfa1;
`;

const CloseIconWrapper = styled.div`
	position: absolute;
	right: 0;
	top: -7px;
	cursor: pointer;
`;

const CloseIcon = styled.img``;

const SpinnerContainer = styled.div``;

const Dialog = ({ isOpen, hasSpinner, title, content, actions, type = 'error', onClose }) => {
	useEffect(() => {
		if (isOpen) {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	if (!isOpen) return null;
	return (
		<Backdrop>
			<Card type={type}>
				<Header>
					<Spacer />
					<TitleWrapper>{title}</TitleWrapper>
					<Spacer />
					{typeof onClose === 'function' ? (
						<CloseIconWrapper>
							<CloseIcon src={closeIcon} onClick={onClose} />
						</CloseIconWrapper>
					) : null}
				</Header>
				<Body>
					<SpinnerContainer>{hasSpinner ? <Spinner /> : null}</SpinnerContainer>
					<Content>{content}</Content>
				</Body>
				<Footer>{actions}</Footer>
			</Card>
		</Backdrop>
	);
};

export default Dialog;
