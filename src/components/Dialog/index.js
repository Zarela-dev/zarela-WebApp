import React from 'react';
import styled, { css } from 'styled-components';
import closeIcon from '../../assets/icons/close-black.svg';
import Spinner from '../Spinner';

const getBorder = (type) => {
	if (type === 'success')
		return css`
			border: 1.5px solid #2eeca8;
		`;
	if (type === 'warning')
		return css`
			border: 1.5px solid #FEC600;
		`;
	if (type === 'error')
		return css`
			border: 1.5px solid #F72D76;
		`;
	if (type === 'info')
		return css`
			border: 1.5px solid transparent;
		`;
};

const Header = styled.header`
	display: flex;
	justify-content: space-between;

	max-width: 215px;

	margin: 0 auto ${props => props.theme.spacing(3)};
`;

const Body = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Footer = styled.footer`
	font-weight: bold;
	font-size: 18px;
	line-height: 20px;
	text-align: center;
	color: #4FCFA1;
`;

const Backdrop = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(255, 255, 255, 0.6);
	z-index: 999;
`;

const Card = styled.div`
	background: #fff;
	${props => getBorder(props.type)};
	box-sizing: border-box;
	box-shadow: 0px 10px 18px rgba(81, 197, 234, 0.06);
	border-radius: 8px;
	padding: ${props => props.theme.spacing(3)};
`;

const TitleWrapper = styled.div`
	font-weight: bold;
	font-size: 18px;
	line-height: 20px;
	text-align: center;
	color: #4FCFA1;
`;

const CloseIconWrapper = styled.div`

`;
const CloseIcon = styled.img`
  
`;

const SpinnerContainer = styled.div`
  
`;

const Content = styled.div`
	font-weight: bold;
	font-size: 18px;
	line-height: 20px;
	text-align: center;
	color: #4FCFA1;
`;

const Dialog = ({ isOpen, hasSpinner, title, content, actions, type = 'error', onClose }) => {
	if (!isOpen)
		return null;
	return (
		<Backdrop>
			<Card type={type}>
				<Header>
					<TitleWrapper>
						{title}
					</TitleWrapper>
					{
						typeof onClose === 'function' ?
							<CloseIconWrapper>
								<CloseIcon src={closeIcon} onClick={onClose} />
							</CloseIconWrapper> : null
					}
				</Header>
				<Body>
					<SpinnerContainer>
						{hasSpinner ? <Spinner /> : null}
					</SpinnerContainer>
					<Content>
						{content}
					</Content>
				</Body>
				<Footer>
					{actions}
				</Footer>
			</Card>
		</Backdrop>
	);
};

export default Dialog;
