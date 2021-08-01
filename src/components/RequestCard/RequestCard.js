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
	TokenValue,
	JoinButton,
	BiobitToDollarValue,
	ProgressTrackerWrapper,
	ProgressTrackerTrack,
	ProgressTrackerProcess,
	ValueLabel,
	BadgeLabel,
	Hint
} from './../Elements/RequestCard';
import bookmarkIcon from '../../assets/icons/bookmark-purple.svg';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import contributorIcon from '../../assets/icons/user-blue.svg';
import documentsIcon from '../../assets/icons/document-blue.svg';
import dollarIcon from '../../assets/icons/dollar-blue.svg';

const RequestCard = (props) => {
	return (
		<RequestCardWrapper>
			<HeaderLayout>
				<RequestNumber>
					{props.requestID}
				</RequestNumber>
				<Title>
					{props.title.length < 115 ? props.title : props.title.substr(0, 115) + '...'}
				</Title>
				<Spacer />
				<Bookmark src={bookmarkIcon} />
			</HeaderLayout>
			<Timestamp nowrap variant='caption'>
				{props.timestamp}
			</Timestamp>
			<Description>
				<Typography variant='body'>
					{props.description.length < 405 ? props.description : props.description.substr(0, 405) + '...'}
				</Typography>
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
						<TokenValue>
							{props.tokenPay}
						</TokenValue>
						<ValueLabel>
							BBit
						</ValueLabel>
					</BadgeRow>
					<BadgeRow>
						<BiobitToDollarValue>
							{`~ $ ${props.tokenPay}`}
						</BiobitToDollarValue>
					</BadgeRow>
				</BiobitToDollarPair>
				<Divider />
				<ContributorBadge>
					<BadgeRow>
						<ContributorsIcon src={documentsIcon} />
						<BadgeLabel>
							{props.contributors}
						</BadgeLabel>
					</BadgeRow>
					<BadgeRow>
						<Hint>
							No. of accepted docs
						</Hint>
					</BadgeRow>
				</ContributorBadge>
				<Divider />
				<ContributorBadge>
					<BadgeRow>
						<ContributorsIcon src={contributorIcon} />
						<BadgeLabel>
							{props.totalContributedCount}
						</BadgeLabel>
					</BadgeRow>
					<BadgeRow>
						<Hint>
							No. of people who contribute
						</Hint>
					</BadgeRow>
				</ContributorBadge>
				<Spacer />
				<JoinButton variant='secondary' to={`/request/${props.requestID}`}>
					Join
				</JoinButton>
			</Footer>
		</RequestCardWrapper>
	);
};

export default RequestCard;