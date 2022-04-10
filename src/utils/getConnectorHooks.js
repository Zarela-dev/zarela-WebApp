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
		hooks = MMHooks;
	}
	return hooks;
};
