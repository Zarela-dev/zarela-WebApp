import React from 'react';
import styled from 'styled-components';
import deleteIcon from '../../assets/icons/actionIcons/delete.svg';
import edit from '../../assets/icons/actionIcons/edit.svg';
import block from '../../assets/icons/actionIcons/block.svg';

import {
	CompactRequestCard,
	Body,
	StatusIcon,
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

const ActionIcon = styled(StatusIcon)`
	width: 22px;
	margin: 0px calc((100% - (3 * 25px)) / 6);
`;

const ActionTitle = styled.span`
	margin: 0 9%;
`;

const Contacts = ({ isMobile }) => {
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
								<TableCell>Name</TableCell>
							</SettingTableCell>
							<SettingTableCell flex="0 0 40%">
								<TableCell>public key</TableCell>
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
							{[1, 2, 3, 4, 5, 6].map((item) => (
								<TableRow key={1}>
									<SettingTableCell flex="0 0 35%">
										<TableCell> Hub- Dr.Mohiri </TableCell>
									</SettingTableCell>
									<SettingTableCell flex="0 0 40%">
										<TableCell>WEERTYUNBGWEERTYUNBGWEERTYUNBG</TableCell>
									</SettingTableCell>
									<SettingTableCell flex="0 0 25%">
										<TableCell>
											<ActionIcon src={block} />
											<ActionIcon src={deleteIcon} />
											<ActionIcon src={edit} />
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

export default Contacts;
