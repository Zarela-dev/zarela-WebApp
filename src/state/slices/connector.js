import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { MMHooks } from '../../connectors/metamask';
import { WCHooks } from '../../connectors/walletConnect';
import { NetworkHooks } from '../../connectors/network';
import { Contract } from '@ethersproject/contracts';
import ZarelaABI from '../../abi/ZarelaSmartContract.json';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';

export const connectorSlice = (set, get) => ({
	contractAddress: process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS,
	contract: null,
	activeConnector: null,
	status: 'Disconnected',
	defaultHooks: {
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
	setActiveConnector: async (activeConnector) => {
		set({ activeConnector });

		if (activeConnector instanceof MetaMask) {
			const web3Provider = new Web3Provider(get().activeConnector.provider);
			const contract_rw = new Contract(get().contractAddress, ZarelaABI, web3Provider.getSigner());

			console.log('web3Provider', web3Provider);
			console.log('contract', contract_rw);

			const cats = await contract_rw.Categories(0);
			console.log('cats', cats);
			set({ contract: contract_rw });
			set({ MMHooks });
		} else if (activeConnector instanceof WalletConnect) {
			set({ WCHooks });
		} else if (activeConnector instanceof Network) {
			const provider = get().activeConnector.provider.provider;
			const readableContract = new Contract(get().contractAddress, ZarelaABI, provider);

			const cats = await readableContract.Categories(0);
			console.log('cats', cats);

			set({ contract: readableContract });
			set({ NetworkHooks });
		} else {
			console.error(new Error('Unsupported connector. Please use MetaMask, WalletConnect or Fallback Network.'));
		}
	},
	setDefaultHooks: (defaultHooks) => set({ defaultHooks }),
	setStatus: (status) => set({ status }),
});
