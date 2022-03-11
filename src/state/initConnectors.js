import { useEffect } from 'react';
import { useStore } from './store';
import { toast } from '../utils';
import { NetworkConnector, NetworkHooks } from '../connectors/network';

const useInitConnectors = () => {
	const { setStatus, status, setActiveConnector } = useStore((state) => ({
		setStatus: state.setStatus,
		status: state.status,
		setActiveConnector: state.setActiveConnector,
	}));

	const { useChainId, useError, useIsActivating, useIsActive } = NetworkHooks;

	const chainID = useChainId();
	const error = useError();
	const isActivating = useIsActivating();
	const isActive = useIsActive();

	useEffect(() => {
		NetworkConnector.activate(3);
	}, []);

	useEffect(() => {
		if (error) {
			console.log('error', error);
		} else {
			if (isActivating === true && isActive === false && NetworkConnector.provider !== undefined) {
				setStatus('you have provider but not connected');
				// setActiveConnector(NetworkConnector);
			} else if (isActivating === true && isActive === false && NetworkConnector.provider === undefined) {
				setStatus('Connecting...');
			} else if (isActivating === false && isActive === false && NetworkConnector.provider !== undefined) {
				setStatus('fallback provider detected');
				// setActiveConnector(NetworkConnector);
			} else if (isActivating === false && isActive === false) {
				setStatus('no provider');
			} else if (isActivating === false && isActive === true) {
				setStatus('Connected');
				setActiveConnector(NetworkConnector);
			} else {
				console.log("no idea what's happening");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isActivating, isActive, error, chainID, NetworkConnector]);
	console.log(isActivating, isActive, NetworkConnector.provider);
};

export default useInitConnectors;
