import React, { useMemo, useEffect } from 'react';
import { Text, TextProps as TextPropsOriginal, Button } from 'rebass';
import styled, {
	css,
	ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components/macro';

const fontSize = () => {
	let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);

	if (!isMobile) {
		return {
			textH1: '56px',
			textH2: '48px',
			textH3: '32px',
			textH4: '24px',
			textH5: '18px',
			textBody1: '18px',
			textBody2: '16px',
			textTag: '14px',
			textHint: '12px',
		};
	} else if (isMobile) {
		return {
			textH1: '24px',
			textH2: '20px',
			textH3: '18px',
			textH4: '16px',
			textH5: '14px',
			textBody1: '16px',
			textBody2: '14px',
			textTag: '12px',
			textHint: '10px',
		};
	}
};

const lineHeight = () => {
	let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);

	if (!isMobile) {
		return {
			lineHeightH1: '61.6px',
			lineHeightH2: '57.6px',
			lineHeightH3: '38.4px',
			lineHeightH4: '28.8px',
			lineHeightH5: '21.6px',
			lineHeightBody1: '25.2px',
			lineHeightBody2: '22.4px',
			lineHeightTimeStamp: '16px',
			lineHeightTag: '16.8px',
			lineHeightHint: '12px',
			lineHeightDay: '3.9',
		};
	} else if (isMobile) {
		return {
			lineHeightH1: '28.8px',
			lineHeightH2: '24px',
			lineHeightH3: '21.6px',
			lineHeightH4: '19.2px',
			lineHeightH5: '16.8px',
			lineHeightBody1: '20.8px',
			lineHeightBody2: '18.2px',
			lineHeightTimeStamp: '16px',
			lineHeightTag: '19px',
			lineHeightHint: '10px',
			lineHeightDay: '3',
		};
	}
};

const colors = (darkMode) => {
	return {
		// text
		textPrimaryColor: darkMode ? '#212121' : '#212121',
		textTimeStampColor: darkMode ? '#858585' : '#858585',
		textTokenColor: darkMode ? '#3a68de' : '#3a68de',
		textTagColor: darkMode ? '#A0AAC3' : '#A0AAC3',
		textLabelColor: darkMode ? '#000' : '#fff',

		//buttons
		btnPrimary: darkMode
			? 'linear-gradient(226.69deg, #85CEEE 10.5%, #A687FD 86.82%)'
			: 'linear-gradient(226.69deg, #85CEEE 10.5%, #A687FD 86.82%)',
		btnPrimaryHover: darkMode
			? 'linear-gradient(224.79deg, #CCEDFC 16.25%, #DFD3FF 84.5%)'
			: 'linear-gradient(224.79deg, #CCEDFC 16.25%, #DFD3FF 84.5%)',
		btnPrimaryClick: darkMode
			? 'linear-gradient(227.41deg, #52A1CE 10.18%, #6051C0 93.32%)'
			: 'linear-gradient(227.41deg, #52A1CE 10.18%, #6051C0 93.32%)',
		btnPrimaryDisabled: darkMode ? '#F4F3FE' : '#F4F3FE',
		btnSecondary: darkMode ? '#fff' : '#fff',
		btnSecondaryHover: darkMode ? '#F6F5FF' : '#F6F5FF',
		btnSecondaryClick: darkMode ? '#F6F5FF' : '#F6F5FF',
		btnSecondaryDisabled: darkMode ? '##F4F3FE' : '#F4F3FE',
		btnTertiary: darkMode ? '#E5E5E5' : '#E5E5E5',
		btnTertiaryHover: darkMode ? '#F6F5FF' : '#F6F5FF',
		btnTertiaryClick: darkMode ? '#E2E1FF' : '#E2E1FF',
		btnTertiaryDisabled: darkMode ? '#F4F3FE' : '#F4F3FE',

		// colors
		primary: '#7246D0',
		primaryFaded: '#7246d029',
		secondary: 'rgba(126, 162, 253, 0.4)',
		success: '#3ADEA3',
		navLinkColor: '#8B72DE',
		navLinkDisabled: '#E3DDFA',
		notificationColor: '#2EECA8',
		textSecondary: '#6DA5BF',
		error: 'red',
	};
};

const fontWeights = () => {
	return {
		bold: 700,
		semiBold: 500,
		regular: 400,
		light: 300,
	};
};

