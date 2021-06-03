import {css} from 'styled-components';

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