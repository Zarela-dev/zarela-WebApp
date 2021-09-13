import React, { useContext, useState, useEffect } from 'react';
import { Action, Icon } from './Elements';
import { blockAddress, unBlockAddress } from '../../state/localStorageProvider/actions';
import { localStorageContext } from '../../state/localStorageProvider/LocalStoragePriveder';
import unblockIcon from '../../assets/icons/actionIcons/unBlockPink.svg';
import blockIcon from '../../assets/icons/actionIcons/block.svg';
import { normalizeAddress } from '../../utils';

const BlockAddress = ({ publicKey }) => {
	const { dispatch, localState } = useContext(localStorageContext);
	const { blockList } = localState;
	
	if (blockList.includes(normalizeAddress(publicKey)))
		return (
			<Action onClick={() => unBlockAddress(dispatch, publicKey)}>
				<Icon src={unblockIcon} />
			</Action>
		);
	return (
		<Action onClick={() => blockAddress(dispatch, publicKey)}>
			<Icon src={blockIcon} />
		</Action>
	);
};

export default BlockAddress;
