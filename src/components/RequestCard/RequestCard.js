import React from 'react';
import RequestCardWrapper, {
	Footer,
	HeaderLayout,
	RequestNumber,
	Typography,
	Title,
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

const RequestCard = (props) => {
	return (
		<RequestCardWrapper data-tour="request-list-one">
			<HeaderLayout>
				<RequestNumber data-tour="request-list-two">{props.requestID}</RequestNumber>
				<Title data-tour="request-list-three">
					{props.title.length < 85 ? props.title : props.title.substr(0, 85) + '...'}
				</Title>
				<Spacer />
			</HeaderLayout>
			<Timestamp nowrap variant="caption">
				{props.timestamp}
			</Timestamp>
			<Description>
				<Typography variant="body">
					{props.description.length < 320 ? props.description : props.description.substr(0, 320) + '...'}
				</Typography>
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
				<BiobitToDollarPair data-tour="request-list-four">
					<BadgeRow>
						<TokenIcon src={biobitIcon} />
						<TokenValue>{+props.angelTokenPay + +props.laboratoryTokenPay}</TokenValue>
						<ValueLabel>BBit</ValueLabel>
					</BadgeRow>
					<BadgeRow>
						<BiobitToDollarValue>{`~ $ ${
							+props.angelTokenPay + +props.laboratoryTokenPay
						}`}</BiobitToDollarValue>
					</BadgeRow>
				</BiobitToDollarPair>
				<Divider />
				<ContributorBadge data-tour="request-list-five">
					<BadgeRow>
						<ContributorsIcon src={documentsIcon} />
						<BadgeLabel>{props.contributors}</BadgeLabel>
					</BadgeRow>
					<BadgeRow>
						<Hint>No. of accepted responses</Hint>
					</BadgeRow>
				</ContributorBadge>
				<Divider />
				<ContributorBadge data-tour="request-list-six">
					<BadgeRow>
						<ContributorsIcon src={contributorIcon} />
						<BadgeLabel>{props.totalContributedCount}</BadgeLabel>
					</BadgeRow>
					<BadgeRow>
						<Hint>No. of people who contribute</Hint>
					</BadgeRow>
				</ContributorBadge>
				<Spacer />
				<JoinButton data-tour="request-list-seven" variant="secondary" to={`/request/${props.requestID}`}>
					Start
				</JoinButton>
			</Footer>
		</RequestCardWrapper>
	);
};

export default RequestCard;
