import React from "react";
import styled from "styled-components";
import maxWidthWrapper from "../Elements/MaxWidth";

const Wrapper = styled.div`
	background: #f4f8fe;
	height: ${(props) => (props.isMobile ? "unset" : "90px")};
	padding: ${(props) =>
		props.isMobile ? "unset" : `${props.theme.spacing(3.5)} 0`};
	margin-bottom: ${(props) =>
		props.isMobile ? "unset" : `${props.theme.spacing(4)}`};
`;

const Inner = styled.div`
	${maxWidthWrapper};
	font-weight: normal;
	font-size: 26px;
`;

const TitleBar = ({ children, isMobile, ...rest }) => {
	return (
		<Wrapper isMobile={isMobile}>
			<Inner {...rest}>{children}</Inner>
		</Wrapper>
	);
};

export default TitleBar;
