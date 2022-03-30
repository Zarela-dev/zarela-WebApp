import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { MMConnector } from '../../connectors/metamask';
import { Contract } from '@ethersproject/contracts';
import ZarelaABI from '../../abi/ZarelaSmartContract.json';
import { Web3Provider } from '@ethersproject/providers';
import { getConnectorHooks } from '../../utils/getConnectorHooks';
import { CHAINS } from '../../connectors/chains';
import { ZARELA_CONTRACT_ADDRESS } from '../smartContractConstants';

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

export const STATUS = {
	DISCONNECTED: 'DISCONNECTED',
	NO_INJECTED_PROVIDER: 'NO_INJECTED_PROVIDER',
	INJECTED_PROVIDER_FOUND: 'INJECTED_PROVIDER_FOUND',
	INIT_CONNECTOR: 'INIT_CONNECTOR',
	FAILED: 'FAILED',
	CONNECTED: 'CONNECTED',
};

const STATUS_VERBOSE = {
	DISCONNECTED: 'Disconnected',
	NO_INJECTED_PROVIDER: 'No injected provider found.',
	INJECTED_PROVIDER_FOUND: 'Injected provider detected',
	INIT_CONNECTOR: 'Initializing ...',
	FAILED: 'Failed to connect',
	CONNECTED: 'Connected',
};

export const connectorSlice = (set, get) => ({
	contractAddress: null,
	contract: null,
	contractPermission: 'r', // r: read, wr: write and read

	isOpen: null,
	account: null,

	activeConnector: null,
	connectorInProgress: MMConnector,
	connectorStatus: 'Disconnected',
	verboseConnectorStatus: null,
	connectorHooks: {
		useChainId: null,
		useAccounts: null,
		useProvider: null,
		useAccount: null,
		useError: null,
		useIsActivating: null,
		useIsActive: null,
		useWeb3React: null,
		useEnsName: null,
		useENSNames: null,
	},
	setContract: (contract) => set({ contract }),
	setContractManually: async function (provider) {
		// make sure user is on the right network
		const currentChainId = await provider.request({ method: 'eth_chainId' });

		try {
			if (Object.keys(CHAINS).findIndex((key) => +key === parseInt(currentChainId, 16)) === -1) {
				await provider.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: '0x' + Number(3).toString(16) }],
				});
			}
		} catch (error) {
			console.error(error.message);
		}

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
			let currentContract = ZARELA_CONTRACT_ADDRESS[parseInt(currentChainId, 16)];

			contract_r = new Contract(currentContract, ZarelaABI, web3Provider);
			set({ contract: contract_r, contractPermission: 'r', contractAddress: currentContract });
		} catch (error) {
			console.error(new Error('Error setting contract:'), error);
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
	setConnectorInProgress: (connector) => set({ connectorInProgress: connector }),
	setStatus: (connectorStatus, verboseMessage = null) =>
		set({ connectorStatus, verboseConnectorStatus: verboseMessage || STATUS_VERBOSE[connectorStatus] }),
});
