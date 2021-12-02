import styled from 'styled-components';
import { Box } from 'rebass/styled-components';
import { space, layout, color, compose, fontWeight, padding } from 'styled-system';
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
		minWidth: '100%',
	},
	{
		'@media screen and (max-width: 64em)': {
			height: 'fit-content',
			borderRadius: '5px 5px 0px 5px',
			padding: '5px 10px',
		},
	}
);

export const IdLabel = (props) => {
	return (
		<Box>
			<IdLabelWrapper {...props}>
				<Header variant="heading3" as="h4" fontWeight="bold" color="white" whiteSpace="nowrap">
					{props.children}
				</Header>
			</IdLabelWrapper>
		</Box>
	);
};
