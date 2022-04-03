import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';

export const detectWallet = (connector) => {
	if (connector === null) return null;
	if (connector instanceof MetaMask) {
		return 'METAMASK';
	} else if (connector instanceof WalletConnect) {
		return 'WALLETCONNECT';
	} else if (connector instanceof Network) {
		return 'NETWORK';
	} else {
		console.error(
			new Error('Provided Connector is not supported. Please use MetaMask, WalletConnect or Network connectors.')
		);
		return 'unknown';
	}
};
