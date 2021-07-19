import { actionTypes } from './actionTypes';
import lockr from 'lockr';
import { localStorageKeys as ls_keys } from './localStorageKeys';

export const setStagedFiles =
	({ dispatch }) =>
	({ requestID, txhash, contributions }) => {
		let payload = {};

		payload[txhash] = {
			requestID,
			contributions,
		};

		dispatch({
			type: actionTypes.SET_STAGED,
			payload,
		});

		lockr.set(ls_keys.stagedFiles, payload);
	};

export const removeStaged =
	({ dispatch }) =>
	(txhash) => {
		dispatch({
			type: actionTypes.REMOVE_STAGED,
			payload: txhash,
		});
		lockr.rm(ls_keys.stagedFiles);
	};

export const setConfirmedFiles =
	({ dispatch, approvedFiles }) =>
	(txhash) => {
		let modifiedStage = approvedFiles.staged;
		delete modifiedStage[txhash];

		let localStage = lockr.get(ls_keys.stagedFiles) || {};
		let localConfirmed = lockr.get(ls_keys.confirmedFiles) || {};

		let confirmedPayload = {
			...localConfirmed,
		};

		if (localConfirmed[txhash] === undefined) {
			confirmedPayload[txhash] = localStage[txhash];

			dispatch({
				type: actionTypes.CONFIRM_STAGED,
				payload: {
					confirmed: confirmedPayload,
					staged: modifiedStage,
				},
			});
			lockr.set(ls_keys.confirmedFiles, confirmedPayload);
			removeStaged({dispatch})(txhash);
		}
	};

export const initialize =
	({ dispatch }) =>
	async () => {
		const confirmedFiles = lockr.get(ls_keys.confirmedFiles);
		const stagedFiles = lockr.get(ls_keys.stagedFiles);

		/* 
		check to see if staged files are confirmed by investigating the txhash on 
		etherscan or such, then if it is ok move the files to approved section, if not
		then clear staged
	*/
		dispatch({
			type: actionTypes.INITIALIZE,
			payload: {
				confirmed: confirmedFiles || {},
				staged: stagedFiles || {},
			},
		});
	};