const theme = (darkMode) => {
	return {
		...colors(darkMode),
		...fontSize(),
		...lineHeight(),
		...fontWeights(),
		isMobile: () => {
			return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			);
		},

		grids: {
			sm: 8,
			md: 12,
			lg: 24,
		},

		maxWidth: '1255px',

		// spacing
		spacing: (val) => {
			const BASE = 10;
			return BASE * val + 'px';
		},
		// typography
		title: '28px',
		body: '14px',
		bod2: '16px',
		badge: '12px',
		// breakpoints
		desktop_md_breakpoint: '1440px',
		desktop_sm_breakpoint: '1170px',
		tablet_sm_breakpoint: '768px',
		mobile_sm_breakpoint: '450px',
		mobile_xs_breakpoint: '320px',
		// elevation levels
		z_mobileSlideMenu: 70,
		z_header: 60,
		z_bottomNav: 50,
		z_modal: 55,
		z_tooltip: 20,
		z_spinner: 30,

		//shadows
		shadow1: darkMode ? '#000' : '#2F80ED',

		// css snippets
		flexColumnNoWrap: css`
			display: flex;
			flex-flow: column nowrap;
		`,
		flexRowNoWrap: css`
			display: flex;
			flex-flow: row nowrap;
		`,
	};
};

export default function ({ children }) {
	const darkMode = false;

	const themeObject = useMemo(() => theme(darkMode), [darkMode]);

	return (
		<StyledComponentsThemeProvider theme={themeObject}>
			{children}
		</StyledComponentsThemeProvider>
	);
}

const TextWrapper = styled(Text)`
	color: ${({ color, theme }) =>
		color ? theme[color] : theme['textPrimaryColor']};
	font-size: ${({ fontSize, theme }) => theme[fontSize]};
	line-height: ${({ lineHeight, theme }) => theme[lineHeight]};
	text-align: 'left';
	font-weight: ${({ fontWeight, theme }) =>
		fontWeight ? theme[fontWeight] : theme['regular']};
	margin-left: ${(props) =>
		props.timestamp &&
		(props.theme.isMobile()
			? props.theme.spacing(5.5)
			: props.theme.spacing(12))} !important;
	margin-bottom: ${(props) =>
		props.timestamp && props.theme.spacing(1.5)} !important;
	padding-right: ${(props) =>
		props.pr ? props.theme.spacing(props.pr) : 0} !important;
	padding-left: ${(props) =>
		props.pl ? props.theme.spacing(props.pl) : 0} !important;
	white-space: ${(props) => (props.nowrap ? 'nowrap' : 'wrap')} !important;
`;

export const TYPOGRAPHY = {
	headLine1(props) {
		return (
			<TextWrapper
				fontWeight='bold'
				fontSize='textH1'
				lineHeight='lineHeightH1'
				{...props}
			/>
		);
	},
	headLine2(props) {
		return (
			<TextWrapper
				fontWeight='bold'
				fontSize='textH2'
				lineHeight='lineHeightH2'
				{...props}
			/>
		);
	},
	headLine3(props) {
		return (
			<TextWrapper
				fontWeight='bold'
				fontSize='textH3'
				lineHeight='lineHeightH3'
				{...props}
			/>
		);
	},
	headLine4(props) {
		return (
			<TextWrapper
				fontWeight='bold'
				fontSize='textH4'
				lineHeight='lineHeightH4'
				color={props.label && 'textLabelColor'}
				{...props}
			/>
		);
	},
	headLine5(props) {
		return (
			<TextWrapper
				fontWeight='bold'
				fontSize='textH5'
				lineHeight='lineHeightH5'
				{...props}
			/>
		);
	},
	body1(props) {
		return (
			<TextWrapper
				fontWeight={props.bold ? 'bold' : 'regular'}
				fontSize='textBody1'
				lineHeight='lineHeightBody1'
				{...props}
			/>
		);
	},
	body2(props) {
		return (
			<TextWrapper
				fontSize='textBody2'
				lineHeight={props.zarelaDay ? 'lineHeightDay' : 'lineHeightBody2'}
				color={
					props.sidebarHighLight
						? '#3d5c8a'
						: props.zarelaDay
						? 'white'
						: props.color
				}
				fontWeight={props.zarelaDay ? 'bold' : props.fontWeight}
				{...props}
			/>
		);
	},
	timestamp(props) {
		return (
			<TextWrapper
				fontSize='textHint'
				lineHeight='lineHeightTimeStamp'
				color='textTimeStampColor'
				timestamp={true}
				{...props}
			/>
		);
	},
	hint(props) {
		return (
			<TextWrapper
				fontSize='textHint'
				lineHeight='lineHeightHint'
				nowrap
				color={props.active ? 'textTokenColor' : 'textPrimaryColor'}
				{...props}
			/>
		);
	},
	tag(props) {
		return (
			<TextWrapper
				fontSize='textTag'
				lineHeight='lineHeightTag'
				nowrap
				color='textTagColor'
				{...props}
			/>
		);
	},
};
