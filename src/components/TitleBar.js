import React from 'react';
import styled from 'styled-components';
import maxWidthWrapper from './Elements/MaxWidth';

const Wrapper = styled.div`
	background: #F4F8FE;
	height: 90px;
	padding: ${props => props.theme.spacing(3.5)} 0;
	margin-bottom: ${props => props.theme.spacing(4)};
`;

const Inner = styled.div`
	${maxWidthWrapper};
	font-weight: normal;
	font-size: 26px;
`;

const TitleBar = ({ children, ...rest }) => {
	return (
		<Wrapper>
			<Inner {...rest}>
				{children}
			</Inner>
		</Wrapper>
	);
};

export default TitleBar;
