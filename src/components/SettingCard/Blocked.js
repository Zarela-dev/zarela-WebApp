import React, { useContext } from 'react';
import { localStorageContext } from '../../state/localStorageProvider/LocalStoragePriveder';
import { normalizeAddress } from '../../utils';
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

const SettingTableCell = styled(TableCellWrapper)`
	flex: ${(props) => props.flex} !important;
`;

const Blocked = ({ isMobile }) => {
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
							<SettingTableCell flex="1 0 auto">
								<TableCell>public key</TableCell>
							</SettingTableCell>
							<SettingTableCell flex="0 0 20%">
								<TableCell>Name</TableCell>
							</SettingTableCell>
							<SettingTableCell flex="0 0 10%">
								<TableCell>Unblock</TableCell>
							</SettingTableCell>
						</TableRow>
						<TableBulkRow>
							{blockList.map((blockedAddress) => (
								<TableRow key={blockedAddress}>
									<SettingTableCell flex="1 0 auto">
										<TableCell>{blockedAddress}</TableCell>
									</SettingTableCell>
									<SettingTableCell flex="0 0 20%">
										<TableCell> {contacts[normalizeAddress(blockedAddress)] || '-'}</TableCell>
									</SettingTableCell>
									<SettingTableCell flex="0 0 10%">
										<TableCell>
											<BlockAddress publicKey={blockedAddress} />
										</TableCell>
									</SettingTableCell>
								</TableRow>
							))}
						</TableBulkRow>
					</Table>
				</Body>
			</CompactRequestCard>
		);
	}
};

export default Blocked;
