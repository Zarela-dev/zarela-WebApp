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
import { TYPOGRAPHY } from '../Elements/Typography';

const Sidebar = ({ data, account }) => {
	const { activate } = useWeb3React();

	return (
		<SidebarCard data-tour='request-list-nine'>
			<Header>
				<Icon src={biobitBlack} />
				<TYPOGRAPHY.Body1 bold>Token Info</TYPOGRAPHY.Body1>
			</Header>
			<Row>
				<Subtitle>
					<TYPOGRAPHY.Body2 sidebarHighLight semiBold>
						Total Supply
					</TYPOGRAPHY.Body2>
				</Subtitle>
				<TYPOGRAPHY.Body1 ml={2}>20,000,000</TYPOGRAPHY.Body1>
			</Row>
			<Row>
				<Subtitle>
					<TYPOGRAPHY.Body2 sidebarHighLight bold>
						Token Name
					</TYPOGRAPHY.Body2>
				</Subtitle>
				<TYPOGRAPHY.Body1 ml={2}>Biobit</TYPOGRAPHY.Body1>
			</Row>
			<Row>
				<Subtitle>
					<TYPOGRAPHY.Body2 sidebarHighLight bold>
						Symbol
					</TYPOGRAPHY.Body2>
				</Subtitle>
				<TYPOGRAPHY.Body1 ml={2}>BBit</TYPOGRAPHY.Body1>
			</Row>
			<Divider />
			<Header>
				<Icon src={walletBlack} />
				<TYPOGRAPHY.Body1 bold>Wallet Info</TYPOGRAPHY.Body1>
				<Spacer />
			</Header>
			<Row hiddenInfo={account === undefined}>
				<Subtitle>
					<TYPOGRAPHY.Body2 sidebarHighLight bold>
						BBit Balance
					</TYPOGRAPHY.Body2>
				</Subtitle>
				<TYPOGRAPHY.Body1 ml={2}>{data.biobitBalance}</TYPOGRAPHY.Body1>
			</Row>
			<Row hiddenInfo={account === undefined}>
				<Subtitle>
					<TYPOGRAPHY.Body2 sidebarHighLight bold>
						Ether Balance
					</TYPOGRAPHY.Body2>
				</Subtitle>
				<TYPOGRAPHY.Body1 ml={2}>{data.etherBalance}</TYPOGRAPHY.Body1>
			</Row>
			{account === undefined ? (
				<>
					<TYPOGRAPHY.Hint mb={2} textAlign='center'>
						connect your wallet to see more data
					</TYPOGRAPHY.Hint>
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
