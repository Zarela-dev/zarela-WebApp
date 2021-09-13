import React, { useContext, useState, useEffect } from 'react';
import { Action, Icon } from './Elements';
import { hideAddress, unHideAddress } from '../../state/localStorageProvider/actions';
import { localStorageContext } from '../../state/localStorageProvider/LocalStoragePriveder';
import hideIcon from '../../assets/icons/actionIcons/hide.svg';
import unhideIcon from '../../assets/icons/actionIcons/unHide.svg';

const HideAddress = ({ publicKey, requestID, justUnhide }) => {
	const { dispatch } = useContext(localStorageContext);

	return (
		<Action onClick={() => hideAddress(dispatch, publicKey, requestID)}>
			<Icon src={unhideIcon} />
		</Action>
	);
};

export default HideAddress;
