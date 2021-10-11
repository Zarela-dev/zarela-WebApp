import React, { useMemo } from 'react';
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
		};
	}
};

const colors = (darkMode) => {
	return {
		// text
		textPrimary: darkMode ? '#212121' : '#212121',

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
		textToken: '#3C87AA',
		error: 'red',
	};
};

const theme = (darkMode) => {
	return {
		...colors(darkMode),
		...fontSize(),

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
		bold: 700,
		semiBold: 500,
		regular: 400,
		light: 300,
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
	color: ${({ color, theme }) => theme['textPrimary']};
	font-size: ${({ fontSize, theme }) => theme[fontSize]};

	:hover {
		opacity: 0.7;
	}
`;

const ButtonWrapper = styled(Button)`
	color: ${({ color, theme }) => theme[color]};
`;

export const TYPOGRAPHY = {
	headLine1(props) {
		return <TextWrapper fontWeight={700} fontSize={'textH1'} {...props} />;
	},
	headLine2(props) {
		return <TextWrapper fontWeight={700} fontSize={'textH2'} {...props} />;
	},
	headLine3(props) {
		return <TextWrapper fontWeight={700} fontSize={'textH3'} {...props} />;
	},
	headLine4(props) {
		return <TextWrapper fontWeight={700} fontSize={'textH4'} {...props} />;
	},
	headLine5(props) {
		return <TextWrapper fontWeight={700} fontSize={'textH5'} {...props} />;
	},
	body1(props) {
		return <TextWrapper fontWeight={400} fontSize={'textBody1'} {...props} />;
	},
	body2(props) {
		return <TextWrapper fontWeight={400} fontSize={'textBody2'} {...props} />;
	},
};

export const BUTTON = {
	primary(props) {
		return <ButtonWrapper fontWeight={500} color={'text2'} {...props} />;
	},
	secondary(props) {
		return <ButtonWrapper fontWeight={500} color={'primary1'} {...props} />;
	},
	link(props) {
		return <ButtonWrapper fontWeight={600} color={'text1'} {...props} />;
	},
};
