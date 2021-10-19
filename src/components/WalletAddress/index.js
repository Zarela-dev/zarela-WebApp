import React, { useContext } from 'react';
import { CopyableText, normalizeAddress } from '../../utils';
import { localStorageContext } from '../../state/localStorageProvider/LocalStoragePriveder';
import publicKeyIcon from '../../assets/icons/public-key.svg';
import AddContact from './AddContact';
import BlockAddress from './BlockAddress';
import HideAddress from './HideAddress';
import { Wrapper, AddressWrapper, PublicKeyIcon, Address, ActionsWrapper } from './Elements';

const WalletAddress = ({ className, publicKey, showIcons = true, icons = ['contact', 'hide', 'block'], requestID, iconImage }) => {
	const { localState } = useContext(localStorageContext);
	const { contacts } = localState;

	return (
		<Wrapper className={className}>
			<AddressWrapper>
				<PublicKeyIcon src={iconImage || publicKeyIcon} />
				<CopyableText textToCopy={publicKey}>
					<Address>
						{contacts[normalizeAddress(publicKey)]
							? `${contacts[normalizeAddress(publicKey)]} (${publicKey.substr(0, 12)}...)`
							: publicKey}
					</Address>
				</CopyableText>
			</AddressWrapper>
			{showIcons && (
				<ActionsWrapper>
					{icons.includes('contact') && <AddContact publicKey={publicKey} />}
					{icons.includes('hide') && <BlockAddress publicKey={publicKey} />}
					{icons.includes('block') && <HideAddress publicKey={publicKey} requestID={requestID} />}
				</ActionsWrapper>
			)}
		</Wrapper>
	);
};

export default WalletAddress;
