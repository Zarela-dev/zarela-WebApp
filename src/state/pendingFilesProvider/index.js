import React, { useEffect, useState, useReducer, useCallback } from 'react';
import { toast } from '../../utils';
import { actionTypes } from './actionTypes';
import { setPendingFile, initialize, removePendingFile } from './actions';
import { useDeepCompareEffect } from 'use-deep-compare';
import { lockerKey } from './lockrKey';
import * as lockr from 'lockr';
import { useStore } from '../store';

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
	const [readyForUpdate, setReadyForUpdate] = useState(false);
	const { contract } = useStore();

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
			case actionTypes.UPDATE_PENDING_FILE:
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
		if (contract)
			contract.on('signalsApproved', ({ transactionHash }) => {
				injectState(removePendingFile)(transactionHash);
			});
	}, [contract, injectState]);

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
