import styled from 'styled-components';
import { Text, TextProps as TextPropsOriginal, Button } from 'rebass';

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

const TextWrapper = styled(Text)`
	color: ${({ color, theme }) =>
		color ? theme[color] : theme['textPrimaryColor']};
	font-size: ${({ fontSize, theme }) => theme[fontSize]};
	line-height: ${({ lineHeight, theme }) => theme[lineHeight]};
	text-align: 'left';
	font-weight: ${({ fontWeight, theme }) =>
		fontWeight ? theme[fontWeight] : theme['regular']};
	margin-left: ${(props) =>
	props.ml ? props.theme.spacing(props.ml) : 0} !important;
	margin-top: ${(props) => props.mt ? props.theme.spacing(props.mt) : 0} !important;
	margin-bottom: ${(props) =>
		props.mb ? props.theme.spacing(props.mb) : 0} !important;
	padding-right: ${(props) =>
		props.pr ? props.theme.spacing(props.pr) : 0} !important;
	padding-left: ${(props) =>
		props.pl ? props.theme.spacing(props.pl) : 0} !important;
	white-space: ${(props) => (props.nowrap ? 'nowrap' : 'wrap')} !important;
`;

export const TYPOGRAPHY = {
	HeadLine1(props) {
		return (
			<TextWrapper
				fontWeight='bold'
				fontSize='textH1'
				lineHeight='lineHeightH1'
				{...props}
			/>
		);
	},
	HeadLine2(props) {
		return (
			<TextWrapper
				fontWeight='bold'
				fontSize='textH2'
				lineHeight='lineHeightH2'
				{...props}
			/>
		);
	},
	HeadLine3(props) {
		return (
			<TextWrapper
				fontWeight='bold'
				fontSize='textH3'
				lineHeight='lineHeightH3'
				{...props}
			/>
		);
	},
	HeadLine4(props) {
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
	HeadLine5(props) {
		return (
			<TextWrapper
				fontWeight='bold'
				fontSize='textH5'
				lineHeight='lineHeightH5'
				{...props}
			/>
		);
	},
	Body1(props) {
		return (
			<TextWrapper
				fontWeight={props.bold ? 'bold' : 'regular'}
				fontSize='textBody1'
				lineHeight='lineHeightBody1'
				{...props}
			/>
		);
	},
	Body2(props) {
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
	Timestamp(props) {
		return (
			<TextWrapper
				fontSize='textHint'
				lineHeight='lineHeightTimeStamp'
				color='textTimeStampColor'
				{...props}
			/>
		);
	},
	Hint(props) {
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
	Tag(props) {
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
