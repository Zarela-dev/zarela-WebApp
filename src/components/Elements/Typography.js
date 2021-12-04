import styled from 'styled-components';
import { Text, Heading, Link as RebassLink } from 'rebass/styled-components';
import { space, layout, color, compose, fontWeight } from 'styled-system';
import { variant } from 'styled-system';
import { Link as RouterLink } from 'react-router-dom';
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

const HeadingComponent = styled(Heading)(
	compose(space, layout, color, fontWeight),
	{
		boxSizing: 'border-box',
		fontFamily: 'Krub',
	},
	variant({
		prop: 'variant',
		variants: {
			heading1: {
				fontSize: [3, 1, 0],
				lineHeight: [4, 2, 0],
				fontFamily: 'LeagueGothic',
				letterSpacing: '2px',
			},
			heading2: {
				fontSize: [4, 2, 1],
				lineHeight: [6, 3, 1],
			},
			heading3: {
				fontSize: [5, 3, 2],
				lineHeight: [8, 4, 3],
			},
			heading4: {
				fontSize: [6, 5, 3],
				lineHeight: [11, 8, 4],
				fontWeight: 'semiBold',
			},
			heading5: {
				fontSize: [7, 6, 5],
				lineHeight: [13, 11, 8],
			},
			heading6: {
				fontSize: [6, 5, 4],
				lineHeight: [11, 8, 4],
				fontWeight: 'semiBold',
			},
			label: {
				fontSize: 2,
				lineHeight: 'heading',
			},
		},
	})
);

const TextComponent = styled(Text)(
	compose(space, layout, color, fontWeight),
	{
		fontFamily: 'Krub',
		textOverflow: (props) => props.textOverflow,
	},
	variant({
		prop: 'variant',
		variants: {
			big: {
				fontSize: [6, 6, 5],
				lineHeight: [9, 9, 5],
			},
			small: {
				fontSize: [7, 7, 6],
				lineHeight: [12, 12, 7],
			},
			extraSmall: {
				fontSize: [8],
				lineHeight: [9],
			},
			timestamp: {
				fontSize: [9, 8, 8],
				lineHeight: [12, 12, 7],
				color: 'textTimestamp',
				whiteSpace: 'nowrap',
			},
			tag: {
				fontSize: [8, 7],
				lineHeight: [13, 13, 7],
				color: 'textTag',
				whiteSpace: 'nowrap',
			},
			hint: {
				fontSize: [8, 8, 7],
				lineHeight: [9],
				whiteSpace: 'nowrap',
				textAlign: 'center',
			},
			hash: {
				fontSize: [8],
				lineHeight: [15],
			},
		},
	})
);

export const Header = (props) => {
	return <HeadingComponent fontWeight="bold" {...props}></HeadingComponent>;
};

export const BodyText = (props) => {
	return <TextComponent whiteSpace="nowrap" fontWeight="regular" as="p" {...props}></TextComponent>;
};

export const LinkText = (props) => {
	return <RebassLink as={RouterLink} {...props}></RebassLink>;
};
