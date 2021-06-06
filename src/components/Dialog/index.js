import React from 'react';
import styled, { css } from 'styled-components';

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
	font-weight: bold;
	font-size: 18px;
	line-height: 20px;
	text-align: center;
	color: #4FCFA1;
	max-width: 215px;

	margin: 0 auto ${props => props.theme.spacing(3)};
`;

const Body = styled.header`
	font-weight: bold;
	font-size: 18px;
	line-height: 20px;
	text-align: center;
	color: #4FCFA1;
`;

const Footer = styled.header`
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

const Dialog = ({ title, content, actions, type }) => {
	return (
		<Backdrop>
			<Card type='error'>
				<Header>
					{title}
				</Header>
				<Body>
					{content}
				</Body>
				<Footer>
					{actions}
				</Footer>
			</Card>
		</Backdrop>
	);
};

export default Dialog;
