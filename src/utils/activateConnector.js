export const activateConnector = async (connector, setActiveConnector) => {
	if (!connector) return;
	await connector.activate(+process.env.REACT_APP_DEFAULT_CHAIN);
	setActiveConnector(connector);
};
