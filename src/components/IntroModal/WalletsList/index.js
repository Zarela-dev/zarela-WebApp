import React from 'react';
import styled from 'styled-components';
import metamaskIcon from '../../../assets/icons/wallets/metamask.svg';
import walletConnectIcon from '../../../assets/icons/wallets/walletConnect.svg';
import coinbaseIcon from '../../../assets/icons/wallets/coinbase.svg';
import portisIcon from '../../../assets/icons/wallets/portis.svg';
import fortmaticIcon from '../../../assets/icons/wallets/fortmatic.svg';

const wallets = [
	{
		name: 'Metamask',
		icon: metamaskIcon,
		active: true,
	},
	{
		name: 'Fortmatic',
		icon: fortmaticIcon,
		active: false,
	},
	{
		name: 'Portis',
		icon: portisIcon,
		active: false,
	},
	{
		name: 'Coinbase',
		icon: coinbaseIcon,
		active: false,
	},
	{
		name: 'WalletConnect',
		icon: walletConnectIcon,
		active: false,
	},
];

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	margin-top: ${(props) => props.theme.spacing(1)};

	@media only screen and (min-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		margin-top: ${(props) => props.theme.spacing(4)};
		justify-content: space-around;
	}
`;

const WalletItem = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(2)};
	opacity: ${(props) => (props.active ? 1 : 0.5)};
	cursor: ${(props) => (props.active ? 'pointer' : 'not-allowed')};
`;

const WalletIcon = styled.img`
	width: 45px;
	margin-bottom: ${(props) => props.theme.spacing(1)};

	@media only screen and (min-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		width: 75px;
	}
`;

const WalletTitle = styled.p`
	font-style: normal;
	font-weight: 600;
	font-size: 8.56056px;
	color: ${(props) => props.theme.textPrimary};
	white-space: nowrap;
	margin-top: ${(props) => props.theme.spacing(2)};

	@media only screen and (min-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		font-size: 18px;
	}
`;

const ListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const ListItem = styled.div`
	width: 100%;
	padding: ${(props) => props.theme.spacing(2.7)};
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;

	opacity: ${(props) => (props.active ? 1 : 0.5)};
	cursor: ${(props) => (props.active ? 'pointer' : 'not-allowed')};

	&:not(:last-child) {
		border-bottom: 1px solid rgba(114, 70, 208, 0.3);
	}
`;

const ListItemIcon = styled.img`
	width: 30px;
`;

const ListItemTitle = styled.p`
	font-weight: 500;
	font-size: 16px;
	line-height: 11px;
`;

function WalletsList({ view = 'grid' }) {
	if (view === 'grid')
		return (
			<Wrapper>
				{wallets.map(({ name, icon, active }) => (
					<WalletItem active={active}>
						<WalletIcon src={icon} />
						<WalletTitle>{name}</WalletTitle>
					</WalletItem>
				))}
			</Wrapper>
		);
	if (view === 'list')
		return (
			<ListWrapper>
				{wallets.map(({ name, icon, active }) => (
					<ListItem active={active}>
						<ListItemTitle>{name}</ListItemTitle>
						<ListItemIcon src={icon} />
					</ListItem>
				))}
			</ListWrapper>
		);
}

export default WalletsList;
