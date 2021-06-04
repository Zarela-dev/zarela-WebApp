import React from 'react';
import styled from 'styled-components';
import { Spacer } from './Elements/Spacer';
import {
	ContributorsIcon,
	ContributorBadge,
	TokenIcon,
	TokenBadge,
} from './Elements/OrderCard';
import { Typography } from './Elements/Typography';
import biobitIcon from '../assets/icons/biobit.svg';
import contributorIcon from '../assets/icons/contributor.png';


const Wrapper = styled.div`
	background: ${props => props.seen ? '#EDFBF8' : '#F4F8FE'};
	opacity: 0.8;
	border-radius: 8px;
	padding: ${props => props.theme.spacing(3)} ${props => props.theme.spacing(3.5)};
	margin-bottom: ${props => props.theme.spacing(2)};
`;

const Header = styled.header`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
`;

const TotalBadge = styled.div`
	background: #2EECA8;
	min-width: 32px;
	height: 32px;
	padding: ${props => props.theme.spacing(0.8)} ${props => props.theme.spacing(0.6)};
	border-radius: 32px;

	font-weight: bold;
	font-size: 16px;
	line-height: 18px;
	color: white;
`;

const Divider = styled.div`
	width: 1px;
	background: #3C87AA;
	min-height: 37px;
	margin: 0 ${props => props.theme.spacing(1)};
`;

const Body = styled.section`

`;

const OrderListItem = ({orderId, title, tokenPay, contributors}) => {
	return (
		<Wrapper>
			<Header>
				<Typography variant='title' weight='semiBold'>
					{title}
				</Typography>
				<Spacer />
				<ContributorBadge>
					<ContributorsIcon src={contributorIcon} />
					<Typography weight='bold' color='secondary' variant='badge'>
						{contributors}
					</Typography>
				</ContributorBadge>
				<Divider />
				<TokenBadge>
					<TokenIcon src={biobitIcon} />
					<Typography weight='bold' color='secondary' variant='badge'>
						{tokenPay}
					</Typography>
					<Typography weight='bold' color='secondary' variant='badge'>
						BioBit
					</Typography>
				</TokenBadge>
				<Divider />
				<TotalBadge>
					223
				</TotalBadge>
			</Header>
		</Wrapper>
	);
};

export default OrderListItem;
