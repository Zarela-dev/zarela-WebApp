import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { MMHooks } from '../connectors/metamask';
import { NetworkHooks } from '../connectors/network';
import { WCHooks } from '../connectors/walletConnect';

export const getConnectorHooks = (connector) => {
	let hooks = MMHooks;
	if (connector instanceof MetaMask) {
		hooks = MMHooks;
	} else if (connector instanceof WalletConnect) {
		hooks = WCHooks;
	} else if (connector instanceof Network) {
		hooks = NetworkHooks;
	} else {
		console.warn(`can not get connector hooks for "${connector}" connector, using MetaMask hooks instead`);
		hooks = MMHooks;
	}
	return hooks;
};
