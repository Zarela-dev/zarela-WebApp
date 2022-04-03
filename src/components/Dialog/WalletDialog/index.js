import { useState } from 'react';
import WalletItem from './WalletItem';
import Dialog from '../index';
import { useStore } from '../../../state/store';
import mmLogo from '../../../assets/icons/wallets/metamask.svg';
import wcLogo from '../../../assets/icons/wallets/walletConnect.svg';
import { MMConnector } from '../../../connectors/metamask';
import { WCConnector } from '../../../connectors/walletConnect';

const WalletDialog = () => {
	const { account, activeConnector, connectorHooks, connectorStatus } = useStore();
	const [view, setView] = useState('list');

	const [isOpen, setOpen] = useState(true);

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

	return (
		<Dialog
			isOpen={isOpen}
			onClose={() => setOpen(false)}
			title="Connect a Wallet"
			type="new"
			content={
				<>
					{view === 'list'
						? Object.keys(SUPPORTED_WALLETS).map((key) => (
								<WalletItem
									key={SUPPORTED_WALLETS[key].name}
									walletId={key}
									view={'list'}
									logo={SUPPORTED_WALLETS[key].logo}
									name={SUPPORTED_WALLETS[key].name}
									connector={SUPPORTED_WALLETS[key].connector}
									changeView={(view) => setView(view)}
								/>
						  ))
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
