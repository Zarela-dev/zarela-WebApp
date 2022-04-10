import React from 'react';

const appInitialState = {
	error: null,

	biobitBalance: 'Hidden Info',
	etherBalance: 'Hidden Info',

	gas: {},
	ethPrice: null,

	fallbackWeb3Instance: null,
	contract: null,
	isMobile: null,
	isMobileSearchModalShow: null,
	guideIsOpen: null,
	notificationCount: null,

	zarelaCurrent: null,
};

const mainContext = React.createContext(appInitialState);

const AppProvider = ({ children }) => {
	// const { library, account, active, activate } = useWeb3React();

	return <mainContext.Provider value={{}}>{children}</mainContext.Provider>;
};

export { mainContext, AppProvider };
