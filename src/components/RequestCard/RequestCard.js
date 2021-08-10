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
	Bookmark,
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
import bookmarkIcon from '../../assets/icons/bookmark-purple.svg';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import contributorIcon from '../../assets/icons/user-blue.svg';
import documentsIcon from '../../assets/icons/document-blue.svg';

const RequestCard = (props) => {
	return (
		<RequestCardWrapper>
			<HeaderLayout>
				<RequestNumber>{props.requestID}</RequestNumber>
				<Title>
					{props.title.length < 85 ? props.title : props.title.substr(0, 85) + '...'}
				</Title>
				<Spacer />
				<Bookmark src={bookmarkIcon} />
			</HeaderLayout>
			<Timestamp nowrap variant="caption">
				{props.timestamp}
			</Timestamp>
			<Description>
				<Typography variant="body">
					{props.description.length < 320
						? props.description
						: props.description.substr(0, 320) + '...'}
				</Typography>
				<TagsWrapper>
					{props.categories.split(',').map((item, index) => {
						return <TagItem key={index}>#{item}</TagItem>;
					})}
				</TagsWrapper>
			</Description>
			<ProgressTrackerWrapper>
				<ProgressTrackerTrack>
					<ProgressTrackerProcess progress={props.progress} />
				</ProgressTrackerTrack>
			</ProgressTrackerWrapper>
			<Footer>
				<BiobitToDollarPair>
					<BadgeRow>
						<TokenIcon src={biobitIcon} />
						<TokenValue>{props.tokenPay}</TokenValue>
						<ValueLabel>BBit</ValueLabel>
					</BadgeRow>
					<BadgeRow>
						<BiobitToDollarValue>{`~ $ ${props.tokenPay}`}</BiobitToDollarValue>
					</BadgeRow>
				</BiobitToDollarPair>
				<Divider />
				<ContributorBadge>
					<BadgeRow>
						<ContributorsIcon src={documentsIcon} />
						<BadgeLabel>{props.contributors}</BadgeLabel>
					</BadgeRow>
					<BadgeRow>
						<Hint>No. of accepted responses</Hint>
					</BadgeRow>
				</ContributorBadge>
				<Divider />
				<ContributorBadge>
					<BadgeRow>
						<ContributorsIcon src={contributorIcon} />
						<BadgeLabel>{props.totalContributedCount}</BadgeLabel>
					</BadgeRow>
					<BadgeRow>
						<Hint>No. of people who contribute</Hint>
					</BadgeRow>
				</ContributorBadge>
				<Spacer />
				<JoinButton variant="secondary" to={`/request/${props.requestID}`}>
					Start
				</JoinButton>
			</Footer>
		</RequestCardWrapper>
	);
};

export default RequestCard;
