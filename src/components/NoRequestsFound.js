import React from 'react';
import styled from 'styled-components';
import noRequestsFoundImage from '../assets/no-requests-found.png';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Image = styled.img`
	width: 300px;
	opacity: 0.5;

	@media only screen and (max-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		width: 120px;
	}
`;

const Message = styled.div`
	@media only screen and (max-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		font-size: 13px;
	}
	font-weight: bold;
	font-size: 24px;
	line-height: 32px;
	text-align: center;
	color: #3adea3;
	max-width: 312px;
	word-break: break-word;
`;

const NoRequestsFound = ({ message }) => {
	return (
		<Container>
			<Image src={noRequestsFoundImage} />
			<Message>{message || 'You have not received any files yet.'}</Message>
		</Container>
	);
};

export default NoRequestsFound;
