import React from 'react';
import OrderCardWrapper, {
	Footer,
	HeaderLayout,
	AvatarImage,
	Avatar,
	Typography,
	Spacer,
	Divider,
	Description,
	Timestamp,
	Bookmark,
	ContributorBadge,
	ContributorsIcon,
	TokenBadge,
	TokenIcon,
	TokenValue,
	JoinButton,
	ProgressTrackerWrapper,
	ProgressTrackerTrack,
	ProgressTrackerProcess
} from './Elements/OrderCard';
import bookmarkIcon from '../assets/icons/bookmark.svg';
import biobitIcon from '../assets/icons/biobit-black.svg';
import avatarImage0 from '../assets/avatar/avatar-0.jpg';
import avatarImage1 from '../assets/avatar/avatar-1.jpg';
import avatarImage2 from '../assets/avatar/avatar-2.jpg';
import avatarImage3 from '../assets/avatar/avatar-3.jpg';
import contributorIcon from '../assets/icons/contributor.png';
import confirmIcon from '../assets/icons/confirm.svg';

const OrderCard = (props) => {
	let avatarImage = [avatarImage0, avatarImage1, avatarImage2, avatarImage3];
	return (
		<OrderCardWrapper>
			<HeaderLayout>
				<Avatar>
					<AvatarImage src={avatarImage[Math.floor(Math.random() * 4)]} />
				</Avatar>
				<Typography weight='bold' variant='title'>
					{props.title.length < 140 ? props.title : props.title.substr(0, 140) + '...'}
				</Typography>
				<Spacer />
				<Bookmark src={bookmarkIcon} />
			</HeaderLayout>
			<Description>
				<Typography variant='body'>
					{props.description.length < 405 ? props.description : props.description.substr(0, 405) + '...'}
				</Typography>
				<Timestamp nowrap variant='caption'>
					{props.timestamp}
				</Timestamp>
			</Description>
			<ProgressTrackerWrapper>
				<ProgressTrackerTrack>
					<ProgressTrackerProcess width={props.progress} />
				</ProgressTrackerTrack>
			</ProgressTrackerWrapper>
			<Footer>
				<TokenBadge>
					<TokenIcon src={biobitIcon} />
					<TokenValue>
						{props.tokenPay}
					</TokenValue>
					<Typography weight='bold' color='primary' variant='badge'>
						BioBit
					</Typography>
				</TokenBadge>
				<Divider />
				<ContributorBadge>
					<ContributorsIcon src={contributorIcon} />
					<Typography weight='bold' color='secondary' variant='badge'>
						{props.contributors}
					</Typography>
				</ContributorBadge>
				<Divider />
				<ContributorBadge>
					<ContributorsIcon src={confirmIcon} />
					<Typography weight='bold' color='secondary' variant='badge'>
						{props.totalContributedCount}
					</Typography>
				</ContributorBadge>
				<Spacer />
				<JoinButton to={`/order/${props.orderId}`}>
					Contribute
				</JoinButton>
			</Footer>
		</OrderCardWrapper>
	);
};

export default OrderCard;
