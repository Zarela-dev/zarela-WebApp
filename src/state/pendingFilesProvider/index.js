import React, { useEffect, useState, useReducer, useCallback, useContext } from 'react';
import { convertToBiobit, toast } from '../../utils';
import { actionTypes } from './actionTypes';
import { setPendingFile, initialize, removePendingFile } from './actions';
import { useDeepCompareEffect } from 'use-deep-compare';
import { useWeb3React } from '@web3-react/core';
import { lockerKey } from './lockrKey';
import { mainContext } from '../../state';
import * as lockr from 'lockr';

const initialState = {
	pending: {},
	/*
		interface contribution {
			requestID: number;
			contributions: {
				[contributorsAddress: string]: string[];
			};
		}

		interface approvedFiles {
			[txhash: string]: {
				requestNo: Number,
				originalIndex: Number,
			};
		}
	*/
};

const pendingFilesContext = React.createContext(initialState);

const PendingFilesProvider = ({ children }) => {
	const { library, account, active, activate } = useWeb3React();
	const { appState } = useContext(mainContext);
	const [readyForUpdate, setReadyForUpdate] = useState(false);

	const [pendingFiles, dispatch] = useReducer((state, action) => {
		const { type } = action;

		switch (type) {
			case actionTypes.SET_PENDING_FILE:
				return {
					...state,
					pending: {
						...state.pending,
						...action.payload,
					},
				};
			case actionTypes.REMOVE_PENDING_FILE:
				return {
					...state,
					pending: {
						...action.payload,
					},
				};
			case actionTypes.INITIALIZE:
				return {
					...state,
					pending: {
						...action.payload,
					},
				};
			default:
				return state;
		}
	}, initialState);

	const injectState = useCallback((fn) => fn({ dispatch, pendingFiles }), [pendingFiles, dispatch]);

	useDeepCompareEffect(() => {
		console.log('readyForUpdate', readyForUpdate);
		if (readyForUpdate) lockr.set(lockerKey, pendingFiles);
	}, [pendingFiles, readyForUpdate]);

	useEffect(() => {
		if (typeof localStorage !== 'undefined') {
			try {
				localStorage.setItem('feature_test', 'yes');
				if (localStorage.getItem('feature_test') === 'yes') {
					localStorage.removeItem('feature_test');

					injectState(initialize)();
					setReadyForUpdate(true);

					// localStorage is enabled
				} else {
					toast('this browser does not support localstorage, some features may not work properly!', 'error');
					console.error('localStorage is disabled');
				}
			} catch (e) {
				toast('this browser does not support localstorage, some features may not work properly!', 'error');
				console.error('localStorage is disabled', e);
			}
		} else {
			toast('this browser does not support localstorage, some features may not work properly!', 'error');
			console.error('localStorage is not available');
		}
	}, []);

	useEffect(() => {
		console.log('contract', appState.contract);
		if (appState.contract)
			appState.contract.events.signalsApproved({}).on('data', ({ transactionHash }) => {
				console.log('from there', transactionHash);
				injectState(removePendingFile)(transactionHash);
			});
	}, [appState.contract, injectState]);

	return (
		<pendingFilesContext.Provider
			value={{
				pendingFiles,
				setPendingFile: injectState(setPendingFile),
				removePendingFile: injectState(removePendingFile),
			}}
		>
			{children}
		</pendingFilesContext.Provider>
	);
};

export { pendingFilesContext, PendingFilesProvider };
