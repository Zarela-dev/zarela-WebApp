import React from 'react';
import biobitBlack from '../../assets/icons/biobit-black.svg';
import walletBlack from '../../assets/icons/wallet-black.svg';
import infoIcon from '../../assets/icons/info-purple.svg';
import { SidebarCard, Header as HeaderWrapper, Icon, Row, Subtitle, ConnectButton } from './Elements';
import { Spacer } from '../Elements/Spacer';
import { Header, BodyText } from './../Elements/Typography';
import { ThemeDivider } from './../Elements/Divider';

const Sidebar = ({ biobitBalance, ethBalance, account, isConnecting, setIsConnecting }) => {
	return (
		<SidebarCard data-tour="request-list-nine">
			<HeaderWrapper>
				<Icon src={biobitBlack} />
				<Header variant="heading5">Token Info</Header>
			</HeaderWrapper>
			<Row>
				<Subtitle>
					<BodyText variant="small" color="textInfo" fontWeight="bold">
						Total Supply
					</BodyText>
				</Subtitle>
				<BodyText ml={2}>20,000,000</BodyText>
			</Row>
			<Row>
				<Subtitle>
					<BodyText variant="small" color="textInfo" fontWeight="bold">
						Token Name
					</BodyText>
				</Subtitle>
				<BodyText ml={2}>Biobit</BodyText>
			</Row>
			<Row>
				<Subtitle>
					<BodyText variant="small" color="textInfo" fontWeight="bold">
						Symbol
					</BodyText>
				</Subtitle>
				<BodyText ml={2}>BBit</BodyText>
			</Row>
			<ThemeDivider variant="horizontal" />
			<HeaderWrapper>
				<Icon src={walletBlack} />
				<Header variant="heading5">Wallet Info</Header>
				<Spacer />
			</HeaderWrapper>
			<Row hiddenInfo={!account}>
				<Subtitle>
					<BodyText variant="small" color="textInfo" fontWeight="bold">
						BBit Balance
					</BodyText>
				</Subtitle>
				<BodyText variant="small" color="textTimestamp" ml={2}>
					{biobitBalance || 'Unavailable Info'}
				</BodyText>
			</Row>
			<Row hiddenInfo={!account}>
				<Subtitle>
					<BodyText variant="small" color="textInfo" fontWeight="bold">
						Ether Balance
					</BodyText>
				</Subtitle>
				<BodyText variant="small" color="textTimestamp" ml={2}>
					{ethBalance || 'Unavailable Info'}
				</BodyText>
			</Row>
			{!account ? (
				<>
					<BodyText variant="extraSmall" mb={2}>
						connect your wallet to see more data
					</BodyText>
					<ConnectButton variant="primary" onClick={() => { setIsConnecting(true)}}>
						connect
					</ConnectButton>
				</>
			) : null}
		</SidebarCard>
	);
};

export default Sidebar;
