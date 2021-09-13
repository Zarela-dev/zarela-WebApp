import React, { useContext, useState, useEffect } from 'react';
import { CopyableText, toast, normalizeAddress } from '../utils';
import styled from 'styled-components';
import addToContactIcon from '../assets/icons/actionIcons/add-to-contact.svg';
import blockIcon from '../assets/icons/actionIcons/block.svg';
import hideIcon from '../assets/icons/actionIcons/hide.svg';
import unblockIcon from '../assets/icons/actionIcons/unBlock.svg';
import unhideIcon from '../assets/icons/actionIcons/unHide.svg';
import publicKeyIcon from '../assets/icons/public-key.svg';
import confirmAddToContactIcon from '../assets/icons/actionIcons/confirm-add-to-contact.svg';
import editContactIcon from '../assets/icons/actionIcons/edit.svg';
import {
	addContact,
	RemoveContact,
	blockAddress,
	unBlockAddress,
	hideAddress,
	unHideAddress,
} from '../state/localStorageProvider/actions';
import { localStorageContext } from '../state/localStorageProvider/LocalStoragePriveder';
import MuiTooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const Address = styled.p``;

const Icon = styled.img``;

const ActionsWrapper = styled.div`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
`;

const Action = styled.button`
	border: none;
	background: none;
	width: 24px;
	padding: 0;
	margin-left: ${(props) => props.theme.spacing(1.6)};
`;

const AddressWrapper = styled.div`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
`;

const Wrapper = styled.div`
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
`;

const PublicKeyIcon = styled.img`
	flex: 0 0 40px;
	height: 40px;
	margin-right: ${(props) => props.theme.spacing(1)};
`;
const Tooltip = styled((props) => {
	return <MuiTooltip classes={{ popper: props.className }} {...props} />;
})`
	& .MuiTooltip-tooltip {
		background: white;
		box-shadow: 0px 0px 20px rgba(81, 197, 234, 0.32);
		border-radius: 4px;
		width: 250px;
	}
`;
const AddToContactFrom = styled.form`
	display: flex;
	flex-wrap: nowrap;
`;

const TextField = styled.input`
	flex: 1 0 auto;
	color: #7246d0;
	font-size: 12px;
	border: none;
	background: none;
`;

const SubmitButton = styled.button`
	border: none;
	background: none;
`;

const WalletAddress = ({ className, publicKey, showIcons = true, requestID }) => {
	const { dispatch, localState } = useContext(localStorageContext);
	const { contacts } = localState;
	const [alias, setAlias] = useState('');
	const [isTooltipOpen, setTooltipOpen] = useState(false);

	useEffect(() => {
		contacts[normalizeAddress(publicKey)] && setAlias(contacts[normalizeAddress(publicKey)]);
	}, [contacts[publicKey]]);

	return (
		<Wrapper className={className}>
			<AddressWrapper>
				<PublicKeyIcon src={publicKeyIcon} />
				<CopyableText textToCopy={publicKey}>
					<Address>
						{contacts[normalizeAddress(publicKey)]
							? `${contacts[normalizeAddress(publicKey)]} (${publicKey.substr(0, 12)}...)`
							: publicKey}
					</Address>
				</CopyableText>
			</AddressWrapper>
			<ActionsWrapper>
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
					<Action onClick={() => setTooltipOpen(true)}>
						<Icon src={contacts[[normalizeAddress(publicKey)]] ? editContactIcon : addToContactIcon} />
					</Action>
				</Tooltip>
				<Action onClick={() => blockAddress(dispatch, publicKey)}>
					<Icon src={blockIcon} />
				</Action>
				<Action onClick={() => hideAddress(dispatch, publicKey, requestID)}>
					<Icon src={unhideIcon} />
				</Action>
			</ActionsWrapper>
		</Wrapper>
	);
};

export default WalletAddress;
