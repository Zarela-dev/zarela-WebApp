import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { MMConnector } from '../../connectors/metamask';
import { Contract } from '@ethersproject/contracts';
import ZarelaABI from '../../abi/ZarelaSmartContract.json';
import { Web3Provider } from '@ethersproject/providers';
import { getConnectorHooks } from '../../utils/getConnectorHooks';

export const getActiveConnector = (state) => {
	const activeConnector = state.activeConnector;
	if (activeConnector instanceof MetaMask) {
		return 'Metamask';
	} else if (activeConnector instanceof WalletConnect) {
		return 'WalletConnect';
	} else if (activeConnector instanceof Network) {
		return 'Network';
	} else {
		return null;
	}
};

const STATUS = {
	DISCONNECTED: 'Disconnected',
	NO_INJECTED_PROVIDER: 'No injected provider found.',
	INJECTED_PROVIDER_FOUND: 'Injected provider detected',
	INIT_CONNECTOR: 'Initializing ...',
	FAILED: 'Failed to connect',
	CONNECTED: 'Connected',
}

export const connectorSlice = (set, get) => ({
	contractAddress: process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS,
	contract: null,
	contractPermission: 'r', // r: read, wr: write and read

	isOpen: null,
	walletAddress: null,

	activeConnector: null,
	connectorInProgress: MMConnector,
	connectorStatus: 'Disconnected',
	verboseConnectorStatus: null,
	connectorHooks: {
		useChainId: null,
		useAccounts: null,
		useAccount: null,
		useError: null,
		useIsActivating: null,
		useIsActive: null,
		useWeb3React: null,
		useEnsName: null,
		useENSNames: null,
	},
	setContract: (contract) => set({ contract }),
	setContractManually: async (provider) => {
		// provider.
		let web3Provider = null,
			contract_r = null;
		try {
			web3Provider = new Web3Provider(provider);
			console.log('web3 provider', web3Provider.getSigner());
		} catch (error) {
			console.error(
				new Error('Error setting web3 provider. most likely, your wallet is not yet supported by this app'),
				error
			);
		}

		try {
			contract_r = new Contract(get().contractAddress, ZarelaABI, web3Provider.getSigner());
			set({ contract: contract_r, contractPermission: 'r' });
		} catch (error) {
			console.error(new Error('Error setting contract:'), error);
		}

		console.log('web3Provider', web3Provider);
		console.log('web3Provider signer', web3Provider.getSigner());

		console.log('contract', contract_r);

		try {
			const cats = await contract_r.contribute(
				'95',
				'0x55C24f8dB90f738f1E48acecf702f3a6e640c1Df', // angel
				'0x55C24f8dB90f738f1E48acecf702f3a6e640c1Df', // laboratory
				'angel',
				'0x78Dfded703574fa6Dc8c704C86395Fb617219043',
				'ipfs', // encrypted file CID
				'ipfs' // file metadata CID
			);

			console.log('cats', cats);
		} catch (error) {
			console.log(new Error('error calling read-only contract methods'), error);
		}
	},
	setActiveConnector: async (activeConnector) => {
		set({ activeConnector, connectorInProgress: null });
		set({ connectorHooks: getConnectorHooks(activeConnector) });

		if (activeConnector instanceof MetaMask) {
			const web3Provider = new Web3Provider(get().activeConnector.provider);
			const contract_rw = new Contract(get().contractAddress, ZarelaABI, web3Provider.getSigner());
			set({ contract: contract_rw, contractPermission: 'wr' });

			console.log('web3Provider', web3Provider);
			console.log('contract', contract_rw);
			console.log('web3Provider signer', web3Provider.getSigner());

			// const cats = await contract_rw.Categories(0);
			const cats = await contract_rw.contribute(
				'95',
				'0x55C24f8dB90f738f1E48acecf702f3a6e640c1Df', // angel
				'0x55C24f8dB90f738f1E48acecf702f3a6e640c1Df', // laboratory
				'angel',
				'0x78Dfded703574fa6Dc8c704C86395Fb617219043',
				'ipfs', // encrypted file CID
				'ipfs' // file metadata CID
			);

			console.log('cats', cats);
		} else if (activeConnector instanceof WalletConnect) {
		} else if (activeConnector instanceof Network) {
			const provider = get().activeConnector.provider.provider;
			const readableContract = new Contract(get().contractAddress, ZarelaABI, provider);

			const cats = await readableContract.Categories(0);
			console.log('cats', cats);

			set({ contract: readableContract });
		} else if (activeConnector === null) {
			console.log('no Connector detected');
		} else {
			console.error(new Error('Unsupported connector. Please use MetaMask, WalletConnect or Fallback Network.'));
		}
	},
	setConnectorInProgress: (connectorInProgress) => set({ connectorInProgress }),
	setStatus: (connectorStatus, verboseMessage = null) =>
		set({ connectorStatus, verboseConnectorStatus: verboseMessage }),
});
