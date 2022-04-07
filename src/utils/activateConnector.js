export const activateConnector = async (connector, setActiveConnector, setConnectorInProgress) => {
	if (!connector) throw new Error(`can not activate ${connector} connector`);
	await setConnectorInProgress(connector);
	await connector.activate(+process.env.REACT_APP_DEFAULT_CHAIN);
	await setActiveConnector(connector);
};
