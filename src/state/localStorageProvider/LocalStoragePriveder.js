import React, { useReducer, useEffect } from 'react';
import { actionTypes } from './actionTypes';
import * as lockr from 'lockr';
import _ from 'lodash';
import { useDeepCompareEffect } from 'use-deep-compare';

const appInitialState = {
	contacts: {},
	blockList: [],
	hideList: {},
};

const localStorageContext = React.createContext(appInitialState);

const LocalStorageProvider = ({ children }) => {
	const [localState, dispatch] = useReducer((state, action) => {
		const { type } = action;
		switch (type) {
			case actionTypes.SET_LOCALSTATE:
				return action.payload;

			case actionTypes.ADD_CONTACT: {
				const { publicKey, alias } = action.payload;
				return {
					...state,
					contacts: {
						...state.contacts,
						[publicKey]: alias,
					},
				};
			}
			case actionTypes.REMOVE_CONTACT: {
				const { publicKey } = action.payload;
				let contacts = _.omit(state.contacts, publicKey);
				return {
					...state,
					contacts,
				};
			}

			case actionTypes.BLOCK_ADDRESS: {
				const { publicKey } = action.payload;
				return {
					...state,
					blockList: [...state.blockList, publicKey],
				};
			}

			case actionTypes.UNBLOCK_ADDRESS: {
				const { publicKey } = action.payload;

				let blockList = state.blockList.filter((item) => item !== publicKey);
				return {
					...state,
					blockList,
				};
			}

			case actionTypes.HIDE_ADDRESS: {
				const { publicKey, requestId } = action.payload;
				const requestIdSet = new Set(
					state.hideList[publicKey] ? [...state.hideList[publicKey], requestId] : [requestId]
				);
				return {
					...state,
					hideList: {
						...state.hideList,
						[publicKey]: [...requestIdSet],
					},
				};
			}

			case actionTypes.UNHIDE_ADDRESS: {
				const { publicKey, requestId } = action.payload;
				let hideList = state.hideList[publicKey].filter((item) => item !== requestId);
				return {
					...state,
					hideList: {
						...state.hideList,
						[publicKey]: [...hideList],
					},
				};
			}
			default:
				return state;
		}
	}, appInitialState);

	useDeepCompareEffect(() => {
		if (!_.isEmpty(localState)) lockr.set('contacts_list', localState);
		else lockr.flush('contacts_list');
	}, [localState]);

	useEffect(() => {
		let localStorageData = lockr.get('contacts_list');
		dispatch({
			type: actionTypes.SET_LOCALSTATE,
			payload: localStorageData,
		});
	}, []);

	return (
		<localStorageContext.Provider
			value={{
				localState,
				dispatch,
			}}
		>
			{children}
		</localStorageContext.Provider>
	);
};

export { localStorageContext, LocalStorageProvider };
