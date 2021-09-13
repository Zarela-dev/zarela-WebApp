import React, { useContext } from 'react';
import { CopyableText, normalizeAddress } from '../../utils';
import { localStorageContext } from '../../state/localStorageProvider/LocalStoragePriveder';
import publicKeyIcon from '../../assets/icons/public-key.svg';
import AddContact from './AddContact';
import BlockAddress from './BlockAddress';
import HideAddress from './HideAddress';
import { Wrapper, AddressWrapper, PublicKeyIcon, Address, ActionsWrapper } from './Elements';

const WalletAddress = ({ className, publicKey, showIcons = true, requestID }) => {
	const { localState } = useContext(localStorageContext);
	const { contacts } = localState;

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
			{showIcons && (
				<ActionsWrapper>
					<AddContact publicKey={publicKey} />
					<BlockAddress publicKey={publicKey} />
					<HideAddress publicKey={publicKey} requestID={requestID} />
				</ActionsWrapper>
			)}
		</Wrapper>
	);
};

export default WalletAddress;
