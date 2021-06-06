import styled from 'styled-components';
import { Typography } from '../Typography';
import { Link } from 'react-router-dom';

export const OrderCardWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	background: linear-gradient(220.57deg, rgba(107, 230, 238, 0.15) -15.95%, rgba(64, 76, 189, 0.15) 107.46%);
	border-radius: 8px;
	padding: ${props => props.theme.spacing(3)};

	margin-bottom: 25px;
	/* &:not(:last-child){
		margin-bottom: 25px;
	} */
`;

export const HeaderLayout = styled.div`
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	margin-bottom: ${props => props.theme.spacing(1.5)};
`;

export const Avatar = styled.div`
	flex: 0 0 100px;
	width: 100px;
	height: 100px;
	border: 2px solid #79AFC3;
	border-radius: 6px;
	/* padding: ${props => props.theme.spacing(0.5)}; */
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
	/* margin-bottom: ${props => props.theme.spacing(2.5)}; */
	line-height: 20px;
`;

export const Timestamp = styled(Typography)`
	text-align: right;
	font-size: 12px;
	line-height: 20px;
	color: ${props => props.theme.textPrimary};
`;

export const ProgressTrackerWrapper = styled.div`
	position: relative;
	top: -5px;
	width: 100%;
	height: 5px;
	overflow: hidden;
`;
export const ProgressTrackerTrack = styled.div`
	height: 100%;
	background: rgba(123, 139, 178, 0.26);
	border-radius: 24px;
`;

export const ProgressTrackerProcess = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: ${props => props.width + '%' || '0%'};
	background: #3C87AA;
	border-radius: 24px;
`;

export const Footer = styled.div`
	flex: 1 0 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin-top: ${props => props.theme.spacing(2)};
`;

export const TokenBadge = styled.div`
	display: flex;
	align-items: center;
`;

export const TokenValue = styled.div`
	font-weight: 600;
	font-size: 20px;
	line-height: 20px;
	color: #121213;
	margin-right: 3px;
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

export const Divider = styled.div`
	height: 26px;
	background: #3C87AA;
	width: 1px;
	margin: 0 ${props => props.theme.spacing(2)};
`;

export const JoinButton = styled(Link)`
	text-decoration: none;
	background: #FFFFFF;
	box-shadow: 0px 5.46667px 18px rgba(223, 236, 255, 0.5);
	border-radius: 5.46667px;
	border: 1px solid #BBBEE6;
	padding: ${props => props.theme.spacing(1)} ${props => props.theme.spacing(4)};
	color: #7246D0;
	line-height: 33px;
	font-weight: 500;
	font-size: 20px;
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