import { useEffect } from 'react';
import { useStore } from './store';
import { NetworkConnector } from '../connectors/network';
import { getConnectorHooks } from '../utils/getConnectorHooks';

const useInitConnectors = () => {
	const {
		setStatus,
		status,
		setActiveConnector,
		setConnectorInProgress,
		activeConnector,
		setContractManually,
		connectorInProgress,
	} = useStore((state) => ({
		setStatus: state.setStatus,
		status: state.status,
		activeConnector: state.activeConnector,
		setActiveConnector: state.setActiveConnector,
		connectorInProgress: state.connectorInProgress,
		setConnectorInProgress: state.setConnectorInProgress,
		setContractManually: state.setContractManually,
	}));

	const DEFAULT_CHAIN_ID = 3;
	const { useError, useIsActivating, useIsActive } = getConnectorHooks(connectorInProgress);

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
	}, [isActivating, isActive, error]);

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
		console.log('status: --->', status, isActivating, isActive);
	}, [status, isActivating, isActive]);
};

export default useInitConnectors;
