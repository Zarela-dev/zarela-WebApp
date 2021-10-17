import React from 'react';
import biobitBlack from '../../assets/icons/biobit-black.svg';
import walletBlack from '../../assets/icons/wallet-black.svg';
import {
	SidebarCard,
	Header as HeaderWrapper,
	Icon,
	Row,
	Subtitle,
	Divider,
	ConnectButton,
} from './Elements';
import { Spacer } from '../Elements/Spacer';
import { injectedConnector } from '../../connectors';
import { useWeb3React } from '@web3-react/core';
import { Header, BodyText } from './../Elements/Typography';

const Sidebar = ({ data, account }) => {
	const { activate } = useWeb3React();

	return (
		<SidebarCard data-tour='request-list-nine'>
			<HeaderWrapper>
				<Icon src={biobitBlack} />
				<Header variant='heading5'>Token Info</Header>
			</HeaderWrapper>
			<Row>
				<Subtitle>
					<BodyText variant='small' color='textInfo' fontWeight='bold'>
						Total Supply
					</BodyText>
				</Subtitle>
				<BodyText ml={2}>20,000,000</BodyText>
			</Row>
			<Row>
				<Subtitle>
					<BodyText variant='small' color='textInfo' fontWeight='bold'>
						Token Name
					</BodyText>
				</Subtitle>
				<BodyText ml={2}>Biobit</BodyText>
			</Row>
			<Row>
				<Subtitle>
					<BodyText variant='small' color='textInfo' fontWeight='bold'>
						Symbol
					</BodyText>
				</Subtitle>
				<BodyText ml={2}>BBit</BodyText>
			</Row>
			<Divider />
			<HeaderWrapper>
				<Icon src={walletBlack} />
				<Header variant='heading5'>Wallet Info</Header>
				<Spacer />
			</HeaderWrapper>
			<Row hiddenInfo={account === undefined}>
				<Subtitle>
					<BodyText variant='small' color='textInfo' fontWeight='bold'>
						BBit Balance
					</BodyText>
				</Subtitle>
				<BodyText variant='small' color='textTimestamp' ml={2}>
					{data.biobitBalance}
				</BodyText>
			</Row>
			<Row hiddenInfo={account === undefined}>
				<Subtitle>
					<BodyText variant='small' color='textInfo' fontWeight='bold'>
						Ether Balance
					</BodyText>
				</Subtitle>
				<BodyText variant='small' color='textTimestamp' ml={2}>
					{data.etherBalance}
				</BodyText>
			</Row>
			{account === undefined ? (
				<>
					<BodyText variant='extraSmall' mb={2}>
						connect your wallet to see more data
					</BodyText>
					<ConnectButton
						variant='primary'
						onClick={() => activate(injectedConnector)}
					>
						connect
					</ConnectButton>
				</>
			) : null}
		</SidebarCard>
	);
};

export default Sidebar;
