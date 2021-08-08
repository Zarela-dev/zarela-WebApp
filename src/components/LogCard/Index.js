import React from 'react';
import styled from 'styled-components';
// import {
// 	RequestNumber,
// 	HeaderLayout,
// 	Footer,
// 	TokenIcon,
// 	Bookmark,
// 	ContributorBadge,
// 	ContributorsIcon,
// 	Divider,
// 	BadgeRow,
// 	Title,
// 	BadgeLabel,
// } from "../Elements/RequestCard/IndexMobile";

import maxWidthWrapper from '../Elements/MaxWidth';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import contributorIcon from '../../assets/icons/user-black.svg';
import bookmarkIcon from '../../assets/icons/bookmark-purple.svg';
import approvedIcon from '../../assets/icons/check-green.svg';
import unapprovedIcon from '../../assets/icons/pending.svg';
import caretDownIcon from '../../assets/icons/caret-down.svg';
import caretUpIcon from '../../assets/icons/caret-up.svg';

import {
	CompactRequestCard,
	Row,
	Header,
	Body,
	Section,
	Column,
	BiobitIcon,
	DollarValue,
	CaretIcon,
	StatusIcon,
	ContributorIcon,
	BookmarkIcon,
	StatusLabel,
	BiobitValue,
	VerticalDivider,
	ContributorCount,
	Title,
	Timestamp,
	QuickReport,
	RequestNumber,
	Table,
	TableCellWrapper,
	TableCell,
	TableRow,
	TableBulkRow,
} from './Elements';
import { Spacer } from '../Elements/Spacer';

/* const CustomRequestNumber = styled(RequestNumber)`
	flex: 0 0 79px;
	height: 50px;
	border-radius: 10px 10px 0px 10px;
	padding: 10px 20px;
	margin-right: ${(props) => props.theme.spacing(2)};
	font-weight: 700;
	background: linear-gradient(246.29deg, #3a68de 12.69%, #3a68de 100%);
	font-size: 32px;
	line-height: 30px;
	color: #ffffff;
	text-align: center;
`;

const HeaderContainer = styled.header`
	background: #f4f8fe;
	border-radius: 8px;
	padding: 13px 21px;
	width: 100%;
	margin-bottom: 10px;
`;

const HeaderInner = styled(HeaderLayout)`
	display: flex;
	flex-direction: row;
	${maxWidthWrapper};
	width: 100%;
	justify-content: space-between;
`;

const HeaderLayoutCustom = styled(HeaderLayout)`
	width: unset;
	flex-grow: 1;
`;

const CustomFooter = styled(Footer)`
	margin-top: ${(props) => props.theme.spacing(0)};
	padding-left: 0;
	flex-wrap: nowrap;
`;

const CustomBadgeRow = styled(BadgeRow)`
	flex: 0;
	align-items: center;
`;

const TitleContent = styled(Title)`
	font-size: 14px;
	font-weight: 600;
	line-heigh: 16.5px;
	margin-bottom: 5px;
`;

const CustomDivider = styled(Divider)`
	height: 48px;
	background-color: rgba(60, 135, 170, 0.6);
	margin: 0 20px;
`;

const BodyContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const HashContent = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const HashBody = styled.div`
	word-break: break-all;
	font-size: 12px;
	font-weight: 500;
	color: #3a68de;
	line-height: 16px;
`;

const HashTitle = styled(HashBody)`
	font-size: 14px;
	font-weight: 400;
	line-height: 20px;
	color: #121213;
	margin-right: 6px;
	align-items: center;
`;

const CustomContributorBadge = styled(ContributorBadge)`
	margin-right: ${(props) => (props.nomargin ? 0 : '25px')};
	min-width: ${(props) => (props.nomargin ? '90px' : 'unset')};
`;

const ContributorsIconMobile = styled(ContributorsIcon)`
	width: 18px;
	height: 18px;
`;
const ToeknIconMobile = styled(TokenIcon)`
	width: 20px;
	height: 20px;
`;

const BadgeLabelTimeMobile = styled(BadgeLabel)`
	font-size: 14px;
	line-height: 20px;
	font-weight: ${(props) => (props.subHeader ? 400 : 700)};
	color: ${(props) => (props.success ? 'rgba(27, 204, 141, 1)' : props.pending && 'rgba(133, 133, 133, 1)')};
`;

const BadgeLabelContributors = styled(BadgeLabel)`
	font-size: 16px;
	line-height: 18px;
	font-weight: ${(props) => (props.highlight ? 700 : 400)};
	min-width: ${(props) => props.minWidth && '60px'};
	white-space: nowrap;
	color: ${(props) => (props.highlight ? '#3A68DE' : '')};
`;

const ContentWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-grow: 1;
`;
const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const ItemInformation = styled.div`
	display: flex;
	justify-self: self-end;
`;
const BookmarkIconWrapper = styled(Bookmark)`
	align-self: center;
`;

const SubHeaderRow = styled.div`
	display: flex;
	justify-content: flex-start;
`; */

const LogCard = ({ MyRequests, marketRequest, allApproved }) => {
	return (
		<CompactRequestCard>
			<Header>
				<Column flex="0 0 80px" alignSelf="flex-start">
					<RequestNumber>2556698</RequestNumber>
				</Column>
				<Column flex="1 1 530px">
					<Row>
						<Title>title goes here</Title>
					</Row>
					<Row>
						<QuickReport bold>{`${3} files: `}</QuickReport>
						<QuickReport>{` ${2} approved, ${1} pending `}</QuickReport>
					</Row>
				</Column>
				<Spacer />
				<Column displayFlex>
					<Row>
						<BiobitIcon src={biobitIcon} />
						<BiobitValue>12</BiobitValue>
						<DollarValue>~ $21.33403</DollarValue>
					</Row>
				</Column>
				<VerticalDivider />
				<Column>
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
				<Column flex="0">
					{true ? <CaretIcon src={caretDownIcon} /> : <CaretIcon src={caretUpIcon} />}
				</Column>
			</Header>
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
						{Array(3)
							.fill(null)
							.map((contributorAddress, index) => (
								<TableRow key={contributorAddress}>
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
							))}
					</TableBulkRow>
				</Table>
			</Body>
		</CompactRequestCard>
	);
};

export default LogCard;
