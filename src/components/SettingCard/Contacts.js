import React, { useContext } from 'react';
import styled from 'styled-components';
import { localStorageContext } from '../../state/localStorageProvider/LocalStoragePriveder';
import {
	CompactRequestCard,
	Body,
	Table,
	TableCellWrapper,
	TableCell,
	TableRow,
	EmptyMessage,
	TableBulkRow,
	CopyIcon,
} from '../LogCards/Elements';
import { CopyableText, normalizeAddress } from '../../utils';
import MobileCard from './MobileCard';
import AddContact from '../WalletAddress/AddContact';
import BlockAddress from '../WalletAddress/BlockAddress';
import DeleteContact from '../WalletAddress/DeleteContact';

const SettingTableCell = styled(TableCellWrapper)`
	flex: ${(props) => props.flex} !important;
`;

const ActionTitle = styled.span`
	margin: 0 9%;
`;

const Actions = styled.div`
	width: 100%;
	& > * {
		width: 22px;
		margin: 0px calc((100% - (3 * 25px)) / 6);
	}
`;

const Contacts = ({ isMobile }) => {
	const { localState } = useContext(localStorageContext);
	const { contacts, blockList } = localState;

	if (isMobile) {
		return (
			<>
				<MobileCard type="contact" />
				<MobileCard type="block" />
			</>
		);
	} else {
		return (
			<CompactRequestCard>
				<Body>
					<Table>
						<TableRow header>
							<SettingTableCell flex="0 0 35%">
								<TableCell>Nick Name</TableCell>
							</SettingTableCell>
							<SettingTableCell flex="0 0 40%">
								<TableCell>Public key</TableCell>
							</SettingTableCell>
							<SettingTableCell flex="0 0 25%">
								<TableCell>
									<ActionTitle>Blocked</ActionTitle>
									<ActionTitle>Delete</ActionTitle>
									<ActionTitle>Edit</ActionTitle>
								</TableCell>
							</SettingTableCell>
						</TableRow>
						<TableBulkRow>
							{Object.keys(contacts).length ? (
								Object.keys(contacts).map((address) => {
									const isBlocked = blockList.includes(normalizeAddress(address));
									return (
										<TableRow key={address}>
											<SettingTableCell flex="0 0 35%">
												<TableCell isBlocked={isBlocked}> {contacts[address]} </TableCell>
											</SettingTableCell>
											<SettingTableCell flex="0 0 40%">
												<CopyableText textToCopy={address}>
													<TableCell isBlocked={isBlocked}>
														{address} <CopyIcon />
													</TableCell>
												</CopyableText>
											</SettingTableCell>
											<SettingTableCell flex="0 0 25%">
												<TableCell>
													<Actions>
														<BlockAddress publicKey={address} />
														<DeleteContact publicKey={address} />
														<AddContact publicKey={address} edit disabled={isBlocked} />
													</Actions>
												</TableCell>
											</SettingTableCell>
										</TableRow>
									);
								})
							) : (
								<EmptyMessage>You have no contacts</EmptyMessage>
							)}
						</TableBulkRow>
					</Table>
				</Body>
			</CompactRequestCard>
		);
	}
};

export default Contacts;
