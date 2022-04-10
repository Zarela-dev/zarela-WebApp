import { useEffect } from 'react';
import { useStore } from './store';
import { NetworkConnector } from '../connectors/network';
import { getConnectorHooks } from '../utils/getConnectorHooks';
import ZarelaABI from '../abi/ZarelaSmartContract.json';
import { Web3Provider } from '@ethersproject/providers';
import { CHAINS } from '../connectors/chains';
import { ZARELA_CONTRACT_ADDRESS } from './smartContractConstants';
import { Contract } from '@ethersproject/contracts';
import { STATUS } from './slices/connectorSlice';
import { Network } from '@web3-react/network';
import { toast } from '../utils';
import { activateConnector } from '../utils/activateConnector';

const useInitConnectors = () => {
	const {
		setStatus,
		setActiveConnector,
		connectorStatus,
		setConnectorInProgress,
		activeConnector,
		setContract,
		activeConnectorType,
		connectorInProgress,
		setIsMobile,
		setCreateRequestFormData,
	} = useStore();

	const { useError, useIsActivating, useIsActive } = getConnectorHooks(connectorInProgress || activeConnector);

	const error = useError();
	const isActivating = useIsActivating();
	const isActive = useIsActive();

	const setUpContract = async (provider, store, permission) => {
		if (provider !== undefined) {
			let currentChainId;

			// provider
			let web3Provider = null,
				contract = null;
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
				let signerOrProvider = permission === 'wr' ? web3Provider.getSigner() : web3Provider;

				contract = new Contract(currentContract, ZarelaABI, signerOrProvider);
				store.setContract(contract, permission);
			} catch (error) {
				console.error(new Error('Error setting contract:'), error);
			}
		} else {
			console.error('provider is undefined, can not setup contract');
		}
	};

	useEffect(() => {
		console.log('status', isActivating, isActive, connectorStatus, activeConnectorType);
		const bootstrapConnector = async () => {
			if (error) {
				console.log('error', error.message);
				await setStatus(STATUS.FAILED);
			} else {
				if (isActivating === true && isActive === false) {
					await setStatus(STATUS.INIT_CONNECTOR);
				} else if (isActivating === false && isActive === false) {
					await setStatus(STATUS.DISCONNECTED);
				} else if (isActivating === false && isActive === true) {
					await setStatus(STATUS.CONNECTED);
				} else {
					await setStatus(STATUS.FAILED);
				}
			}
		};
		bootstrapConnector();
	}, [isActivating, isActive, error, connectorStatus]);

	useEffect(() => {
		if (connectorStatus === STATUS.CONNECTED && activeConnector) {
			try {
				let permission = activeConnector instanceof Network ? 'r' : 'wr';
				setUpContract(activeConnector.provider, { setContract }, permission);
			} catch (error) {
				console.log('failed to setup contract', error)
			}
		}
	}, [connectorStatus]);

	useEffect(() => {
		const bootstrapWithInjected = async () => {
			let injectedProvider = window.ethereum;

			if (injectedProvider !== undefined) {
				await setUpContract(injectedProvider, { setContract }, 'r');

				injectedProvider.removeListener('chainChanged', (chainId) => {
					window.location.reload();
				});
				// to make sure that the setup happens again after chain changes
				injectedProvider.on('chainChanged', (chainId) => {
					window.location.reload();
				});
			} else if (injectedProvider === undefined) {
				setStatus(STATUS.INIT_CONNECTOR, 'Metamask not installed, trying to connect to fallback provider');
				try {
					activateConnector(NetworkConnector, setActiveConnector, setConnectorInProgress);
				} catch (error) {
					setStatus(STATUS.FAILED, 'could not connect to fallback nNetwork provider');
					console.error(error.message);
				}
			} else {
				console.log("no idea what's happening");
			}
		};
		bootstrapWithInjected();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (localStorage.getItem('create_request_values')) {
			setCreateRequestFormData(JSON.parse(localStorage.getItem('create_request_values')));
		}

		setIsMobile(
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false
		);
	}, []);
};

export default useInitConnectors;
