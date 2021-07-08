import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { supportedChains } from '../constants';

export const injectedConnector = new InjectedConnector({
	supportedChainIds: [supportedChains.KOVAN]
});

export const walletConnectConnector = new WalletConnectConnector({
	supportedChainIds: [supportedChains.KOVAN],
	qrcode: true,
	infuraId: process.env.REACT_APP_INFURA_ID
});