import styled from 'styled-components';
import { Typography } from '../Typography';
import { GenericLinkButton } from '../Button';

export const RequestCardWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	background: white;
	border: 1px solid #c4c4c4;
	border-radius: 8px;
	padding: ${({ theme }) => theme.space[3]}px;
	margin-bottom: ${({ theme }) => theme.space[3]}px;
`;

export const HeaderLayout = styled.div`
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
`;

export const RequestNumber = styled.div`
	height: 26px;
	width: 38px;
	margin-right: ${(props) => props.theme.spacing(1.5)};
	padding: 5px 10px;
	border-radius: 5px 5px 0 5px;
	background: ${(props) =>
		`linear-gradient(246.29deg, ${props.theme.colors.textToken} 12.69%, ${props.theme.colors.textToken} 100%)`};
	text-align: center;
`;
export const Title = styled.div`
	font-weight: 600;
	font-size: 14px;
	line-height: 20px;
	padding-right: 20px;
	color: ${(props) => props.theme.textPrimary};
`;

export const Description = styled.div`
	margin-top: ${(props) => props.theme.spacing(2)};
	flex: 1 0 100%;
	background: #eaf1fa;
	border-radius: 5px 5px 0 0;
	padding: ${(props) => props.theme.spacing(2)};
	font-weight: 400;
	font-size: 12px;
	line-height: 20px;
	text-align: justify;
	color: ${(props) => props.theme.colors.textPrimary};
	min-height: 150px;
`;

export const Timestamp = styled(Typography)`
	text-align: left;
	font-size: 9px;
	color: ${(props) => props.theme.colors.textTimestamp};
	margin-left: ${(props) => props.theme.spacing(5)};
	margin-top: ${(props) => props.theme.spacing(0.5)};
`;

export const ProgressTrackerWrapper = styled.div`
	position: relative;
	top: -3px;
	width: 100%;
	height: 3px;
	overflow: visible;
`;
export const ProgressTrackerTrack = styled.div`
	height: 3px;
	background: rgba(123, 139, 178, 0.26);
	border-radius: 0;
`;

export const ProgressTrackerProcess = styled.div`
	position: absolute;
	left: 0;
	top: -1px;
	height: 5px;
	width: ${(props) => props.progress + '%' || '0%'};
	background: ${({ theme }) => theme.colors.secondary};
	border-radius: 10px;
`;

export const Footer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin-top: ${(props) => props.theme.spacing(2)};
	margin-bottom: ${(props) => props.theme.spacing(0.6)};
`;

export const BiobitToDollarPair = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	align-self: self-start;
	width: fit-content;
`;

export const BadgeRow = styled.div`
	width: fit-content;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;
export const BadgeLabel = styled.div`
	line-height: 1;
	font-size: 10px;
	font-weight: 700;
	white-space: normal;
	color: ${(props) => props.theme.colors.textPrimary};
`;

export const BiobitToDollarValue = styled.div`
	font-weight: 600;
	font-size: 10px;
	line-height: 0px;
	color: ${(props) => props.theme.colors.textToken};
	margin-right: 2px;
	white-space: nowrap;
	margin-left: ${(props) => (props.noMargin ? 0 : props.theme.spacing(0.8))};
	white-space: nowrap;
`;

export const Hint = styled.div`
	font-weight: 300;
	font-size: 12px;
	line-height: 20px;
	color: ${(props) => props.theme.colors.textToken};
	white-space: nowrap;
`;

export const ValueLabel = styled.div`
	line-height: 1;
	font-size: 12px;
	font-weight: 700;
	white-space: normal;
	padding-bottom: 2px;
	color: ${(props) => (props.colored ? props.theme.colors.textToken : props.theme.textPrimary)};
`;

export const TokenValue = styled.div`
	font-weight: 600;
	font-size: 10px;
	line-height: 20px;
	color: ${(props) => props.theme.textPrimary};
	margin-right: 3px;
`;

export const ContributorBadge = styled(BiobitToDollarPair)`
	align-self: center;
`;

export const Bookmark = styled.img`
	width: 14.5px;
	height: 17.5px;
	align-self: flex-start;
	margin-left: ${(props) => props.theme.spacing(0.5)};
`;

export const TokenIcon = styled.img`
	flex: 0 0 14px;
	height: 18px;
	margin-right: ${(props) => props.theme.spacing(0.5)};
`;

export const ContributorsIcon = styled.img`
	width: 13px;
	height: 12px;
	margin-right: ${(props) => props.theme.spacing(0.5)};
`;

export const Spacer = styled.div`
	flex: 1;
`;

export const Divider = styled.div`
	height: 18px;
	background: #121213;
	width: 1px;
	margin: 0 ${(props) => props.theme.spacing(1)};
	align-self: self-start;
`;

export const JoinButton = styled(GenericLinkButton)`
	margin: 0;
	height: fit-content;
	align-self: self-start;
	content-self: self-end;
	position: absolute;
	right: 33px;

	& > * {
		color: ${(props) => props.theme.colors.primary};
		font-size: 10px;
		padding: 7px 17px;
		margin-bottom: 2px;
	}
`;

export default RequestCardWrapper;
export { Typography };
