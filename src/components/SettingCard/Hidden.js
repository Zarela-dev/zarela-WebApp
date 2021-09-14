import React, { useContext } from 'react';
import { localStorageContext } from '../../state/localStorageProvider/LocalStoragePriveder';
import { CopyableText, normalizeAddress } from '../../utils';
import styled from 'styled-components';
import hide from '../../assets/icons/actionIcons/hide.svg';
import HideAddress from '../WalletAddress/HideAddress';
import {
	CompactRequestCard,
	Body,
	Table,
	TableCellWrapper,
	TableCell,
	EmptyMessage,
	TableRow,
	CopyIcon,
	TableBulkRow,
} from '../LogCards/Elements';
import MobileCard from './MobileCard';

const SettingTableCell = styled(TableCellWrapper)`
	flex: ${(props) => props.flex} !important;
`;

const Hidden = ({ isMobile }) => {
	const { localState } = useContext(localStorageContext);
	const { contacts, hideList } = localState;

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
							<SettingTableCell flex="0 0 15%">
								<TableCell>Request No.</TableCell>
							</SettingTableCell>
							<SettingTableCell flex="0 0 15%">
								<TableCell>Name</TableCell>
							</SettingTableCell>
							<SettingTableCell flex="1 0 auto">
								<TableCell>public key</TableCell>
							</SettingTableCell>
							<SettingTableCell flex="0 0 10%">
								<TableCell>Unhide</TableCell>
							</SettingTableCell>
						</TableRow>
						<TableBulkRow>
							{Object.keys(hideList).length ? (
								Object.keys(hideList).map((hiddenAddress) => {
									return hideList[hiddenAddress].map((hiddenRequest) => (
										<TableRow key={hiddenAddress + hiddenRequest}>
											<SettingTableCell flex="0 0 15%">
												<TableCell> {hiddenRequest} </TableCell>
											</SettingTableCell>
											<SettingTableCell flex="0 0 15%">
												<TableCell>
													{contacts[normalizeAddress(hiddenAddress)] || '-'}
												</TableCell>
											</SettingTableCell>
											<SettingTableCell flex="1 0 auto">
												<CopyableText textToCopy={hiddenAddress}>
													<TableCell>
														{hiddenAddress} <CopyIcon />
													</TableCell>
												</CopyableText>
											</SettingTableCell>
											<SettingTableCell flex="0 0 10%">
												<TableCell>
													<HideAddress
														publicKey={hiddenAddress}
														requestID={hiddenRequest.toString()}
													/>
												</TableCell>
											</SettingTableCell>
										</TableRow>
									));
								})
							) : (
								<EmptyMessage>You have no hidden addresses</EmptyMessage>
							)}
						</TableBulkRow>
					</Table>
				</Body>
			</CompactRequestCard>
		);
	}
};

export default Hidden;
