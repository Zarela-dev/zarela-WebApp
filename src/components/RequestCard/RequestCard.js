import React from 'react';
import RequestCardWrapper, {
	Footer,
	HeaderLayout,
	RequestNumber,
	Spacer,
	Divider,
	Description,
	Timestamp,
	ContributorBadge,
	ContributorsIcon,
	BiobitToDollarPair,
	BadgeRow,
	TokenIcon,
	TagsWrapper,
	TagItem,
	TokenValue,
	JoinButton,
	BiobitToDollarValue,
	ProgressTrackerWrapper,
	ProgressTrackerTrack,
	ProgressTrackerProcess,
	ValueLabel,
	BadgeLabel,
	Hint,
} from './../Elements/RequestCard';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import contributorIcon from '../../assets/icons/user-blue.svg';
import documentsIcon from '../../assets/icons/document-blue.svg';
import useBiobit from '../../hooks/useBiobit';
import { TYPOGRAPHY } from './../../theme';

const RequestCard = (props) => {
	const getBBIT = useBiobit();

	return (
		<RequestCardWrapper data-tour='request-list-one'>
			<HeaderLayout>
				<RequestNumber data-tour='request-list-two'>
					{props.requestID}
				</RequestNumber>
				<TYPOGRAPHY.headLine4 data-tour='request-list-three'>
					{props.title.length < 85
						? props.title
						: props.title.substr(0, 85) + '...'}
				</TYPOGRAPHY.headLine4>
				<Spacer />
			</HeaderLayout>
			<Timestamp nowrap variant='caption'>
				{props.timestamp}
			</Timestamp>
			<Description>
				<TYPOGRAPHY.body2 variant='body'>
					{props.description.length < 320
						? props.description
						: props.description.substr(0, 320) + '...'}
				</TYPOGRAPHY.body2>
				<TagsWrapper>
					{props.categories.split(',').map((item) => {
						return <TagItem key={item}>#{item}</TagItem>;
					})}
				</TagsWrapper>
			</Description>
			<ProgressTrackerWrapper>
				<ProgressTrackerTrack>
					<ProgressTrackerProcess progress={props.progress} />
				</ProgressTrackerTrack>
			</ProgressTrackerWrapper>
			<Footer>
				<BiobitToDollarPair data-tour='request-list-four'>
					<BadgeRow>
						<TokenIcon src={biobitIcon} />
						<TYPOGRAPHY.body1 bold pr={0.5}>
							{getBBIT(props.angelTokenPay, props.laboratoryTokenPay)[0]}
						</TYPOGRAPHY.body1>
						<TYPOGRAPHY.body2 bold>BBit</TYPOGRAPHY.body2>
					</BadgeRow>
					<BadgeRow>
						<TYPOGRAPHY.hint pl={1.5} active>{`~ $${
							getBBIT(props.angelTokenPay, props.laboratoryTokenPay)[1]
						}`}</TYPOGRAPHY.hint>
					</BadgeRow>
				</BiobitToDollarPair>
				<Divider />
				<ContributorBadge data-tour='request-list-five'>
					<BadgeRow>
						<ContributorsIcon src={documentsIcon} />
						<TYPOGRAPHY.hint fontSize='textBody2' bold active>
							{props.contributors}
						</TYPOGRAPHY.hint>
					</BadgeRow>
					<BadgeRow>
						<TYPOGRAPHY.hint active>No. of accepted responses</TYPOGRAPHY.hint>
					</BadgeRow>
				</ContributorBadge>
				<Divider />
				<ContributorBadge data-tour='request-list-six'>
					<BadgeRow>
						<ContributorsIcon src={contributorIcon} />
						<TYPOGRAPHY.hint fontSize='textBody2' bold active>
							{props.totalContributedCount}
						</TYPOGRAPHY.hint>
					</BadgeRow>
					<BadgeRow>
						<TYPOGRAPHY.hint active>No. of people contributed</TYPOGRAPHY.hint>
					</BadgeRow>
				</ContributorBadge>
				<Spacer />
				<JoinButton
					data-tour='request-list-seven'
					variant='secondary'
					to={`/request/${props.requestID}`}
				>
					Start
				</JoinButton>
			</Footer>
		</RequestCardWrapper>
	);
};

export default RequestCard;
