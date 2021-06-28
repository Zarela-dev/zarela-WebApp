import React, { useContext } from 'react';
import styled from 'styled-components';
import biobitBlack from '../../assets/icons/biobit-black.svg';
import { web3Context } from '../../web3Provider';
import walletBlack from '../../assets/icons/wallet-black.svg';
import etherBlack from '../../assets/icons/ether-black.svg';
import infoIcon from '../../assets/icons/info-purple.svg';
import { convertToBiobit } from '../../utils';
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
	ConnectButton
} from './Elements';
import { Spacer } from '../Elements/Spacer';

const Sidebar = () => {
	const { Web3 } = useContext(web3Context);

	return (
		<SidebarCard>
			<Header>
				<Icon src={biobitBlack} />
				<Title>
					Token Info
				</Title>

			</Header>
			<Row>
				<Subtitle>
					Total Supply
				</Subtitle>
				<Value>
					20,000,000
				</Value>
			</Row>
			<Row>
				<Subtitle>
					Token Name
				</Subtitle>
				<Value>
					BBit
				</Value>
			</Row>
			<Row>
				<Subtitle>
					Symbol
				</Subtitle>
				<Value>
					BBit
				</Value>
			</Row>
			<Row>
				<Subtitle>
					Zarela Bank
				</Subtitle>
				<Value>
					{`${Web3.bank} BBit`}
				</Value>
			</Row>
			<Divider />
			<Header>
				<Icon src={walletBlack} />
				<Title>
					Wallet Info
				</Title>
				<Spacer />
				<Icon src={infoIcon} />
			</Header>
			<Row hiddenInfo={Web3.accounts.length === 0}>
				<Subtitle>
					BBit Balance
				</Subtitle>
				<Value>
					{`${!Number.isNaN(Web3.biobitBalance) ? convertToBiobit(Web3.biobitBalance) + '  BBit' : Web3.biobitBalance}`}
				</Value>
			</Row>
			<Row hiddenInfo={Web3.accounts.length === 0}>
				<Subtitle>
					Ether Balance
				</Subtitle>
				<Value>
					{Web3.etherBalance}
				</Value>
			</Row>
			{
				Web3.accounts.length === 0 ?
					<>
						<NoConnectionMessage>
							connect your wallet to see more data
						</NoConnectionMessage>
						<ConnectButton variant='primary' onClick={() => window.ethereum.enable()}>
							connect
						</ConnectButton>
					</>
					: null
			}
		</SidebarCard>
	);
};

export default Sidebar;
