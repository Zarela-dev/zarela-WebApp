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
import { Header, BodyText } from './../Elements/Typography';
import { ThemeButton } from './../Elements/Button';
import { ThemeDivider } from './../Elements/Divider';
import { IdLabel } from '../Elements/IdLabel';

const RequestCard = (props) => {
	const getBBIT = useBiobit();

	return (
		<RequestCardWrapper data-tour='request-list-one'>
			<HeaderLayout>
				<IdLabel data-tour='request-list-two'>{props.requestID}</IdLabel>
				<Header variant='heading4' as='h4' data-tour='request-list-three'>
					{props.title.length < 85
						? props.title
						: props.title.substr(0, 85) + '...'}
				</Header>
				<Spacer />
			</HeaderLayout>
			<BodyText variant='timestamp' as='span' ml={90} mb={15}>
				{props.timestamp}
			</BodyText>
			<Description>
				<BodyText variant='big'>
					{props.description.length < 320
						? props.description
						: props.description.substr(0, 320) + '...'}
				</BodyText>
				<TagsWrapper>
					{props.categories.split(',').map((item) => {
						return (
							<TagItem key={item}>
								<BodyText variant='tag'>#{item}</BodyText>
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
						<BodyText variant='hint' fontWeight='bold' pr={1}>
							{getBBIT(props.angelTokenPay, props.laboratoryTokenPay)[0]}
						</BodyText>
						<BodyText bold>BBit</BodyText>
					</BadgeRow>
					<BadgeRow>
						<BodyText variant='hint' color='textToken' pl={1.5} active>{`~ $${
							getBBIT(props.angelTokenPay, props.laboratoryTokenPay)[1]
						}`}</BodyText>
					</BadgeRow>
				</BiobitToDollarPair>
				<Divider />
				<ContributorBadge data-tour='request-list-five'>
					<BadgeRow>
						<ContributorsIcon src={documentsIcon} />
						<BodyText variant='hint' color='textToken' fontWeight='bold'>
							{props.contributors}
						</BodyText>
					</BadgeRow>
					<BadgeRow>
						<BodyText variant='hint' color='textToken'>
							No. of accepted responses
						</BodyText>
					</BadgeRow>
				</ContributorBadge>
				<ThemeDivider variant='vertical' />
				<ContributorBadge data-tour='request-list-six'>
					<BadgeRow>
						<ContributorsIcon src={contributorIcon} />
						<BodyText variant='hint' color='textToken' fontWeight='bold'>
							{props.totalContributedCount}
						</BodyText>
					</BadgeRow>
					<BadgeRow>
						<BodyText variant='hint' color='textToken'>
							No. of people contributed
						</BodyText>
					</BadgeRow>
				</ContributorBadge>
				<Spacer />
				<ThemeButton
					data-tour='request-list-seven'
					variant='secondary'
					size='normal'
					// onClick={() => console.log('onClicked')}
					to={`/request/${props.requestID}`}
					// disabled
				>
					Start
				</ThemeButton>
			</Footer>
		</RequestCardWrapper>
	);
};

export default RequestCard;
