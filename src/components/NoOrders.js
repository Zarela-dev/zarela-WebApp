import React from 'react'
import styled from 'styled-components';
import noOrdersImage from '../assets/no-orders.png';

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

const NoOrders = () => {
	return (
		<Container>
			<Image src={noOrdersImage} />
			<Message>
				You have not submited any new requests!
			</Message>
		</Container>
	)
}

export default NoOrders
