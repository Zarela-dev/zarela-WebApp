import React from 'react';
import biobitBlack from '../../assets/icons/biobit-black.svg';
import walletBlack from '../../assets/icons/wallet-black.svg';
import {
	SidebarCard,
	Header,
	Icon,
	Row,
	Subtitle,
	Divider,
	ConnectButton,
} from './Elements';
import { Spacer } from '../Elements/Spacer';
import { injectedConnector } from '../../connectors';
import { useWeb3React } from '@web3-react/core';
import { TYPOGRAPHY } from '../../theme';

const Sidebar = ({ data, account }) => {
	const { activate } = useWeb3React();

	return (
		<SidebarCard data-tour='request-list-nine'>
			<Header>
				<Icon src={biobitBlack} />
				<TYPOGRAPHY.body1 bold>Token Info</TYPOGRAPHY.body1>
			</Header>
			<Row>
				<Subtitle>
					<TYPOGRAPHY.body2 sidebarHighLight semiBold>
						Total Supply
					</TYPOGRAPHY.body2>
				</Subtitle>
				<TYPOGRAPHY.body1 ml={2}>20,000,000</TYPOGRAPHY.body1>
			</Row>
			<Row>
				<Subtitle>
					<TYPOGRAPHY.body2 sidebarHighLight bold>
						Token Name
					</TYPOGRAPHY.body2>
				</Subtitle>
				<TYPOGRAPHY.body1 ml={2}>Biobit</TYPOGRAPHY.body1>
			</Row>
			<Row>
				<Subtitle>
					<TYPOGRAPHY.body2 sidebarHighLight bold>
						Symbol
					</TYPOGRAPHY.body2>
				</Subtitle>
				<TYPOGRAPHY.body1 ml={2}>BBit</TYPOGRAPHY.body1>
			</Row>
			<Divider />
			<Header>
				<Icon src={walletBlack} />
				<TYPOGRAPHY.body1 bold>Wallet Info</TYPOGRAPHY.body1>
				<Spacer />
			</Header>
			<Row hiddenInfo={account === undefined}>
				<Subtitle>
					<TYPOGRAPHY.body2 sidebarHighLight bold>
						BBit Balance
					</TYPOGRAPHY.body2>
				</Subtitle>
				<TYPOGRAPHY.body1 ml={2}>{data.biobitBalance}</TYPOGRAPHY.body1>
			</Row>
			<Row hiddenInfo={account === undefined}>
				<Subtitle>
					<TYPOGRAPHY.body2 sidebarHighLight bold>
						Ether Balance
					</TYPOGRAPHY.body2>
				</Subtitle>
				<TYPOGRAPHY.body1 ml={2}>{data.etherBalance}</TYPOGRAPHY.body1>
			</Row>
			{account === undefined ? (
				<>
					<TYPOGRAPHY.hint mb={2} textAlign='center'>
						connect your wallet to see more data
					</TYPOGRAPHY.hint>
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
