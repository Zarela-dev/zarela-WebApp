import React from 'react'
import TitleBar from './TitleBar';
import styled from 'styled-components';
import maxWidthWrapper from './Elements/MaxWidth';

const PageWrapper = styled.div`
	
`;

const ContentWrapper = styled.div`
	margin-top: ${props => props.theme.spacing(6)};
	${maxWidthWrapper};
`;


const MyOrders = () => {
	return (
		<PageWrapper>
			<TitleBar>
				My Orders
			</TitleBar>
			<ContentWrapper>
				content
			</ContentWrapper>
		</PageWrapper>
	)
}

export default MyOrders
