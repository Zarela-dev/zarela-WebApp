import styled from 'styled-components';
import { Typography } from '../Elements/Typography';

export const OrderCardWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	background: linear-gradient(220.57deg, rgba(107, 230, 238, 0.15) -15.95%, rgba(64, 76, 189, 0.15) 107.46%);
	border-radius: 8px;
	padding: ${props => props.theme.spacing(3)};

	&:not(:last-child){
		margin-bottom: 25px;
	}
`;

export const HeaderLayout = styled.div`
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	margin-bottom: ${props => props.theme.spacing(1.5)};
`;

export const Avatar = styled.div`
	flex: 0 0 70px;
	width: 70px;
	height: 70px;
	border: 2px solid #79AFC3;
	border-radius: 6px;
	padding: ${props => props.theme.spacing(0.5)};
	margin-right: ${props => props.theme.spacing(2)};
`;

export const AvatarImage = styled.img`
	width: 100%;
	border-radius: 4px;
`;

export const Bookmark = styled.img`
	width: 16px;
	height: 20px;
	margin-left: ${props => props.theme.spacing(0.5)};
`;

export const Description = styled.div`
	flex: 1 0 100%;
	background: rgba(255, 255, 255, 0.7);
	border-radius: 5px;
	padding: ${props => props.theme.spacing(1)} ${props => props.theme.spacing(1.5)};
	margin-bottom: ${props => props.theme.spacing(2.5)};
	line-height: 20px;
`;

export const ProgressLayout = styled.div`
	flex: 1 0 100%;
	display: flex;
	flex-wrap: wrap;
`;

export const TokenBadge = styled.div`
	display: flex;
	align-items: center;
`;

export const ContributorBadge = styled.div`
	display: flex;
	align-items: flex-end;
`;

export const TokenIcon = styled.img`
	width: 18px;
	height: 18px;
	margin-right: ${props => props.theme.spacing(0.5)};
`;

export const ContributorsIcon = styled.img`
	width: 18px;
	height: 18px;
	margin-right: ${props => props.theme.spacing(0.5)};
`;

export const Spacer = styled.div`
	flex: 1;
`;

export default OrderCardWrapper;
export {
	// Avatar,
	// Bookmark,
	// Description,
	Typography,
	// ProgressLayout,
	// TokenIcon,
	// Spacer,
	// AvatarImage,
	// HeaderLayout
};