import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { MMHooks } from '../connectors/metamask';
import { NetworkHooks } from '../connectors/network';
import { WCHooks } from '../connectors/walletConnect';

export const getConnectorHooks = (connector) => {
	if (connector === null || connector === undefined) {
		console.error('can not get connector hooks for null or undefined connector');
		return {};
	}
	if (connector instanceof MetaMask) return MMHooks;
	if (connector instanceof WalletConnect) return WCHooks;
	if (connector instanceof Network) return NetworkHooks;
	throw new Error('unsupported connector');
};
