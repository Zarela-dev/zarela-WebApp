import React from 'react';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import contributorIcon from '../../assets/icons/contributor-new.svg';

import {
	CompactRequestCard,
	Row,
	Header,
	Column,
	BiobitIcon,
	DollarValue,
	BiobitValue,
	VerticalDivider,
	Title,
	QuickReport,
	RequestNumber,
	Timestamp,
	ContributorIcon,
	ContributorCount,
} from './Elements';
import { Spacer } from '../Elements/Spacer';
import { timeSince } from '../../utils';

const LogCard = ({ data }) => {
	const {
		requestID,
		title,
		angelTokenPay,
		laboratoryTokenPay,
		timestamp,
		totalContributors,
		totalContributed,
		totalContributedCount,
	} = data;
	const getVariant = () => {
		if (+totalContributedCount === 0) return 'primary';
		if (+totalContributed === +totalContributors) return 'confirmed'; // fulfilled
	};

	return (
		<CompactRequestCard variant={getVariant()}>
			<Header>
				<Column flex="0 0 80px" alignSelf="flex-start">
					<RequestNumber>{requestID}</RequestNumber>
				</Column>
				<Column flex="1 1 530px">
					<Row>
						<Title>{title.length < 120 ? title : title.substr(0, 120) + '...'}</Title>
					</Row>
					{+totalContributedCount === 0 ? (
						<Row>
							<QuickReport variant="primary">{`No one has contributed yet!`}</QuickReport>
						</Row>
					) : null}
				</Column>
				<Spacer />
				<VerticalDivider />
				<Timestamp>{timeSince(timestamp)}</Timestamp>
				<VerticalDivider />
				<Column displayFlex flex="0">
					<Row>
						<BiobitIcon src={biobitIcon} />
						<BiobitValue>{+angelTokenPay + +laboratoryTokenPay}</BiobitValue>
						<DollarValue>{`~ $${+angelTokenPay + +laboratoryTokenPay}`}</DollarValue>
					</Row>
				</Column>
				<VerticalDivider hide />
				<Column displayFlex flex="0">
					<Row>
						<ContributorIcon src={contributorIcon} />
						<ContributorCount>{totalContributors}</ContributorCount>
					</Row>
				</Column>
			</Header>
		</CompactRequestCard>
	);
};

export default LogCard;
