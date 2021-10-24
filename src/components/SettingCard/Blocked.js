import React, { useContext } from 'react';
import { localStorageContext } from '../../state/localStorageProvider/LocalStoragePriveder';
import { CopyableText, normalizeAddress } from '../../utils';
import styled from 'styled-components';
import BlockAddress from '../WalletAddress/BlockAddress';
import {
	CompactRequestCard,
	Body,
	Table,
	TableCellWrapper,
	TableCell,
	TableRow,
	TableBulkRow,
} from '../LogCards/Elements';
import MobileCard from './MobileCard';
import { BodyText } from './../../components/Elements/Typography';
import { ThemeIcon } from './../../components/Elements/Icon';
import copyIcon from '../../assets/icons/copy.svg';

const SettingTableCell = styled(TableCellWrapper)`
	flex: ${(props) => props.flex} !important;
`;

const Blocked = ({ isMobile }) => {
	const { localState } = useContext(localStorageContext);
	const { contacts, blockList } = localState;

	if (isMobile) {
		return (
			<>
				<MobileCard type='contact' />
				<MobileCard type='block' />
			</>
		);
	} else {
		return (
			<CompactRequestCard>
				<Body>
					<Table>
						<TableRow header>
							<SettingTableCell flex='1 0 auto'>
								<TableCell>
									<BodyText variant='extraSmall'>public key</BodyText>
								</TableCell>
							</SettingTableCell>
							<SettingTableCell flex='0 0 20%'>
								<TableCell>
									<BodyText variant='extraSmall'>Nick Name</BodyText>
								</TableCell>
							</SettingTableCell>
							<SettingTableCell flex='0 0 10%'>
								<TableCell>
									<BodyText variant='extraSmall'>Unblock</BodyText>
								</TableCell>
							</SettingTableCell>
						</TableRow>
						<TableBulkRow>
							{blockList.length ? (
								blockList.map((blockedAddress) => (
									<TableRow key={blockedAddress}>
										<SettingTableCell flex='1 0 auto'>
											<CopyableText textToCopy={blockedAddress}>
												<TableCell>
													<BodyText variant='extraSmall'>
														{blockedAddress}
													</BodyText>{' '}
													<ThemeIcon variant='big' ml={2} src={copyIcon} />
												</TableCell>
											</CopyableText>
										</SettingTableCell>
										<SettingTableCell flex='0 0 20%'>
											<TableCell>
												{' '}
												<BodyText variant='extraSmall'>
												{contacts[normalizeAddress(blockedAddress)] || '-'}
												</BodyText>
											</TableCell>
										</SettingTableCell>
										<SettingTableCell flex='0 0 10%'>
											<TableCell>
												<BlockAddress publicKey={blockedAddress} />
											</TableCell>
										</SettingTableCell>
									</TableRow>
								))
							) : (
								<BodyText variant='small'>You have no blocked addresses</BodyText>
							)}
						</TableBulkRow>
					</Table>
				</Body>
			</CompactRequestCard>
		);
	}
};

export default Blocked;
