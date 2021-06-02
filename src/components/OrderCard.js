import React from 'react';
import OrderCardWrapper, {
	ProgressLayout,
	HeaderLayout,
	AvatarImage,
	Avatar,
	Typography,
	Spacer,
	Description,
	Bookmark,
	ContributorBadge,
	ContributorsIcon,
	TokenBadge,
	TokenIcon
} from './Elements/OrderCard';
import bookmarkIcon from '../assets/icons/bookmark.svg';
import biobitIcon from '../assets/icons/biobit.svg';
import avatarImage from '../assets/icons/avatar.png';
import contributorIcon from '../assets/icons/contributor.png';

const OrderCard = (props) => {
	return (
		<OrderCardWrapper>
			<HeaderLayout>
				<Avatar>
					<AvatarImage src={avatarImage} />
				</Avatar>
				<Typography weight='bold' variant='title'>
					{props.title}
				</Typography>
				<Spacer />
				<Typography nowrap variant='caption'>
					6 hours ago
				</Typography>
				<Bookmark src={bookmarkIcon} />
			</HeaderLayout>
			<Description>
				<Typography variant='body'>
					{props.description}
				</Typography>
			</Description>
			<ProgressLayout>
				<TokenBadge>
					<TokenIcon src={biobitIcon} />
					<Typography weight='bold' color='secondary' variant='badge'>
						{props.tokenPay}
					</Typography>
					<Typography weight='bold' color='secondary' variant='badge'>
						BioBit
					</Typography>
				</TokenBadge>
				<Spacer />
				<ContributorBadge>
					<ContributorsIcon src={contributorIcon} />
					<Typography weight='bold' color='secondary' variant='badge'>
						{props.contributors}
					</Typography>
				</ContributorBadge>
			</ProgressLayout>
		</OrderCardWrapper>
	);
};

export default OrderCard;
