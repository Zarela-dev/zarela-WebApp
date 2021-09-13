import { actionTypes } from './actionTypes';
import { normalizeAddress } from '../../utils';

export const addContact = (dispatch, publicKey, alias) => {
	dispatch({
		type: actionTypes.ADD_CONTACT,
		payload: {
			publicKey: normalizeAddress(publicKey),
			alias,
		},
	});
};

export const removeContact = (dispatch, publicKey) => {
	dispatch({
		type: actionTypes.REMOVE_CONTACT,
		payload: {
			publicKey: normalizeAddress(publicKey),
		},
	});
};

export const blockAddress = (dispatch, publicKey) => {
	dispatch({
		type: actionTypes.BLOCK_ADDRESS,
		payload: {
			publicKey: normalizeAddress(publicKey),
		},
	});
};

export const unBlockAddress = (dispatch, publicKey) => {
	dispatch({
		type: actionTypes.UNBLOCK_ADDRESS,
		payload: {
			publicKey: normalizeAddress(publicKey),
		},
	});
};

export const hideAddress = (dispatch, publicKey, requestId) => {
	dispatch({
		type: actionTypes.HIDE_ADDRESS,
		payload: {
			publicKey: normalizeAddress(publicKey),
			requestId,
		},
	});
};

export const unHideAddress = (dispatch, publicKey, requestId) => {
	dispatch({
		type: actionTypes.UNHIDE_ADDRESS,
		payload: {
			publicKey: normalizeAddress(publicKey),
			requestId,
		},
	});
};
