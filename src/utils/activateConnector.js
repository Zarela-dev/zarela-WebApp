export const activateConnector = async (connector, setActiveConnector) => {
	if (!connector) throw new Error(`can not activate ${connector} connector`);
	await connector.activate(+process.env.REACT_APP_DEFAULT_CHAIN);
	await setActiveConnector(connector);
};
