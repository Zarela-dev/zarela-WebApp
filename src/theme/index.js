import React, { useMemo } from 'react';
import styled, {
	css,
	ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components/macro';

const fontSize = () => {
	return {
		fontSizes: [10, 12, 14, 16, 18, 20, 24, 32, 48, 56],
	};
};

const lineHeight = () => {
	return {
		lineHeights: [
			61.6,
			57.6,
			52.8,
			38.4,
			28.8,
			25.2,
			24,
			22.4,
			21.6,
			20.8,
			20,
			19.2,
			18.2,
			16.8,
			16,
		],
	};
};

const colors = (darkMode) => {
	return {
		colors: {
			// text
			textPrimary: darkMode ? '#212121' : '#212121',
			textTimeStamp: darkMode ? '#858585' : '#858585',
			textToken: darkMode ? '#3a68de' : '#3a68de',
			textTag: darkMode ? '#A0AAC3' : '#A0AAC3',
			textLabel: darkMode ? '#000' : '#fff',

			bgWhite: '#FFFFFF',
			bgDisabled: '#F4F8FE',

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

			fieldForm: darkMode ? '#F7F7FD' : '#F7F7FD',
			fieldTitle: darkMode ? '#9D99AC' : '#9D99AC',
			fieldText: darkMode ? '#212121' : '#212121',
			fieldDescription: darkMode ? '#AAAA' : '#AAAA',

			// colors
			primary: '#7246D0',
			primaryFaded: '#7246d029',
			secondary: 'rgba(126, 162, 253, 0.4)',
			navLinkColor: '#8B72DE',
			navLinkDisabled: '#E3DDFA',
			notificationColor: '#2EECA8',
			textSecondary: '#6DA5BF',

			//status
			validation: '#F1C93A',
			error: '#F62D76',
			success: '#3ADEA3',
		},
	};
};

const fontWeights = () => {
	return {
		fontWeights: {
			bold: 700,
			semiBold: 500,
			regular: 400,
			light: 300,
		},
	};
};

const elevations = () => {
	return {
		elevations: {
			e1: '0px -3px 14px rgba(81, 197, 234, 0.15)',
			e2: '0px 0px 20px rgba(81, 197, 234, 0.16)',
			e3: '0px 4px 20px rgba(81, 197, 234, 0.1)',
			e4: '0px 6px 20px rgba(81, 197, 234, 0.15)',
		},
	};
};

const strokes = () => {
	return {
		strokes: {
			error: '2px solid #F62D76',
			gray: '2px solid #C4C4C4',
		},
	};
};

const breakPoints = () => {
	return {
		breakPoints: ['1255px', '1440px', '1170px', '768px', '450px', '320px'],
	};
};

const spacing = () => {
	/**
	 * this will not have conflicts with spacing() cause they calling methods are diffrent => spacing(2) vs spacing: {[2,4]}
	 * so we will clean spacing() after themming
	 */
	return {
		spacing: [2, 4, 8, 16, 24, 32, 40, 48, 56, 64, 80, 120],
	};
};

const iconSizes = () => {
	return{
		iconSizes: [16,24,32],
	}
}

const theme = (darkMode) => {
	return {
		...colors(darkMode),
		...fontSize(),
		...lineHeight(),
		...fontWeights(),
		...breakPoints(),
		...strokes(),
		...spacing(),
		...elevations(),
		...iconSizes(),

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
