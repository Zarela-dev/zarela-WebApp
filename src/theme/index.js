import React, { useMemo } from 'react';
import { css } from 'styled-components/macro';
import { ThemeProvider } from 'styled-components';

const theme = (darkMode) => {
	return {
		colors: {
			// text
			textPrimary: darkMode ? '#212121' : '#212121',
			textTimestamp: darkMode ? '#858585' : '#858585',
			textToken: darkMode ? '#3a68de' : '#3a68de',
			textTag: darkMode ? '#A0AAC3' : '#A0AAC3',
			textLabel: darkMode ? '#000' : '#fff',
			textInfo: darkMode ? '#3d5c8a' : '#3d5c8a',
			textGray: darkMode ? '#121213' : '#121213',

			bgWhite: '#FFFFFF',
			bgDisabled: '#F4F8FE',
			bgBadge: '#D13ADE',

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
			secondary: '#D13ADE',
			navLinkColor: '#8B72DE',
			navLinkDisabled: '#E3DDFA',
			notificationColor: '#2EECA8',
			textSecondary: '#6DA5BF',

			//status
			validation: '#F1C93A',
			error: '#F62D76',
			success: '#3ADEA3',

			
		},
		forms: {
			largeInput: {
				fontSize: 3,
				px: 3,
				py: 2,
			},
		},
		fontSizes: [56, 48, 32, 24, 20, 18, 16, 14, 12, 10],
		lineHeights: [
			'61.6px', //0
			'57.6px', //1
			'52.8px', //2
			'38.4px', //3
			'28.8px', //4
			'25.2px', //5
			'24px', //6
			'22.4px', //7
			'21.6px', //8
			'20.8px', //9
			'20px', //10
			'19.2px', //11
			'18.2px', //12
			'16.8px', //13
			'16px', //14
			'11.61px', //15
		],
		radii: [8, 4],
		fontWeights: {
			bold: 700,
			medium: 600, // #todo medium and semibold values must be replaced later
			semiBold: 500,
			regular: 400,
			light: 300,
		},
		breakPoints: ['1255px', '1440px', '1170px', '768px', '450px', '320px'],
		strokes: {
			error: '2px solid #F62D76',
			gray: '2px solid #C4C4C4',
		},
		space: [2, 4, 8, 16, 24, 32, 40, 48, 56, 64, 80, 120],
		elevations: {
			e1: '0px -3px 14px red',
			e2: '0px 0px 20px rgba(81, 197, 234, 0.16)',
			e3: '0px 4px 20px rgba(81, 197, 234, 0.1)',
			e4: '0px 6px 20px rgba(81, 197, 234, 0.15)',
		},
		iconSizes: [16, 24, 32],

		grids: {
			sm: 8,
			md: 12,
			lg: 24,
		},
		variants: {
			card: {
				p: 2,
				fontSize: '52px',
			},
			badge: {
				display: 'inline-block',
				p: 1,
				color: 'white',
				bg: 'primary',
				borderRadius: 2,
			},
		},
		maxWidth: '1255px',

		// spacing
		spacing: (val) => {
			const BASE = 8;
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

const Theme = ({ children }) => {
	const darkMode = false;

	const themeObject = useMemo(() => theme(darkMode), [darkMode]);

	return <ThemeProvider theme={themeObject}>{children}</ThemeProvider>;
};

export default Theme;