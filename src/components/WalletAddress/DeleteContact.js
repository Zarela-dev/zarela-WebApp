import React, { useContext } from 'react';
import { Action, Icon, HoverTooltip } from './Elements';
import { removeContact } from '../../state/localStorageProvider/actions';
import { localStorageContext } from '../../state/localStorageProvider/LocalStoragePriveder';
import hideIcon from '../../assets/icons/actionIcons/delete.svg';
import { toast, normalizeAddress } from '../../utils';

const DeleteContact = ({ publicKey }) => {
	const { dispatch, localState } = useContext(localStorageContext);
	const { contacts } = localState;
	const alias = contacts[normalizeAddress(publicKey)];

	return (
		<Action
			onClick={() => {
				removeContact(dispatch, publicKey);
				toast(`"${alias}" removed from contacts.`, 'success', true);
			}}
		>
			<HoverTooltip title="delete contact">
				<Icon src={hideIcon} />
			</HoverTooltip>
		</Action>
	);
};

export default DeleteContact;
