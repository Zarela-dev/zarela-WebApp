import React, { useContext } from 'react';
import { Action } from './Elements';
import {
	hideAddress,
	unHideAddress,
} from '../../state/localStorageProvider/actions';
import { localStorageContext } from '../../state/localStorageProvider/LocalStoragePriveder';
import hideIcon from '../../assets/icons/actionIcons/hide.svg';
import unhideIcon from '../../assets/icons/actionIcons/unHide.svg';
import { normalizeAddress, toast } from '../../utils';
import { ThemeIcon } from './../../components/Elements/Icon';

const HideAddress = ({ publicKey, requestID }) => {
	const { dispatch, localState } = useContext(localStorageContext);
	const { hideList, contacts } = localState;

	if (hideList[normalizeAddress(publicKey)])
		if (hideList[normalizeAddress(publicKey)].includes(requestID.toString()))
			return (
				<Action
					onClick={() => {
						unHideAddress(dispatch, publicKey, requestID);
						toast(
							`"${
								contacts[normalizeAddress(publicKey)] || publicKey
							}" is now visible on request #${requestID}`,
							'success',
							true
						);
					}}
				>
					<ThemeIcon variant='big' src={hideIcon} />
				</Action>
			);
	return (
		<Action
			onClick={() => {
				hideAddress(dispatch, publicKey, requestID);
				toast(
					`"${
						contacts[normalizeAddress(publicKey)] || publicKey
					}" is now hidden on request #${requestID}`,
					'success',
					true
				);
			}}
		>
			<ThemeIcon variant='big' src={unhideIcon} />
		</Action>
	);
};

export default HideAddress;
