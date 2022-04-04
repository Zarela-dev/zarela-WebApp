import { useEffect } from 'react';
import { useStore } from './store';
import { NetworkConnector } from '../connectors/network';
import { getConnectorHooks } from '../utils/getConnectorHooks';
import { STATUS } from './slices/connectorSlice';

const useInitConnectors = () => {
	const {
		setStatus,
		setActiveConnector,
		connectorStatus,
		setConnectorInProgress,
		activeConnector,
		setContractManually,
		activeConnectorType,
		connectorInProgress,
		setIsMobile,
		setCreateRequestFormData,
	} = useStore();

	const { useError, useIsActivating, useIsActive } = getConnectorHooks(connectorInProgress || activeConnector);

	const error = useError();
	const isActivating = useIsActivating();
	const isActive = useIsActive();

	useEffect(() => {
		console.log('status', isActivating, isActive, connectorStatus, activeConnectorType);
		const bootstrap = async () => {
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
					if (connectorInProgress !== null) {
						setStatus(STATUS.INIT_CONNECTOR, "metamask installed trying to use it's provider");
						try {
							await setActiveConnector(connectorInProgress);
							setStatus(STATUS.CONNECTED);
						} catch (error) {
							setStatus(STATUS.FAILED, "user denied or something");
						}
					}
				} else {
					setStatus(STATUS.FAILED);
				}
			}
		};
		bootstrap();
	}, [isActivating, isActive, error, connectorInProgress, connectorStatus]);

	useEffect(() => {
		let injectedProvider = window.ethereum;

		if (injectedProvider !== undefined) {
			setContractManually(injectedProvider);
			injectedProvider.removeListener('chainChanged', setContractManually);

			// to make sure that the setup happens again after chain changes
			injectedProvider.on('chainChanged', (chainId) => {
				window.location.reload();
			});
		} else if (injectedProvider === undefined) {
			setStatus(STATUS.INIT_CONNECTOR, 'Metamask not installed, trying to connect to fallback provider');
			setConnectorInProgress(NetworkConnector);
			try {
				NetworkConnector.activate(+process.env.REACT_APP_DEFAULT_CHAIN);
			} catch (error) {
				setStatus(STATUS.FAILED, 'could not connect to fallback nNetwork provider');
				console.error(error.message);
			}
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
};

export default useInitConnectors;
