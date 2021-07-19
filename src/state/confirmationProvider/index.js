import React, { useEffect, useReducer, useCallback } from 'react';
import { convertToBiobit, toast } from '../../utils';
import { actionTypes } from './actionTypes';
import { setStagedFiles, initialize, setConfirmedFiles } from './actions';
import { useWeb3React } from '@web3-react/core';
import { injectedConnector } from '../../connectors';

const initialState = {
	staged: {},
	confirmed: {},
	/*
		interface contribution {
			requestID: number;
			contributions: {
				[contributorsAddress: string]: string[];
			};
		}

		interface approvedFiles {
			[txhash: string]: contribution;
		}
	*/
};

const confirmationContext = React.createContext(initialState);

const ConfirmationProvider = ({ children }) => {
	const { library, account, active, activate } = useWeb3React();

	const [confirmations, dispatch] = useReducer((state, action) => {
		const { type } = action;

		switch (type) {
			case actionTypes.SET_STAGED:
				return {
					...state,
					staged: action.payload,
				};
			case actionTypes.CONFIRM_STAGED:
				return {
					...state,
					staged: action.payload.staged,
					confirmed: action.payload.confirmed,
				};
			case actionTypes.REMOVE_STAGED:
				return {
					staged: {},
					confirmed: state.confirmed,
				};
			case actionTypes.INITIALIZE:
				return {
					...state,
					...action.payload,
				};
			default:
				return state;
		}
	}, initialState);

	const injectState = useCallback(
		(fn) => fn({ dispatch, approvedFiles: confirmations }),
		[confirmations, dispatch]
	);

	useEffect(() => {
		if (typeof localStorage !== 'undefined') {
			try {
				localStorage.setItem('feature_test', 'yes');
				if (localStorage.getItem('feature_test') === 'yes') {
					localStorage.removeItem('feature_test');

					injectState(initialize)();
					// localStorage is enabled
				} else {
					console.error('localStorage is disabled');
				}
			} catch (e) {
				console.error('localStorage is disabled', e);
			}
		} else {
			console.error('localStorage is not available');
		}
	}, []);

	useEffect(() => {
		console.log('approvedFiles from provider', confirmations);
	}, [confirmations, dispatch]);

	return (
		<confirmationContext.Provider
			value={{
				confirmations,
				setStagedFiles: injectState(setStagedFiles),
				setConfirmedFiles: injectState(setConfirmedFiles),
			}}
		>
			{children}
		</confirmationContext.Provider>
	);
};

export { confirmationContext, ConfirmationProvider };
