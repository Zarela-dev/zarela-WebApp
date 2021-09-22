import { actionTypes } from './actionTypes';
import * as lockr from 'lockr';
import { normalizeAddress } from '../../utils';
import { lockerKey } from './lockrKey';

export const setPendingFile =
	({ dispatch }) =>
	({ txHash, requestID, originalIndexes }) => {
		let payload = {};

		payload[txHash] = {
			requestID,
			originalIndexes,
		};

		dispatch({
			type: actionTypes.SET_PENDING_FILE,
			payload,
		});
	};

export const removePendingFile =
	({ dispatch, pendingFiles }) =>
	(txHash) => {
		let payload = {
			...pendingFiles.pending,
		};

		Object.keys(payload).forEach((item) => {
			if (normalizeAddress(item) === normalizeAddress(txHash)) {
				delete payload[item];
			}
		});

		dispatch({
			type: actionTypes.REMOVE_PENDING_FILE,
			payload,
		});
	};

export const initialize =
	({ dispatch }) =>
	async () => {
		const pendingFilesLocal = lockr.get(lockerKey);

		dispatch({
			type: actionTypes.INITIALIZE,
			payload: pendingFilesLocal.pending,
		});
	};
