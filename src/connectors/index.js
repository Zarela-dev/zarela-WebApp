import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { supportedChains } from '../constants';

export const injectedConnector = new InjectedConnector({
	supportedChainIds: [supportedChains.ROPSTEN]
});

export const walletConnectConnector = new WalletConnectConnector({
	supportedChainIds: [supportedChains.ROPSTEN],
	qrcode: true,
	infuraId: process.env.REACT_APP_INFURA_ID
});