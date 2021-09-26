import { actionTypes } from './actionTypes';
import * as lockr from 'lockr';
import { normalizeAddress } from '../../utils';
import { lockerKey } from './lockrKey';
import axios from 'axios';
import { ETHERSCAN_BASE_URL } from '../../constants';

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
			type: actionTypes.UPDATE_PENDING_FILE,
			payload,
		});
	};

export const initialize =
	({ dispatch }) =>
	async () => {
		const data = lockr.get(lockerKey);
		if (data !== undefined) {
			let { pending } = data;
			let _pending = { ...pending };

			for (const txHash of Object.keys(pending)) {
				const response = await axios.get(ETHERSCAN_BASE_URL, {
					params: {
						module: 'transaction',
						action: 'gettxreceiptstatus',
						txhash: txHash,
						apikey: process.env.REACT_APP_ETHEREUM_API_KEY,
					},
				});

				if (response.data.result.status === '1' || response.data.result.status === '0') {
					delete _pending[txHash];
				}
			}

			dispatch({
				type: actionTypes.INITIALIZE,
				payload: _pending,
			});
		}
	};
