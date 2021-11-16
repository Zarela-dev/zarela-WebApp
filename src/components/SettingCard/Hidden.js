import React, { useContext } from 'react';
import { localStorageContext } from '../../state/localStorageProvider/LocalStoragePriveder';
import { CopyableText, normalizeAddress } from '../../utils';
import styled from 'styled-components';
import HideAddress from '../WalletAddress/HideAddress';
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

const Hidden = ({ isMobile }) => {
	const { localState } = useContext(localStorageContext);
	const { contacts, hideList } = localState;

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
							<SettingTableCell flex='0 0 15%'>
								<TableCell>
									<BodyText variant='extraSmall'>Request No.</BodyText>
								</TableCell>
							</SettingTableCell>
							<SettingTableCell flex='0 0 15%'>
								<TableCell>
									<BodyText variant='extraSmall'>Nick Name</BodyText>
								</TableCell>
							</SettingTableCell>
							<SettingTableCell flex='1 0 auto'>
								<TableCell>
									<BodyText variant='extraSmall'>public key</BodyText>
								</TableCell>
							</SettingTableCell>
							<SettingTableCell flex='0 0 10%'>
								<TableCell>
									<BodyText variant='extraSmall'>Unhide</BodyText>
								</TableCell>
							</SettingTableCell>
						</TableRow>
						<TableBulkRow>
							{Object.keys(hideList).length ? (
								Object.keys(hideList).map((hiddenAddress) => {
									return hideList[hiddenAddress].map((hiddenRequest) => (
										<TableRow key={hiddenAddress + hiddenRequest}>
											<SettingTableCell flex='0 0 15%'>
												<TableCell>
													{' '}
													<BodyText variant='extraSmall'>
														{hiddenRequest}
													</BodyText>{' '}
												</TableCell>
											</SettingTableCell>
											<SettingTableCell flex='0 0 15%'>
												<TableCell>
													<BodyText variant='extraSmall'>
														{contacts[normalizeAddress(hiddenAddress)] || '-'}
													</BodyText>
												</TableCell>
											</SettingTableCell>
											<SettingTableCell flex='1 0 auto'>
												<CopyableText textToCopy={hiddenAddress}>
													<TableCell>
														<BodyText variant='extraSmall'>
															{hiddenAddress}
														</BodyText>{' '}
														<ThemeIcon variant='big' ml={2} src={copyIcon} />
													</TableCell>
												</CopyableText>
											</SettingTableCell>
											<SettingTableCell flex='0 0 10%'>
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
								<BodyText variant='small'>
									You have no hidden addresses
								</BodyText>
							)}
						</TableBulkRow>
					</Table>
				</Body>
			</CompactRequestCard>
		);
	}
};

export default Hidden;
