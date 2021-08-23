import React from 'react';
import styled from 'styled-components';
import maxWidthWrapper from '../Elements/MaxWidth';

const Wrapper = styled.div`
	background: #f4f8fe;
	height: 100px;
	padding: ${(props) => `${props.theme.spacing(3.5)} 0`};
	margin-bottom: ${(props) => `${props.theme.spacing(4)}`};

	@media only screen and (max-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		height: unset;
		margin-bottom: ${(props) => `${props.theme.spacing(2)}`};
		padding: ${(props) => props.isMobile && 'unset'};
	}
`;

const Inner = styled.div`
	${maxWidthWrapper};
	padding: ${(props) => `0 ${props.theme.spacing(2)}`};
	font-weight: 700;
	font-size: 24px;
	line-height: 22px;
	color: ${(props) => props.theme.textPrimary};

	@media only screen and (max-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		font-size: 18px;
		font-weight: 700;
		white-space: nowrap;
	}
`;

const TitleBar = ({ children, isMobile, ...rest }) => {
	return (
		<Wrapper isMobile={isMobile}>
			<Inner {...rest}>{children}</Inner>
		</Wrapper>
	);
};

export default TitleBar;
