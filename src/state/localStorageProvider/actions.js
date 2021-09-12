import { actionTypes } from './actionTypes';

export const addContact = (dispatch, publicKey, alias) => {
	dispatch({
		type: actionTypes.ADD_CONTACT,
		payload: {
			publicKey,
			alias,
		},
	});
};

export const removeContact = (dispatch, publicKey) => {
	dispatch({
		type: actionTypes.REMOVE_CONTACT,
		payload: {
			publicKey,
		},
	});
};

export const blockAddress = (dispatch, publicKey) => {
	dispatch({
		type: actionTypes.BLOCK_ADDRESS,
		payload: {
			publicKey,
		},
	});
};

export const unBlockAddress = (dispatch, publicKey) => {
	dispatch({
		type: actionTypes.UNBLOCK_ADDRESS,
		payload: {
			publicKey,
		},
	});
};

export const hideAddress = (dispatch, publicKey, orderId) => {
	dispatch({
		type: actionTypes.HIDE_ADDRESS,
		payload: {
			publicKey,
			orderId,
		},
	});
};

export const unHideAddress = (dispatch, publicKey, orderId) => {
	dispatch({
		type: actionTypes.UNHIDE_ADDRESS,
		payload: {
			publicKey,
			orderId,
		},
	});
};
