import styled from 'styled-components';

export const Typography = styled.div`
	line-height: 1.3;
	font-size: ${(props) => {
		if (props.variant === 'title') return props.theme.title;
		if (props.variant === 'body') return props.theme.body;
		if (props.variant === 'body2') return props.theme.body2;
		if (props.variant === 'badge') return props.theme.badge;
	}};
	font-weight: ${(props) => {
		if (props.weight === 'bold') return props.theme.bold;
		if (props.weight === 'semiBold') return props.theme.semiBold;
		return props.theme.regular;
	}};
	white-space: ${(props) => (props.nowrap ? 'nowrap' : 'normal')};
	color: ${(props) => {
		if (props.color === 'secondary') return props.theme.textSecondary;
		return props.theme.textPrimary;
	}};
`;
