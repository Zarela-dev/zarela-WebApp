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
	EmptyMessage,
	TableRow,
	TableBulkRow,
	CopyIcon,
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
								<TableCell>Nick Name</TableCell>
							</SettingTableCell>
							<SettingTableCell flex="0 0 10%">
								<TableCell>Unblock</TableCell>
							</SettingTableCell>
						</TableRow>
						<TableBulkRow>
							{blockList.length ? (
								blockList.map((blockedAddress) => (
									<TableRow key={blockedAddress}>
										<SettingTableCell flex="1 0 auto">
											<CopyableText textToCopy={blockedAddress}>
												<TableCell>
													{blockedAddress} <CopyIcon />
												</TableCell>
											</CopyableText>
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
								))
							) : (
								<EmptyMessage>You have no blocked addresses</EmptyMessage>
							)}
						</TableBulkRow>
					</Table>
				</Body>
			</CompactRequestCard>
		);
	}
};

export default Blocked;
