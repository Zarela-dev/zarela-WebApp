import { MMConnector } from '../../connectors/metamask';
import { detectWallet } from '../../utils/detectWallet';

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

	activeConnector: null,
	activeConnectorType: null,
	connectorInProgress: MMConnector,
	connectorStatus: STATUS.DISCONNECTED,
	verboseConnectorStatus: null,
	setContract: (contract, permission) => set({ contract, contractPermission: permission }),
	setActiveConnectorType: (activeConnectorType) => set({ activeConnectorType }),
	setDialogOpen: (dialogOpen) => set({ dialogOpen }),
	setActiveConnector: async (activeConnector) => {
		set({ activeConnector, connectorInProgress: null, activeConnectorType: detectWallet(activeConnector) });
	},
	setConnectorInProgress: (connector) => set({ connectorInProgress: connector }),
	setStatus: (connectorStatus, verboseMessage = null) =>
		set({ connectorStatus, verboseConnectorStatus: verboseMessage || STATUS_VERBOSE[connectorStatus] }),
});
