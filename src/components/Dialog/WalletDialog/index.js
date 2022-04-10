import { useEffect, useState } from 'react';
import WalletItem from './WalletItem';
import Dialog from '../index';
import { useStore } from '../../../state/store';
import mmLogo from '../../../assets/icons/wallets/metamask.svg';
import wcLogo from '../../../assets/icons/wallets/walletConnect.svg';
import { MMConnector } from '../../../connectors/metamask';
import { WCConnector } from '../../../connectors/walletConnect';
import { STATUS } from '../../../state/slices/connectorSlice';
import { activateConnector } from '../../../utils/activateConnector';
import { getConnectorHooks } from '../../../utils/getConnectorHooks';
import { convertToBiobit } from '../../../utils';
import { utils } from 'ethers';
import BigNumber from 'bignumber.js';

const WalletDialog = ({ forceOpen, forceMetamask, eagerConnect, onClose }) => {
	const {
		connectorStatus,
		activeConnectorType,
		dialogOpen,
		contract,
		activeConnector,
		setConnectorInProgress,
		setDialogOpen,
		setActiveConnector,
		setBbitBalance,
		bbitBalance,
		setEthBalance,
	} = useStore();
	const { useAccount, useProvider } = getConnectorHooks(activeConnector);
	const provider = useProvider();
	const account = useAccount();

	const [view, setView] = useState('list');

	const SUPPORTED_WALLETS = {
		METAMASK: {
			name: 'MetaMask',
			logo: mmLogo,
			connector: MMConnector,
		},
		WALLETCONNECT: {
			name: 'WalletConnect',
			logo: wcLogo,
			connector: WCConnector,
		},
	};

	useEffect(() => {
		if (contract !== null && account) {
			if (provider)
				provider
					.getBalance(account)
					.then((balance) => {
						setEthBalance(new BigNumber(utils.formatUnits(balance, 'ether')).toFixed(4).toString());
					})
					.catch((error) => {
						console.error(error);
					});
			contract
				.balanceOf(account)
				.then(async (balance) => {
					console.log('bbitBalance', bbitBalance);
					await setBbitBalance(convertToBiobit(balance.toNumber(), false));
					console.log('bbitBalance', bbitBalance);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [account, contract]);

	// keep track of wallet connection status after revisit
	useEffect(() => {
		if (eagerConnect)
			if (connectorStatus === STATUS.CONNECTED && forceMetamask) {
				if (activeConnectorType === 'METAMASK')
					activateConnector(MMConnector, setActiveConnector, setConnectorInProgress);
				else if (activeConnectorType === 'WALLETCONNECT') {
					activateConnector(WCConnector, setActiveConnector, setConnectorInProgress);
				}
			}
	}, [connectorStatus]);

	useEffect(() => {
		if (connectorStatus === STATUS.DISCONNECTED) {
			setDialogOpen(true);
		} else if (connectorStatus === STATUS.CONNECTED && activeConnectorType === null) {
			setDialogOpen(true);
		} else if (connectorStatus === STATUS.CONNECTED && activeConnectorType !== 'METAMASK' && forceMetamask) {
			setDialogOpen(true);
		} else if (connectorStatus === STATUS.CONNECTED && activeConnectorType !== 'NETWORK') {
			setDialogOpen(false);
		} else {
			setDialogOpen(true);
		}
	}, [connectorStatus, activeConnectorType, forceMetamask]);

	return (
		<Dialog
			isOpen={forceOpen || dialogOpen}
			title="Connect a Wallet"
			type="new"
			onClose={onClose}
			content={
				<>
					{view === 'list'
						? Object.keys(SUPPORTED_WALLETS).map((key) => {
								return (
									<WalletItem
										key={SUPPORTED_WALLETS[key].name}
										walletId={key}
										disabled={forceMetamask === true && key !== 'METAMASK'}
										view={'list'}
										logo={SUPPORTED_WALLETS[key].logo}
										name={SUPPORTED_WALLETS[key].name}
										connector={SUPPORTED_WALLETS[key].connector}
										changeView={(view) => setView(view)}
									/>
								);
						  })
						: Object.keys(SUPPORTED_WALLETS).map((key) => {
								if (key === view)
									return (
										<WalletItem
											key={SUPPORTED_WALLETS[key].name}
											walletId={key}
											view={'details'}
											changeView={(view) => setView(view)}
											logo={SUPPORTED_WALLETS[key].logo}
											name={SUPPORTED_WALLETS[key].name}
											connector={SUPPORTED_WALLETS[key].connector}
										/>
									);
								return null;
						  })}
				</>
			}
		></Dialog>
	);
};

export default WalletDialog;
