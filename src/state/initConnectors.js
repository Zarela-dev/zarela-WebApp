import { useEffect } from 'react';
import { useStore } from './store';
import { NetworkConnector } from '../connectors/network';
import { getConnectorHooks } from '../utils/getConnectorHooks';
import { STATUS } from './slices/connectorSlice';

const useInitConnectors = () => {
	const {
		setStatus,
		connectorStatus: status,
		setActiveConnector,
		setConnectorInProgress,
		activeConnector,
		setContractManually,
		connectorInProgress,
		setIsMobile,
		setCreateRequestFormData,
	} = useStore();

	const DEFAULT_CHAIN_ID = 3;
	const { useError, useIsActivating, useIsActive } = getConnectorHooks(connectorInProgress || activeConnector);

	const error = useError();
	const isActivating = useIsActivating();
	const isActive = useIsActive();

	// useEffect(() => {
	// 	connectorInProgress && connectorInProgress.activate(DEFAULT_CHAIN_ID);
	// }, [connectorInProgress]);

	useEffect(() => {
		if (error) {
			console.log('error', error.message);
			setStatus(STATUS.FAILED);
		} else {
			if (isActivating === true && isActive === false) {
				setStatus(STATUS.INIT_CONNECTOR);
			} else if (isActivating === false && isActive === false) {
				setStatus(STATUS.DISCONNECTED);
			} else if (isActivating === false && isActive === true) {
				setStatus(STATUS.CONNECTED);
				if (connectorInProgress !== null) setActiveConnector(connectorInProgress);
			} else {
				setStatus(STATUS.FAILED);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isActivating, isActive, error, connectorInProgress]);

	useEffect(() => {
		let injectedProvider = window.ethereum;

		if (injectedProvider !== undefined) {
			setStatus(STATUS.INIT_CONNECTOR, "metamask installed trying to use it's provider");
			setContractManually(injectedProvider);
			setStatus(STATUS.CONNECTED);
			injectedProvider.removeListener('chainChanged', setContractManually);
			// to make sure that the setup happens again after chain changes
			injectedProvider.on('chainChanged', (chainId) => {
				window.location.reload();
			});
		} else if (injectedProvider === undefined) {
			setStatus(STATUS.INIT_CONNECTOR, 'Metamask not installed, trying to connect to fallback provider');
			setConnectorInProgress(NetworkConnector);
			NetworkConnector.activate(DEFAULT_CHAIN_ID);
		} else {
			console.log("no idea what's happening");
		}
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

	useEffect(() => {
		console.log('status: --->', status, isActivating, isActive, connectorInProgress);
	}, [status, isActivating, isActive, connectorInProgress]);
};

export default useInitConnectors;
