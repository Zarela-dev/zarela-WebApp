import React from 'react';
import biobitBlack from '../../assets/icons/biobit-black.svg';
import walletBlack from '../../assets/icons/wallet-black.svg';
import infoIcon from '../../assets/icons/info-purple.svg';
import {
	SidebarCard,
	Header,
	Icon,
	Row,
	Subtitle,
	Title,
	Value,
	Divider,
	NoConnectionMessage,
	ConnectButton,
} from './Elements';
import { Spacer } from '../Elements/Spacer';
import { injectedConnector } from '../../connectors';
import { useWeb3React } from '@web3-react/core';

const Sidebar = ({ data, account }) => {
	const { activate } = useWeb3React();

	return (
		<SidebarCard data-tour="request-list-nine">
			<Header>
				<Icon src={biobitBlack} />
				<Title>Token Info</Title>
			</Header>
			<Row>
				<Subtitle>Total Supply</Subtitle>
				<Value>20,000,000</Value>
			</Row>
			<Row>
				<Subtitle>Token Name</Subtitle>
				<Value>Biobit</Value>
			</Row>
			<Row>
				<Subtitle>Symbol</Subtitle>
				<Value>BBit</Value>
			</Row>
			<Divider />
			<Header>
				<Icon src={walletBlack} />
				<Title>Wallet Info</Title>
				<Spacer />
			</Header>
			<Row hiddenInfo={account === undefined}>
				<Subtitle>BBit Balance</Subtitle>
				<Value>{data.biobitBalance}</Value>
			</Row>
			<Row hiddenInfo={account === undefined}>
				<Subtitle>Ether Balance</Subtitle>
				<Value>{data.etherBalance}</Value>
			</Row>
			{account === undefined ? (
				<>
					<NoConnectionMessage>connect your wallet to see more data</NoConnectionMessage>
					<ConnectButton variant="primary" onClick={() => activate(injectedConnector)}>
						connect
					</ConnectButton>
				</>
			) : null}
		</SidebarCard>
	);
};

export default Sidebar;
