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

const LogCard = ({ data, account, paymentDay }) => {
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
			<Row onClick={() => setOpen((value) => !value)} alignItems="center" width="100%">
				<Col flex="0 0 80px" mr={3} alignSelf="flex-start">
					<IdLabel>{requestID}</IdLabel>
				</Col>
				<Col flex="0 1 50%" width="50%">
					<Row>
						<BodyText
							variant="small"
							fontWeight="semiBold"
							as={undefined}
							sx={{
								display: 'inline-block',
								width: '80%',
								whiteSpace: 'nowrap',
								overflow: 'hidden !important',
								textOverflow: 'ellipsis',
							}}
						>
							{title + title}
						</BodyText>
					</Row>
					<Row>
						<Col sx={{ whiteSpace: 'nowrap' }}>
							{allApproved ? (
								<BodyText variant="extraSmall" color="success">{`all ${contributions.length} are confirmed.`}</BodyText>
							) : (
								<>
									<BodyText variant="extraSmall" color="bgBadge">{`${totalPending + totalConfirmed} files: `}</BodyText>
									<QuickReport variant="primary">{` ${totalConfirmed} approved, ${totalPending} pending `}</QuickReport>
								</>
							)}
						</Col>
					</Row>
				</Col>
				<Col flex={1} />
				<Col>
					<Row>
						<ThemeIcon variant="big" src={biobitIcon} />
						<BodyText variant="small">{getBBIT(angelTokenPay, laboratoryTokenPay)[0]}</BodyText>
						<BodyText variant="small">{`~ $${getBBIT(angelTokenPay, laboratoryTokenPay)[1]}`}</BodyText>
					</Row>
				</Col>
				<ThemeDivider variant="vertical" />
				<Col pr={4}>
					<Row>
						{allApproved ? (
							<>
								<ThemeIcon variant="big" src={approvedIcon} />
								<Header as="h5" variant="heading5" color="success">
									Confirmed
								</Header>
							</>
						) : (
							<>
								<ThemeIcon variant="big" src={unapprovedIcon} />
								<Header as="h5" variant="heading5" color="textTimestamp">
									Pending
								</Header>
							</>
						)}
					</Row>
				</Col>
				<Col flex="0">{true ? <CaretIcon src={caretDownIcon} /> : <CaretIcon src={caretUpIcon} />}</Col>
			</Row>
			{isOpen ? (
				<Body>
					<Table>
						<TableRow header>
							<TableCellWrapper>
								<TableCell>
									<BodyText variant="extraSmall">File Names</BodyText>
								</TableCell>
							</TableCellWrapper>
							<TableCellWrapper>
								<TableCell>
									<BodyText variant="extraSmall">Date</BodyText>
								</TableCell>
							</TableCellWrapper>
							<TableCellWrapper>
								<TableCell>
									<BodyText variant="extraSmall">Reward</BodyText>
								</TableCell>
							</TableCellWrapper>
							<TableCellWrapper>
								<TableCell>
									<BodyText variant="extraSmall">Wage</BodyText>
								</TableCell>
							</TableCellWrapper>
						</TableRow>
						<TableBulkRow>
							{contributions.map(
								({ originalIndex, timestamp, zarelaDay, status, angel, hub, rewardGainer, ...rest }, rowIndex) => {
									return (
										<TableRow key={originalIndex}>
											<TableCellWrapper>
												<TableCell>{`${rowIndex + 1}. File #${originalIndex}`}</TableCell>
											</TableCellWrapper>
											<TableCellWrapper>
												<TableCell>{timeSince(timestamp)}</TableCell>
											</TableCellWrapper>
											<TableCellWrapper>
												<TableCell>
													<Row>
														<Col>
															{rewardGainer === true ? (
																<Row mb={1}>
																	<ThemeIcon height="auto !important" variant="big" src={angelIcon} />
																	<BodyText variant="small">{'Angel 50 BBIT'}</BodyText>
																	<BodyText
																		ml={2}
																		variant="small"
																		color={+paymentDay > zarelaDay ? 'success' : 'orange'}
																	>
																		{+paymentDay > zarelaDay ? 'Received' : 'Pending'}
																	</BodyText>
																</Row>
															) : (
																<Row>
																	<ThemeIcon height="auto !important" variant="big" src={hubIcon} />
																	<BodyText variant="small">{'Hub 50 BBIT'}</BodyText>
																	<BodyText
																		ml={2}
																		variant="small"
																		color={+paymentDay > zarelaDay ? 'success' : 'orange'}
																	>
																		{+paymentDay > zarelaDay ? 'Received' : 'Pending'}
																	</BodyText>
																</Row>
															)}
														</Col>
													</Row>
												</TableCell>
											</TableCellWrapper>
											<TableCellWrapper>
												<TableCell>
													<Row>
														<Col>
															{angel.toLowerCase() === account.toLowerCase() && (
																<Row mb={1}>
																	<ThemeIcon height="auto !important" variant="big" src={angelIcon} />
																	<BodyText variant="small">{`Angel ${data.angelTokenPay} BBIT`}</BodyText>
																	<BodyText ml={2} variant="small" color={status ? 'success' : 'orange'}>
																		{status ? 'Received' : 'Pending'}
																	</BodyText>
																</Row>
															)}
															{hub.toLowerCase() === account.toLowerCase() && (
																<Row>
																	<ThemeIcon height="auto !important" variant="big" src={hubIcon} />
																	<BodyText variant="small">{`Hub ${data.laboratoryTokenPay} BBIT`}</BodyText>
																	<BodyText ml={2} variant="small" color={status ? 'success' : 'orange'}>
																		{status ? 'Received' : 'Pending'}
																	</BodyText>
																</Row>
															)}
														</Col>
													</Row>
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
