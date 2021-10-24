import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { space, layout, color, compose } from 'styled-system';
import { variant } from 'styled-system';
import { Button as RebassButton, Box } from 'rebass/styled-components';

function getBackground(props) {
	if (props.disabled)
		return css`
			background: transparent;
		`;
	if (props.variant === 'primary')
		return css`
			background: linear-gradient(256.48deg, #a2f0ea -37.74%, #75f0e7 -37.73%, #a981fe 103.72%);
		`;
	if (props.variant === 'secondary')
		return css`
			background: linear-gradient(256.48deg, rgb(72 194 185 / 50%), rgb(138 100 212 / 50%));
		`;
}
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
			color: #7246d0;
		`;
	}
}

function getDisabledStyles() {
	return css`
		background: #d4d4d4;
		cursor: not-allowed !important;
	`;
}

const Container = styled.div`
	${(props) => getBackground(props)};
	box-shadow: 0px 5.46667px 18px rgba(223, 236, 255, 0.5);
	border-radius: 5px;
	text-align: center;
	height: 50px;
	margin-right: ${(props) => props.theme.spacing(3)};
	max-width: 190px;
	cursor: pointer;
`;

const TheButton = styled.button`
	${(props) => getColor(props)};
	${(props) => props.disabled && getDisabledStyles()};
	padding: ${(props) => (props.fontSize ? props.theme.spacing(0.9) : props.theme.spacing(1.5))}
		${(props) => props.theme.spacing(3)};
	text-decoration: none;
	font-weight: 500;
	font-size: ${(props) => props.fontSize ?? '20px'};
	border: none;
	width: calc(100% - 2px);
	height: calc(100% - 2px);
	position: relative;
	top: 1px;
	border-radius: 5px;
	line-height: 1;
`;

const LinkButtonAnchor = styled.a`
	${(props) => getColor(props)};
	display: block;
	padding: ${(props) => props.theme.spacing(1.5)} ${(props) => props.theme.spacing(3)};
	text-decoration: none;
	font-weight: 500;
	font-size: 20px;
	white-space: nowrap;
	border: none;
	width: calc(100% - 2px);
	height: calc(100% - 2px);
	position: relative;
	top: 1px;
	left: 1px;
	border-radius: 5px;
	line-height: 1;
`;

const TheLinkButton = styled(Link)`
	${(props) => getColor(props)};
	display: block;
	padding: ${(props) => props.theme.spacing(1.5)} ${(props) => props.theme.spacing(3)};
	text-decoration: none;
	font-weight: 500;
	font-size: 20px;
	border: none;
	width: calc(100% - 2px);
	height: calc(100% - 2px);
	position: relative;
	top: 1px;
	left: 1px;
	border-radius: 5px;
	line-height: 1;
`;

const GenericButton = ({ children, variant, type, disabled, fontSize, ...rest }) => (
	<Container disabled={disabled} variant={variant} {...rest}>
		<TheButton variant={variant} type={type} disabled={disabled} fontSize={fontSize}>
			{children}
		</TheButton>
	</Container>
);

export const LinkButton = ({ children, variant, href, target, ...rest }) => (
	<Container variant={variant} {...rest}>
		<LinkButtonAnchor variant={variant} target={target} href={href}>
			{children}
		</LinkButtonAnchor>
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

const ButtonWrapper = styled(Box)(
	compose(space, layout, color),
	{
		borderRadius: '4px',
		height: 'fit-content',
		'& *': {
			textDecoration: 'none',
		},
	},
	variant({
		prop: 'variant',
		variants: {
			primary: {
				background: 'unset',
			},
			secondary: {
				background: 'linear-gradient(180deg, #85CEEE 10.5%, #A687FD 86.82%)',
				padding: '2px',
				'&:hover': {
					background: 'linear-gradient(180deg, #4787F3 0%, #7246D0 100%)',
				},
				'&:active': {
					background: '#F6F5FF',
					boxShadow: '0px 6px 20px 0px #51C5EA26',
				},
			},
			disabled: {
				background: '#F4F3FE',
			},
		},
	})
);

const CustomizedButton = styled(RebassButton)(
	compose(space, layout, color),
	{
		borderRadius: '2.5px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontWeight: 'normal',
	},
	variant({
		prop: 'size',
		variants: {
			extraLarge: {
				width: '190px',
				height: '64px',
				fontSize: [4],
				fontWeight: 'normal !important',
				lineHeight: [6],
			},
			large: {
				width: '190px',
				height: '50px',
				fontSize: [4],
				lineHeight: [6],
			},
			normal: {
				width: '150px',
				height: '40px',
				fontSize: [4],
				lineHeight: [6],
			},
			medium: {
				width: '125px',
				height: '34px',
				fontSize: [6],
				lineHeight: [10],
			},
			small: {
				maxWidth: '101px',
				maxHeight: '32px',
				minWidth: '77px',
				fontSize: [7],
				lineHeight: [14],
			},
			extraSmall: {
				maxWidth: '78px',
				maxHeight: '24px',
				fontSize: [8],
				lineHeight: [14],
			},
		},
	}),
	variant({
		prop: 'variant',
		variants: {
			primary: {
				background: 'linear-gradient(180deg, #85CEEE 10.5%, #A687FD 86.82%)',
				color: 'textPrimary',
				'&:hover': {
					background: 'linear-gradient(224.79deg, #CCEDFC 16.25%, #DFD3FF 84.5%)',
				},
				'&:active': {
					background: 'linear-gradient(227.41deg, #52A1CE 10.18%, #6051C0 93.32%)',
				},
				'&:disabled': {
					background: '#F4F3FE',
					color: '#C5C0DB',
				},
			},
			secondary: {
				background: '#fff',
				color: 'primary',
				'&:hover': {
					backgroundColor: 'btnSecondaryHover',
				},
				'&:active': {
					background: '#F6F5FF',
				},
				'&:disabled': {
					background: '#F4F3FE',
					color: '#C5C0DB',
				},
			},
		},
	})
);

export const ThemeButton = (props) => {
	return (
		<ButtonWrapper variant={props.disabled ? 'disabled' : props.variant}>
			{props.to ? (
				<Link to={{ pathname: props.to }} target={props.target}>
					<CustomizedButton p={1} variant={props.variant} {...{ ...props, to: undefined, target: undefined }}></CustomizedButton>
				</Link>
			) : (
				<CustomizedButton p={1} variant={props.variant} onClick={props.onClick} {...props}></CustomizedButton>
			)}
		</ButtonWrapper>
	);
};

export const Button = css`
	background: linear-gradient(256.48deg, #a2f0ea -37.74%, #75f0e7 -37.73%, #a981fe 103.72%);
	box-shadow: 0px 4px 18px #dfecff;
	border-radius: 4px;
	text-align: center;
	font-weight: 500;
	font-size: 20px;
	border: none;
	height: 50px;
	padding: ${(props) => props.theme.spacing(1.5)} ${(props) => props.theme.spacing(3)};
	text-decoration: none;
	color: ${(props) => props.theme.textPrimary};
	margin-right: ${(props) => props.theme.spacing(3)};
`;
