import styled from 'styled-components';
import { Box } from 'rebass/styled-components';
import {
	space,
	layout,
	color,
	compose,
	fontWeight,
	padding,
} from 'styled-system';
import { Header } from './Typography';

const IdLabelWrapper = styled(Box)(
	compose(space, layout, color, fontWeight, padding),
	{
		background: 'linear-gradient(246.29deg, #3a68de 12.69%, #3a68de 100%)',
		borderRadius: '10px 10px 0px 10px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '10px 20px',
	},
	{
		'@media screen and (max-width: 64em)': {
			height: 'fit-content',
			borderRadius: '10px 10px 0px 10px',
		},
	}
);

export const IdLabel = (props) => {
	return (
		<Box pr={[4]}>
			<IdLabelWrapper {...props}>
				<Header
					variant='heading4'
					as='h4'
					fontWeight='semiBold'
					color='white'
					whiteSpace='nowrap'
				>
					{props.children}
				</Header>
			</IdLabelWrapper>
		</Box>
	);
};
