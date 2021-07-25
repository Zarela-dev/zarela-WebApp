import React from 'react';
import styled from 'styled-components';
import maxWidthWrapper from '../Elements/MaxWidth';

const Wrapper = styled.div`
	background: #F4F8FE;
`;

const Inner = styled.div`
	${maxWidthWrapper};
	font-weight: normal;
	font-size: 26px;
`;

const TitleBarMobile = ({ children, ...rest }) => {
	return (
		<Wrapper>
			<Inner {...rest}>
				{children}
			</Inner>
		</Wrapper>
	);
};

export default TitleBarMobile;
