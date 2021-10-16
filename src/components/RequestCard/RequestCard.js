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
import {TYPOGRAPHY} from './../Elements/Typography';

const RequestCard = (props) => {
	const getBBIT = useBiobit();

	return (
		<RequestCardWrapper data-tour='request-list-one'>
			<HeaderLayout>
				<RequestNumber data-tour='request-list-two'>
					<TYPOGRAPHY.HeadLine4 label bold>{props.requestID}</TYPOGRAPHY.HeadLine4>
				</RequestNumber>
				<TYPOGRAPHY.HeadLine4 data-tour='request-list-three'>
					{props.title.length < 85
						? props.title
						: props.title.substr(0, 85) + '...'}
				</TYPOGRAPHY.HeadLine4>
				<Spacer />
			</HeaderLayout>
			<TYPOGRAPHY.Timestamp ml={12} mb={1.5} nowrap variant='caption'>
				{props.timestamp}
			</TYPOGRAPHY.Timestamp>
			<Description>
				<TYPOGRAPHY.Body2 variant='body'>
					{props.description.length < 320
						? props.description
						: props.description.substr(0, 320) + '...'}
				</TYPOGRAPHY.Body2>
				<TagsWrapper>
					{props.categories.split(',').map((item) => {
						return (
							<TagItem key={item}>
								<TYPOGRAPHY.Tag>#{item}</TYPOGRAPHY.Tag>
							</TagItem>
						);
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
						<TYPOGRAPHY.Body1 bold pr={0.5}>
							{getBBIT(props.angelTokenPay, props.laboratoryTokenPay)[0]}
						</TYPOGRAPHY.Body1>
						<TYPOGRAPHY.Body2 bold>BBit</TYPOGRAPHY.Body2>
					</BadgeRow>
					<BadgeRow>
						<TYPOGRAPHY.Hint pl={1.5} active>{`~ $${
							getBBIT(props.angelTokenPay, props.laboratoryTokenPay)[1]
						}`}</TYPOGRAPHY.Hint>
					</BadgeRow>
				</BiobitToDollarPair>
				<Divider />
				<ContributorBadge data-tour='request-list-five'>
					<BadgeRow>
						<ContributorsIcon src={documentsIcon} />
						<TYPOGRAPHY.Hint fontSize='textBody2' bold active>
							{props.contributors}
						</TYPOGRAPHY.Hint>
					</BadgeRow>
					<BadgeRow>
						<TYPOGRAPHY.Hint active>No. of accepted responses</TYPOGRAPHY.Hint>
					</BadgeRow>
				</ContributorBadge>
				<Divider />
				<ContributorBadge data-tour='request-list-six'>
					<BadgeRow>
						<ContributorsIcon src={contributorIcon} />
						<TYPOGRAPHY.Hint fontSize='textBody2' bold active>
							{props.totalContributedCount}
						</TYPOGRAPHY.Hint>
					</BadgeRow>
					<BadgeRow>
						<TYPOGRAPHY.Hint active>No. of people contributed</TYPOGRAPHY.Hint>
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
