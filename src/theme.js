export const theme = {
	maxWidth: '1255px',
	primary: '#7246D0',
	primaryFaded: '#7246d029',
	secondary: 'rgba(126, 162, 253, 0.4)',

	spacing: (val) => {
		const BASE = 10;
		return BASE * val + 'px';
	},

	title: '28px',
	body: '14px',
	bod2: '16px',
	badge: '12px',
	bold: 700,
	semiBold: 500,
	regular: 400,
	light: 300,
	textPrimary: '#121213',
	textSecondary: '#6DA5BF',
	textToken: '#3C87AA',
	navLinkColor: '#8B72DE',
	navLinkDisabled: '#E3DDFA',
	notificationColor: '#2EECA8',
	// breakpoints
	desktop_md_breakpoint: '1440px',
  desktop_sm_breakpoint: '1170px',
  tablet_sm_breakpoint: '768px',
  mobile_sm_breakpoint: '450px',
  mobile_xs_breakpoint: '320px',
}