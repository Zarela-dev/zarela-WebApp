import React, { useState } from 'react';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import approvedIcon from '../../assets/icons/check-green.svg';
import unapprovedIcon from '../../assets/icons/pending.svg';
import caretDownIcon from '../../assets/icons/caret-down.svg';
import caretUpIcon from '../../assets/icons/caret-up.svg';

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
	RequestNumber,
	Table,
	TableCellWrapper,
	TableCell,
	TableRow,
	TableBulkRow,
} from './Elements';
import { Spacer } from '../Elements/Spacer';
import { timeSince } from '../../utils';

const LogCard = ({ data }) => {
	const { requestID, title, tokenPay, contributions } = data;
	const [isOpen, setOpen] = useState(false);
	const totalPending = contributions.filter((item) => item.status === false).length;
	const totalConfirmed = contributions.filter((item) => item.status === true).length;
	const allApproved = contributions.length === totalConfirmed;

	return (
		<CompactRequestCard>
			<Header onClick={() => setOpen((value) => !value)}>
				<Column flex="0 0 80px" alignSelf="flex-start">
					<RequestNumber>{requestID}</RequestNumber>
				</Column>
				<Column flex="1 1 530px">
					<Row>
						<Title>{title}</Title>
					</Row>
					<Row>
						<QuickReport bold>{`${totalPending + totalConfirmed} files: `}</QuickReport>
						<QuickReport>{` ${totalConfirmed} approved, ${totalPending} pending `}</QuickReport>
					</Row>
				</Column>
				<Spacer />
				<Column displayFlex flex="0">
					<Row>
						<BiobitIcon src={biobitIcon} />
						<BiobitValue>{tokenPay}</BiobitValue>
						<DollarValue>{`~ $${tokenPay}`}</DollarValue>
					</Row>
				</Column>
				<VerticalDivider />
				<Column flex="0">
					<Row>
						{allApproved ? (
							<>
								<StatusIcon src={approvedIcon} />
								<StatusLabel approved>Confirmed</StatusLabel>
							</>
						) : (
							<>
								<StatusIcon src={unapprovedIcon} />
								<StatusLabel>Pending</StatusLabel>
							</>
						)}
					</Row>
				</Column>
				<Column flex="0">{true ? <CaretIcon src={caretDownIcon} /> : <CaretIcon src={caretUpIcon} />}</Column>
			</Header>
			{isOpen ? (
				<Body>
					<Table>
						<TableRow header>
							<TableCellWrapper>
								<TableCell>File Names</TableCell>
							</TableCellWrapper>
							<TableCellWrapper>
								<TableCell>Date</TableCell>
							</TableCellWrapper>
							<TableCellWrapper>
								<TableCell>Zarela Day</TableCell>
							</TableCellWrapper>
							<TableCellWrapper>
								<TableCell>Status</TableCell>
							</TableCellWrapper>
						</TableRow>
						<TableBulkRow>
							{contributions.map(({ originalIndex, timestamp, zarelaDay, status }, rowIndex) => (
								<TableRow key={originalIndex}>
									<TableCellWrapper>
										<TableCell>{`${rowIndex + 1}. File #${originalIndex}`}</TableCell>
									</TableCellWrapper>
									<TableCellWrapper>
										<TableCell>{timeSince(timestamp)}</TableCell>
									</TableCellWrapper>
									<TableCellWrapper>
										<TableCell>{zarelaDay}</TableCell>
									</TableCellWrapper>
									<TableCellWrapper>
										<TableCell>
											{status ? (
												<>
													<StatusIcon src={approvedIcon} />
													<StatusLabel approved>Confirmed</StatusLabel>
												</>
											) : (
												<>
													<StatusIcon src={unapprovedIcon} />
													<StatusLabel>Pending</StatusLabel>
												</>
											)}
										</TableCell>
									</TableCellWrapper>
								</TableRow>
							))}
						</TableBulkRow>
					</Table>
				</Body>
			) : null}
		</CompactRequestCard>
	);
};

export default LogCard;
