import React from 'react';
import styled, { css } from 'styled-components';
import metamaskIcon from '../../../assets/icons/wallets/metamask.svg';
import walletConnectIcon from '../../../assets/icons/wallets/walletConnect.svg';
import coinbaseIcon from '../../../assets/icons/wallets/coinbase.svg';
import portisIcon from '../../../assets/icons/wallets/portis.svg';
import fortmaticIcon from '../../../assets/icons/wallets/fortmatic.svg';
import { BodyText } from '../../../components/Elements/Typography';
import { ThemeIcon } from '../../../components/Elements/Icon';

const wallets = [
	{
		name: 'Metamask',
		icon: metamaskIcon,
		active: true,
		link: `https://metamask.app.link/dapp/${window.location.host}`,
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

	@media only screen and (min-width: ${(props) =>
			props.theme.desktop_sm_breakpoint}) {
		margin-top: ${(props) => props.theme.spacing(4)};
		justify-content: space-around;
	}
`;

const GridItem = css`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: ${(props) => props.theme.spacing(2)}
		${(props) => props.theme.spacing(2)};
	opacity: ${(props) => (props.active ? 1 : 0.5)};
	cursor: ${(props) => (props.active ? 'pointer' : 'not-allowed')};
`;

const GridItemLink = styled.a`
	${GridItem};
	text-decoration: none;
`;

const GridItemButton = styled.button`
	${GridItem};
	border: none;
	background: none;
`;

const ListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const ListItem = css`
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

const ListItemLink = styled.a`
	${ListItem};
	text-decoration: none;
`;

const ListItemButton = styled.button`
	${ListItem};
	border: none;
	background: none;
`;

function WalletsList({ view = 'grid' }) {
	if (view === 'grid')
		return (
			<Wrapper>
				{wallets.map(({ name, icon, active, link, onClick }) =>
					!window.ethereum?.isMetaMask && link !== undefined && active ? (
						<GridItemLink
							key={name}
							href={link}
							target='_blank'
							active={active}
						>
							<ThemeIcon mb={3} variant='big' src={icon} />
							<BodyText variant='small'>{name}</BodyText>
						</GridItemLink>
					) : (
						<GridItemButton
							onClick={onClick}
							disabled={window.ethereum?.isMetaMask && !active}
							active={active}
						>
							<ThemeIcon mb={3} variant='big' src={icon} />
							<BodyText variant='small'>{name}</BodyText>
						</GridItemButton>
					)
				)}
			</Wrapper>
		);
	if (view === 'list')
		return (
			<ListWrapper>
				{wallets.map(({ name, icon, active, link, onClick }) =>
					!window.ethereum?.isMetaMask && link !== undefined && active ? (
						<ListItemLink
							key={name}
							href={link}
							target='_blank'
							active={active}
						>
							<BodyText variant='small'>{name}</BodyText>
							<ThemeIcon variant='big' src={icon} />
						</ListItemLink>
					) : (
						<ListItemButton
							disabled={window.ethereum?.isMetaMask && !active}
							onClick={onClick}
							active={active}
						>
							<BodyText variant='small'>{name}</BodyText>
							<ThemeIcon variant='big' src={icon} />
						</ListItemButton>
					)
				)}
			</ListWrapper>
		);
}

export default WalletsList;
