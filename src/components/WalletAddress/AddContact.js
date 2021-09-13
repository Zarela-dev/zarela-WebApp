import React, { useContext, useState, useEffect } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { toast, normalizeAddress } from '../../utils';
import { addContact } from '../../state/localStorageProvider/actions';
import { localStorageContext } from '../../state/localStorageProvider/LocalStoragePriveder';
import addToContactIcon from '../../assets/icons/actionIcons/add-to-contact.svg';
import confirmAddToContactIcon from '../../assets/icons/actionIcons/confirm-add-to-contact.svg';
import editContactIcon from '../../assets/icons/actionIcons/edit.svg';
import { Icon, TextField, SubmitButton, AddToContactFrom, Tooltip, Action } from './Elements';

const AddContact = ({ publicKey, edit, disabled }) => {
	const { dispatch, localState } = useContext(localStorageContext);
	const { contacts } = localState;
	const [isTooltipOpen, setTooltipOpen] = useState(false);
	const [alias, setAlias] = useState('');

	useEffect(() => {
		contacts[normalizeAddress(publicKey)] && setAlias(contacts[normalizeAddress(publicKey)]);
	}, [contacts[publicKey]]);

	return (
		<Tooltip
			PopperProps={{
				disablePortal: true,
			}}
			disableFocusListener
			disableHoverListener
			disableTouchListener
			open={isTooltipOpen}
			interactive={true}
			onClose={() => setTooltipOpen(false)}
			title={
				<ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
					<AddToContactFrom
						onSubmit={(e) => {
							e.preventDefault();
							if (alias !== '') {
								addContact(dispatch, publicKey, alias);
								setTooltipOpen(false);
								setAlias('');
								toast(`"${alias}" added to contacts.`, 'success', true);
							}
						}}
					>
						<TextField
							placeholder="Add your contact name"
							name="alias"
							value={alias}
							autoFocus
							onChange={(e) => setAlias(e.target.value)}
						/>
						<SubmitButton type="submit">
							<Icon src={confirmAddToContactIcon} />
						</SubmitButton>
					</AddToContactFrom>
				</ClickAwayListener>
			}
		>
			<Action disabled={disabled} onClick={() => setTooltipOpen(true)}>
				<Icon src={contacts[[normalizeAddress(publicKey)]] || edit ? editContactIcon : addToContactIcon} />
			</Action>
		</Tooltip>
	);
};

export default AddContact;
