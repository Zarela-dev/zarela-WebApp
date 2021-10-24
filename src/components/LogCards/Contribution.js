import React, { useState } from 'react';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import approvedIcon from '../../assets/icons/check-green.svg';
import unapprovedIcon from '../../assets/icons/pending.svg';
import caretDownIcon from '../../assets/icons/caret-down.svg';
import caretUpIcon from '../../assets/icons/caret-up.svg';
import { IdLabel } from './../Elements/IdLabel';
import { Header, BodyText } from './../Elements/Typography';
import { Row, Col } from './../Elements/Flex';
import { ThemeIcon } from './../Elements/Icon';
import { ThemeDivider } from './../Elements/Divider';
import hubIcon from '../../assets/icons/hub.png';
import angelIcon from '../../assets/icons/angel.png';

import {
	CompactRequestCard,
	// Row,
	// Header,
	Body,
	Column,
	CaretIcon,
	QuickReport,
	Table,
	TableCellWrapper,
	TableCell,
	TableRow,
	TableBulkRow,
	IconListWrapper,
	HubIcon,
	AngelIcon,
} from './Elements';
import { timeSince } from '../../utils';
import useBiobit from '../../hooks/useBiobit';

const LogCard = ({ data, account }) => {
	const {
		requestID,
		title,
		angelTokenPay,
		laboratoryTokenPay,
		contributions,
	} = data;
	const [isOpen, setOpen] = useState(false);
	const totalPending = contributions.filter((item) => item.status === false)
		.length;
	const totalConfirmed = contributions.filter((item) => item.status === true)
		.length;
	const allApproved = contributions.length === totalConfirmed;
	const getVariant = () => {
		if (allApproved) return 'confirmed';
		if (contributions.length !== totalConfirmed) return 'primary';
	};
	const getBBIT = useBiobit();

	return (
		<CompactRequestCard variant={getVariant()}>
			<Row
				onClick={() => setOpen((value) => !value)}
				alignItems='center'
				width='100%'
			>
				<Col flex='0 0 80px' mr={3} alignSelf='flex-start'>
					<IdLabel>{requestID}</IdLabel>
				</Col>
				<Col flex='1 1 530px'>
					<Row>
						<BodyText variant='small' fontWeight='semiBold'>
							{title.length < 120 ? title : title.substr(0, 120) + '...'}
						</BodyText>
					</Row>
					<Row>
						{allApproved ? (
							<BodyText
								variant='extraSmall'
								color='success'
							>{`all ${contributions.length} are confirmed.`}</BodyText>
						) : (
							<>
								<BodyText variant='extraSmall' color='bgBadge'>{`${
									totalPending + totalConfirmed
								} files: `}</BodyText>
								<QuickReport variant='primary'>{` ${totalConfirmed} approved, ${totalPending} pending `}</QuickReport>
							</>
						)}
					</Row>
				</Col>
				<Col>
					<Row>
						<ThemeIcon variant='big' src={biobitIcon} />
						<BodyText variant='small'>
							{getBBIT(angelTokenPay, laboratoryTokenPay)[0]}
						</BodyText>
						<BodyText variant='small'>{`~ $${
							getBBIT(angelTokenPay, laboratoryTokenPay)[1]
						}`}</BodyText>
					</Row>
				</Col>
				<ThemeDivider variant='vertical' />
				<Col>
					<Row>
						{allApproved ? (
							<>
								<ThemeIcon variant='big' src={approvedIcon} />
								<Header as='h5' variant='heading5' color='success'>
									Confirmed
								</Header>
							</>
						) : (
							<>
								<ThemeIcon variant='big' src={unapprovedIcon} />
								<Header as='h5' variant='heading5' color='textTimestamp'>
									Pending
								</Header>
							</>
						)}
					</Row>
				</Col>
				<Column flex='0'>
					{true ? (
						<CaretIcon src={caretDownIcon} />
					) : (
						<CaretIcon src={caretUpIcon} />
					)}
				</Column>
			</Row>
			{isOpen ? (
				<Body>
					<Table>
						<TableRow header>
							<TableCellWrapper>
								<TableCell>
									<BodyText variant='extraSmall'>Contribution Role</BodyText>
								</TableCell>
							</TableCellWrapper>
							<TableCellWrapper>
								<TableCell>
									<BodyText variant='extraSmall'>File Names</BodyText>
								</TableCell>
							</TableCellWrapper>
							<TableCellWrapper>
								<TableCell>
									<BodyText variant='extraSmall'>Date</BodyText>
								</TableCell>
							</TableCellWrapper>
							<TableCellWrapper>
								<TableCell>
									<BodyText variant='extraSmall'>Zarela Day</BodyText>
								</TableCell>
							</TableCellWrapper>
							<TableCellWrapper>
								<TableCell>
									<BodyText variant='extraSmall'>Reward Gainer</BodyText>
								</TableCell>
							</TableCellWrapper>
							<TableCellWrapper>
								<TableCell>
									<BodyText variant='extraSmall'>Wage Status</BodyText>
								</TableCell>
							</TableCellWrapper>
						</TableRow>
						<TableBulkRow>
							{contributions.map(
								(
									{
										originalIndex,
										timestamp,
										zarelaDay,
										status,
										angel,
										hub,
										rewardGainer,
									},
									rowIndex
								) => {
									return (
										<TableRow key={originalIndex}>
											<TableCellWrapper>
												<TableCell>
													<IconListWrapper>
														{angel.toLowerCase() === account.toLowerCase() && (
															<AngelIcon />
														)}
														{hub.toLowerCase() === account.toLowerCase() && (
															<HubIcon />
														)}
													</IconListWrapper>
												</TableCell>
											</TableCellWrapper>
											<TableCellWrapper>
												<TableCell>{`${
													rowIndex + 1
												}. File #${originalIndex}`}</TableCell>
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
																<ThemeIcon variant='big' src={angelIcon} />
																<BodyText variant='small'>Angel</BodyText>
															</>
														) : (
															<>
																<ThemeIcon variant='big' src={hubIcon} />
																<BodyText variant='small'>Hub</BodyText>
															</>
														)}
													</IconListWrapper>
												</TableCell>
											</TableCellWrapper>
											<TableCellWrapper>
												<TableCell>
													{status ? (
														<>
															<ThemeIcon variant='big' src={approvedIcon} />
															<BodyText
																variant='small'
																color='success'
																fontWeight='bold'
																approved
															>
																Confirmed
															</BodyText>
														</>
													) : (
														<>
															<ThemeIcon variant='big' src={unapprovedIcon} />
															<BodyText
																variant='small'
																color='error'
																fontWeight='bold'
																color='textTimestamp'
															>
																Pending
															</BodyText>
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
