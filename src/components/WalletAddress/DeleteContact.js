import React, { useContext } from 'react';
import { Action, Icon } from './Elements';
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
			<Icon src={hideIcon} />
		</Action>
	);
};

export default DeleteContact;
