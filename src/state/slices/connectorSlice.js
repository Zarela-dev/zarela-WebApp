import { MMConnector } from '../../connectors/metamask';
import { Contract } from '@ethersproject/contracts';
import ZarelaABI from '../../abi/ZarelaSmartContract.json';
import { Web3Provider } from '@ethersproject/providers';
import { CHAINS } from '../../connectors/chains';
import { ZARELA_CONTRACT_ADDRESS } from '../smartContractConstants';
import { detectWallet } from '../../utils/detectWallet';

const setUpContract = async (provider, set) => {
	if (provider !== undefined) {
		let currentChainId;

		// provider
		let web3Provider = null,
			contract_r = null;
		try {
			web3Provider = new Web3Provider(provider);
		} catch (error) {
			console.error(error.message);
		}

		try {
			currentChainId = (await web3Provider.getNetwork()).chainId;
		} catch (error) {
			throw new Error(error.message);
		}

		// handle disconnect event
		try {
			if (Object.keys(CHAINS).findIndex((key) => +key === currentChainId) === -1) {
				await provider.on('disconnect', async (code, reason) => {
					console.error(`Disconnected from provider: ${code} - ${reason}`);
				});
			}
		} catch (error) {
			console.error(error.message);
		}

		// make sure user is on the right network
		try {
			if (Object.keys(CHAINS).findIndex((key) => +key === currentChainId) === -1) {
				await provider.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: '0x' + Number(3).toString(16) }],
				});
			}
		} catch (error) {
			console.error(error.message);
		}

		try {
			let currentContract = ZARELA_CONTRACT_ADDRESS[currentChainId];
			contract_r = new Contract(currentContract, ZarelaABI, web3Provider);
			set({ contract: contract_r, contractPermission: 'r' });
		} catch (error) {
			console.error(new Error('Error setting contract:'), error);
		}
	} else {
		console.error('provider is undefined, can not setup contract');
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
	contract: null,
	contractPermission: 'r', // r: read, wr: write and read

	dialogOpen: false,
	account: null,

	activeConnector: null,
	activeConnectorType: null,
	connectorInProgress: MMConnector,
	connectorStatus: 'Disconnected',
	verboseConnectorStatus: null,
	setContract: (contract) => set({ contract }),
	setDialogOpen: (dialogOpen) => set({ dialogOpen }),
	setContractManually: (provider) => {
		setUpContract(provider, set);
	},
	setActiveConnector: async (activeConnector) => {
		await setUpContract(activeConnector.provider, set);
		set({ activeConnector, connectorInProgress: null, activeConnectorType: detectWallet(activeConnector) });
	},
	setConnectorInProgress: (connector) => set({ connectorInProgress: connector }),
	setStatus: (connectorStatus, verboseMessage = null) =>
		set({ connectorStatus, verboseConnectorStatus: verboseMessage || STATUS_VERBOSE[connectorStatus] }),
});
