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
	TableBulkRow,
} from '../LogCards/Elements';
import { CopyableText, normalizeAddress } from '../../utils';
import MobileCard from './MobileCard';
import AddContact from '../WalletAddress/AddContact';
import BlockAddress from '../WalletAddress/BlockAddress';
import DeleteContact from '../WalletAddress/DeleteContact';
import { BodyText } from './../../components/Elements/Typography';
import { Row } from './../../components/Elements/Flex';
import { ThemeIcon } from './../../components/Elements/Icon';
import copyIcon from '../../assets/icons/copy.svg';

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
							<SettingTableCell flex='0 0 35%'>
								<TableCell>
									<BodyText variant='extraSmall'>Nick Name</BodyText>
								</TableCell>
							</SettingTableCell>
							<SettingTableCell flex='0 0 40%'>
								<TableCell>
									<BodyText variant='extraSmall'>Public key</BodyText>
								</TableCell>
							</SettingTableCell>
							<SettingTableCell flex='0 0 25%'>
								<TableCell>
									<ActionTitle>
										<BodyText variant='extraSmall'>Blocked</BodyText>
									</ActionTitle>
									<ActionTitle>
										<BodyText variant='extraSmall'>Delete</BodyText>
									</ActionTitle>
									<ActionTitle>
										<BodyText variant='extraSmall'>Edit</BodyText>
									</ActionTitle>
								</TableCell>
							</SettingTableCell>
						</TableRow>
						<TableBulkRow>
							{Object.keys(contacts).length ? (
								Object.keys(contacts).map((address) => {
									const isBlocked = blockList.includes(
										normalizeAddress(address)
									);
									return (
										<Row key={address}>
											<SettingTableCell flex='0 0 35%'>
												<TableCell isBlocked={isBlocked}>
													{' '}
													<BodyText variant='extraSmall'>
														{contacts[address]}
													</BodyText>{' '}
												</TableCell>
											</SettingTableCell>
											<SettingTableCell flex='0 0 40%'>
												<CopyableText textToCopy={address}>
													<TableCell isBlocked={isBlocked}>
														<BodyText variant='extraSmall'>{address}</BodyText>{' '}
														<ThemeIcon variant='big' ml={2} src={copyIcon} />
													</TableCell>
												</CopyableText>
											</SettingTableCell>
											<SettingTableCell flex='0 0 25%'>
												<TableCell>
													<Actions>
														<BlockAddress publicKey={address} />
														<DeleteContact publicKey={address} />
														<AddContact
															publicKey={address}
															edit
															disabled={isBlocked}
														/>
													</Actions>
												</TableCell>
											</SettingTableCell>
										</Row>
									);
								})
							) : (
								<BodyText variant='small'>You have no contacts</BodyText>
							)}
						</TableBulkRow>
					</Table>
				</Body>
			</CompactRequestCard>
		);
	}
};

export default Contacts;
