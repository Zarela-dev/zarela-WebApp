import React, { useContext } from 'react';
import { Action } from './Elements';
import {
	blockAddress,
	unBlockAddress,
} from '../../state/localStorageProvider/actions';
import { localStorageContext } from '../../state/localStorageProvider/LocalStoragePriveder';
import unblockIcon from '../../assets/icons/actionIcons/unBlockPink.svg';
import blockIcon from '../../assets/icons/actionIcons/block.svg';
import { toast, normalizeAddress } from '../../utils';
import { ThemeIcon } from './../../components/Elements/Icon';

const BlockAddress = ({ publicKey }) => {
	const { dispatch, localState } = useContext(localStorageContext);
	const { blockList, contacts } = localState;

	if (blockList.includes(normalizeAddress(publicKey)))
		return (
			<Action
				onClick={() => {
					unBlockAddress(dispatch, publicKey);
					toast(
						`"${
							contacts[normalizeAddress(publicKey)] || publicKey
						}" removed from blacklist`,
						'success',
						true
					);
				}}
			>
				<ThemeIcon variant='big' src={unblockIcon} />
			</Action>
		);
	return (
		<Action
			onClick={() => {
				blockAddress(dispatch, publicKey);
				toast(
					`"${
						contacts[normalizeAddress(publicKey)] || publicKey
					}" is now in Blacklist`,
					'success',
					true
				);
			}}
		>
			<ThemeIcon variant='big' src={blockIcon} />
		</Action>
	);
};

export default BlockAddress;
