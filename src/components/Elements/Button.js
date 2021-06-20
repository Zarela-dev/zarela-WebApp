import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

function getColor(props) {
	if (props.variant === 'primary') {
		return css`
			background: transparent;
			color: #252222;
		`;
	}
	if (props.variant === 'secondary') {
		return css`
			background: white;
			color: #7246D0;
		`;
	}
}

const Container = styled.div`
	background: linear-gradient(256.48deg ,rgb(72 194 185 / 50%),rgb(138 100 212 / 50%));
	box-shadow: 0px 5.46667px 18px rgba(223, 236, 255, 0.5);
	border-radius: 5.5px;
	text-align: center;
	height: 50px;
	margin-right: ${props => props.theme.spacing(3)};
	max-width: 190px;
	cursor: pointer;
`;

const TheButton = styled.button`
	${(props) => getColor(props)};

	padding: ${props => props.theme.spacing(1.5)} ${props => props.theme.spacing(3)};
    text-decoration: none;
	font-weight: 500;
	font-size: 20px;
	border: none;
	width: calc(100% - 2px);
    height: calc(100% - 2px);
    position: relative;
    top: 1px;
    border-radius: 5.5px;
	line-height: 1;
`;

const TheLinkButton = styled(Link)`
	display: block;
	${(props) => getColor(props)};

	padding: ${props => props.theme.spacing(1.5)} ${props => props.theme.spacing(3)};
    text-decoration: none;
	font-weight: 500;
	font-size: 20px;
	border: none;
	width: calc(100% - 2px);
    height: calc(100% - 2px);
    position: relative;
    top: 1px;
	left: 1px;
    border-radius: 5.5px;
	line-height: 1;
`;


const GenericButton = ({ children, variant, type, ...rest }) => (
	<Container variant={variant} {...rest}>
		<TheButton variant={variant} type={type}>
			{children}
		</TheButton>
	</Container>
);

export const GenericLinkButton = ({ children, variant, to, type, ...rest }) => (
	<Container variant={variant} {...rest}>
		<TheLinkButton variant={variant} type={type} to={to}>
			{children}
		</TheLinkButton>
	</Container>
);

export default GenericButton;

export const Button = css`
	background: linear-gradient(256.48deg, #A2F0EA -37.74%, #75F0E7 -37.73%, #A981FE 103.72%);
	box-shadow: 0px 4px 18px #DFECFF;
	border-radius: 4px;
	text-align: center;
	font-weight: 500;
	font-size: 20px;
	border: none;
	height: 50px;
	padding: ${props => props.theme.spacing(1.5)} ${props => props.theme.spacing(3)};
    text-decoration: none;
	color: ${props => props.theme.textPrimary};
	margin-right: ${props => props.theme.spacing(3)};
`;