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
	QuickReportTitle,
	RequestNumber,
	Table,
	TableCellWrapper,
	TableCell,
	TableRow,
	TableBulkRow,
	IconListWrapper,
	HubIcon,
	AngelIcon,
	RoleLabel,
} from './Elements';
import { Spacer } from '../Elements/Spacer';
import { timeSince } from '../../utils';
import useBiobit from '../../hooks/useBiobit';

const LogCard = ({ data, account }) => {
	const { requestID, title, angelTokenPay, laboratoryTokenPay, contributions } = data;
	const [isOpen, setOpen] = useState(false);
	const totalPending = contributions.filter((item) => item.status === false).length;
	const totalConfirmed = contributions.filter((item) => item.status === true).length;
	const allApproved = contributions.length === totalConfirmed;
	const getVariant = () => {
		if (allApproved) return 'confirmed';
		if (contributions.length !== totalConfirmed) return 'primary';
	};
	const getBBIT = useBiobit();

	return (
		<CompactRequestCard variant={getVariant()}>
			<Header onClick={() => setOpen((value) => !value)}>
				<Column flex="0 0 80px" alignSelf="flex-start">
					<RequestNumber>{requestID}</RequestNumber>
				</Column>
				<Column flex="1 1 530px">
					<Row>
						<Title>{title.length < 120 ? title : title.substr(0, 120) + '...'}</Title>
					</Row>
					<Row>
						{allApproved ? (
							<QuickReport variant="confirmed">{`all ${contributions.length} are confirmed.`}</QuickReport>
						) : (
							<>
								<QuickReportTitle variant="primary">{`${
									totalPending + totalConfirmed
								} files: `}</QuickReportTitle>
								<QuickReport variant="primary">{` ${totalConfirmed} approved, ${totalPending} pending `}</QuickReport>
							</>
						)}
					</Row>
				</Column>
				<Spacer />
				<Column displayFlex flex="0">
					<Row>
						<BiobitIcon src={biobitIcon} />
						<BiobitValue>{getBBIT(angelTokenPay, laboratoryTokenPay)[0]}</BiobitValue>
						<DollarValue>{`~ $${getBBIT(angelTokenPay, laboratoryTokenPay)[1]}`}</DollarValue>
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
								<TableCell>Contribution Role</TableCell>
							</TableCellWrapper>
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
								<TableCell>Reward Gainer</TableCell>
							</TableCellWrapper>
							<TableCellWrapper>
								<TableCell>Wage Status</TableCell>
							</TableCellWrapper>
						</TableRow>
						<TableBulkRow>
							{contributions.map(
								(
									{ originalIndex, timestamp, zarelaDay, status, angel, hub, rewardGainer },
									rowIndex
								) => {
									return (
										<TableRow key={originalIndex}>
											<TableCellWrapper>
												<TableCell>
													<IconListWrapper>
														{angel.toLowerCase() === account.toLowerCase() && <AngelIcon />}
														{hub.toLowerCase() === account.toLowerCase() && <HubIcon />}
													</IconListWrapper>
												</TableCell>
											</TableCellWrapper>
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
													<IconListWrapper>
														{rewardGainer === true ? (
															<>
																<AngelIcon />
																<RoleLabel>Angel</RoleLabel>
															</>
														) : (
															<>
																<HubIcon />
																<RoleLabel>Hub</RoleLabel>
															</>
														)}
													</IconListWrapper>
												</TableCell>
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
									);
								}
							)}
						</TableBulkRow>
					</Table>
				</Body>
			) : null}
		</CompactRequestCard>
	);
};

export default LogCard;
