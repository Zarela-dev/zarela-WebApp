import React, { useContext, useState, useEffect } from 'react';
import { Action, Icon } from './Elements';
import { hideAddress, unHideAddress } from '../../state/localStorageProvider/actions';
import { localStorageContext } from '../../state/localStorageProvider/LocalStoragePriveder';
import hideIcon from '../../assets/icons/actionIcons/hide.svg';
import unhideIcon from '../../assets/icons/actionIcons/unHide.svg';
import { normalizeAddress, toast } from '../../utils';

const HideAddress = ({ publicKey, requestID }) => {
	const { dispatch, localState } = useContext(localStorageContext);
	const { hideList } = localState;

	debugger
	if (hideList[normalizeAddress(publicKey)])
		if (hideList[normalizeAddress(publicKey)].includes(requestID.toString()))
			return (
				<Action onClick={() => unHideAddress(dispatch, publicKey, requestID)}>
					<Icon src={hideIcon} />
				</Action>
			);
	return (
		<Action onClick={() => hideAddress(dispatch, publicKey, requestID)}>
			<Icon src={unhideIcon} />
		</Action>
	);
};

export default HideAddress;
