import React, { useContext } from 'react';
import { Action } from './Elements';
import { removeContact } from '../../state/localStorageProvider/actions';
import { localStorageContext } from '../../state/localStorageProvider/LocalStoragePriveder';
import hideIcon from '../../assets/icons/actionIcons/delete.svg';
import { toast, normalizeAddress } from '../../utils';
import {ThemeIcon} from './../../components/Elements/Icon';

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
			<ThemeIcon variant='big' src={hideIcon} />
		</Action>
	);
};

export default DeleteContact;
