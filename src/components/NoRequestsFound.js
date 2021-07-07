import React from 'react'
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
`;

const Message = styled.div`
  font-weight: bold;
	font-size: 24px;
	line-height: 32px;
	text-align: center;
	color: #3ADEA3;
	max-width: 312px;
	word-break: break-word;
`;

const NoRequestsFound = () => {
	return (
		<Container>
			<Image src={noRequestsFoundImage} />
			<Message>
				You have not submitted any new requests!
			</Message>
		</Container>
	)
}

export default NoRequestsFound
