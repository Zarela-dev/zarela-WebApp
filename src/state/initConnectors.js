import { useEffect } from 'react';
import { useStore } from './store';
import { NetworkConnector } from '../connectors/network';
import { getConnectorHooks } from '../utils/getConnectorHooks';

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
	console.log('here', connectorInProgress, activeConnector);
	const { useError, useIsActivating, useIsActive } = getConnectorHooks(connectorInProgress || activeConnector);

	const error = useError();
	const isActivating = useIsActivating();
	const isActive = useIsActive();

	useEffect(() => {
		if (error) {
			console.log('error', error.message);
		} else {
			if (isActivating === true && isActive === false) {
				setStatus('trying to activate network provider');
			} else if (isActivating === false && isActive === false) {
				setStatus('no provider');
			} else if (isActivating === false && isActive === true) {
				setStatus('Connected');
				if (connectorInProgress !== null) setActiveConnector(connectorInProgress);
			} else {
				console.log("no idea what's happening");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isActivating, isActive, error, connectorInProgress]);

	useEffect(() => {
		let injectedProvider = window.ethereum;

		if (injectedProvider !== undefined) {
			setStatus("metamask installed trying to use it't provider");
			setContractManually(injectedProvider);
		} else if (injectedProvider === undefined) {
			setStatus('Metamask not installed, trying to connect to fallback provider');
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
