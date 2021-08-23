import React from 'react';
import Button from './Elements/Button';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { injectedConnector } from '../connectors';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Message = styled.div`
	font-size: 16px;
	margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const ConnectToMetamask = () => {
	const { activate } = useWeb3React();

	return (
		<Wrapper>
			<Message>Please connect to Metamask to continue</Message>
			<Button variant="primary" onClick={() => activate(injectedConnector)}>
				Connect
			</Button>
		</Wrapper>
	);
};

export default ConnectToMetamask;
