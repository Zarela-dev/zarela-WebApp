import React, { useEffect, useReducer } from 'react';
import { useWeb3React } from '@web3-react/core';
import { convertToBiobit } from '../utils';
import { actionTypes } from './actionTypes';
import { configureFallbackWeb3, getZarelaCurrentDay, getGasPrice, configureWeb3 } from './actions';
import { injectedConnector } from '../connectors';

const appInitialState = {
	error: null,

	biobitBalance: 'Hidden Info',
	etherBalance: 'Hidden Info',

	gas: {},

	fallbackWeb3Instance: null,
	contract: null,
	isMobile: null,
	guideIsOpen: null,

	zarelaCurrent: null,
};

const mainContext = React.createContext(appInitialState);

const AppProvider = ({ children }) => {
	const { library, account, active, activate } = useWeb3React();

	const [appState, dispatch] = useReducer((state, action) => {
		const { type } = action;

		switch (type) {
			case actionTypes.SET_FALLBACK_WEB3:
				return {
					...state,
					fallbackWeb3Instance: action.payload,
				};
			case actionTypes.SET_CONTRACT:
				return {
					...state,
					contract: action.payload,
				};
			case actionTypes.SET_BBIT_BALANCE:
				return {
					...state,
					biobitBalance: action.payload,
				};
			case actionTypes.SET_ZARELA_CURRENT_DAY:
				return {
					...state,
					zarelaCurrentDay: action.payload,
				};
			case actionTypes.SET_ETHER_BALANCE:
				return {
					...state,
					etherBalance: action.payload,
				};
			case actionTypes.SET_ERROR:
				return {
					...state,
					error: action.payload,
				};
			case actionTypes.SET_GAS:
				return {
					...state,
					gas: action.payload,
				};
			case actionTypes.SET_CLIENT_DEVICE:
				return {
					...state,
					isMobile: action.payload,
				};
			case actionTypes.SET_GUIDE_IS_OPEN:
				return {
					...state,
					guideIsOpen: action.payload,
				};
			default:
				return state;
		}
	}, appInitialState);

	useEffect(() => {
		getGasPrice(dispatch);
		// to detect device anywhere in the component tree
		dispatch({
			type: actionTypes.SET_CLIENT_DEVICE,
			payload: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
				? true
				: false,
		});
		// to trigger guide to open from header in each page
		dispatch({
			type: actionTypes.SET_GUIDE_IS_OPEN,
			payload: false,
		});
	}, []);

	useEffect(() => {
		// we use a fallback web3 provider to be able to fetch data regardless
		// of user's wallet connection to dApp (since @web3-react does not populate
		// library unless there's a wallet connected to dApp)
		if (library) {
			configureWeb3(dispatch, library);
		} else {
			configureFallbackWeb3(dispatch);
		}
	}, [library]);

	useEffect(() => {
		if (appState.contract) {
			getZarelaCurrentDay(dispatch, appState.contract);
		}
	}, [appState.contract]);

	useEffect(() => {
		// populate homepage sidebar values
		if (account === undefined) {
			dispatch({
				type: actionTypes.SET_BBIT_BALANCE,
				payload: appInitialState.biobitBalance,
			});
			dispatch({
				type: actionTypes.SET_ETHER_BALANCE,
				payload: appInitialState.etherBalance,
			});
		}
	}, [account]);

	useEffect(() => {
		// populate homepage sidebar values
		if (account !== undefined && appState.contract) {
			appState.contract.methods.balanceOf(account).call((error, result) => {
				if (!error) {
					dispatch({
						type: actionTypes.SET_BBIT_BALANCE,
						payload: convertToBiobit(+result),
					});
				} else {
					console.error(error.message);
				}
			});
		}
	}, [account, appState.contract]);

	useEffect(() => {
		const activeWeb3 = library || appState.fallbackWeb3Instance;
		if (activeWeb3 && appState.contract) {
			if (account)
				activeWeb3.eth
					.getBalance(account)
					.then(function (result) {
						dispatch({
							type: actionTypes.SET_ETHER_BALANCE,
							payload: Number(activeWeb3.utils.fromWei(result, 'ether')).toFixed(4),
						});
					})
					.catch((error) => {
						console.error(error.message);
					});
		}
	}, [account, library, appState.contract, appState.fallbackWeb3Instance]);

	// manually activate metamask in case it's connected
	useEffect(() => {
		if (window.ethereum?.selectedAddress && active === false) {
			activate(injectedConnector);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active, window.ethereum?.selectedAddress]);

	return (
		<mainContext.Provider
			value={{
				appState,
				dispatch,
			}}
		>
			{children}
		</mainContext.Provider>
	);
};

export { mainContext, AppProvider };
