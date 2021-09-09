import React from 'react';
import styled from 'styled-components';
import unBlock from '../../assets/icons/actionIcons/unBlock.svg';

import {
	CompactRequestCard,
	Row,
	Header,
	Body,
	Column,
	BiobitIcon,
	DollarValue,
	CaretIcon,
	StatusIcon,
	StatusLabel,
	BiobitValue,
	VerticalDivider,
	Title,
	QuickReport,
	QuickReportTitle,
	RequestNumber,
	Table,
	TableCellWrapper,
	TableCell,
	TableRow,
	TableBulkRow,
} from '../LogCards/Elements';

const SettingTableCell = styled(TableCellWrapper)`
	flex: ${(props) => props.flex} !important;
`;

const ActionIcon = styled(StatusIcon)`
	width: 25px;
	margin: 0px calc((100% - (3 * 25px)) / 6);
`;

const ActionTitle = styled.span`
	margin: 0 10%;
`;

const Blocked = () => {
	return (
		<CompactRequestCard>
			<Body>
				<Table>
					<TableRow header>
						<SettingTableCell flex='0 0 65%'>
							<TableCell>public key</TableCell>
						</SettingTableCell>
						<SettingTableCell flex='0 0 20%'>
							<TableCell>Name</TableCell>
						</SettingTableCell>
						<SettingTableCell flex='0 0 15%'>
							<TableCell>Block/Unblock</TableCell>
						</SettingTableCell>
					</TableRow>
					<TableBulkRow>
						{[1, 2, 3, 4, 5, 6].map((item) => (
							<TableRow key={1}>
								<SettingTableCell flex='0 0 65%'>
									<TableCell>WEERTYUNBGWEERTYUNBGWEERTYUNBG </TableCell>
								</SettingTableCell>
								<SettingTableCell flex='0 0 20%'>
									<TableCell> Hub- Dr.Mohiri</TableCell>
								</SettingTableCell>
								<SettingTableCell flex='0 0 15%'>
									<TableCell>
										<ActionIcon src={unBlock} />
									</TableCell>
								</SettingTableCell>
							</TableRow>
						))}
					</TableBulkRow>
				</Table>
			</Body>
		</CompactRequestCard>
	);
};

export default Blocked;
