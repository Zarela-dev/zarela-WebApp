import styled from 'styled-components';
import { Typography } from '../Typography';
import { GenericLinkButton } from '../Button';

export const RequestCardWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	background: white;
	border: 1px solid #c4c4c4;
	border-radius: 8px;
	padding: ${(props) => props.theme.spacing(4)} ${(props) => props.theme.spacing(2.7)}
		${(props) => props.theme.spacing(1.8)};

	margin-bottom: 25px;
`;

export const HeaderLayout = styled.div`
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
`;

export const RequestNumber = styled.div`
	flex: ${(props) => (props.isMobile ? '' : '0 0 100px')};
	height: ${(props) => (props.isMobile ? '38px;' : '50px')};
	border-radius: ${(props) => (props.isMobile ? '5px 5px 0px 5px' : '10px 10px 0px 10px')};
	padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
	margin-right: ${(props) => props.theme.spacing(2)};
	font-weight: bold;
	background: linear-gradient(246.29deg, #3a68de 12.69%, #3a68de 100%);
	font-size: ${(props) => (props.isMobile ? '15px' : '32px')};
	line-height: ${(props) => (props.isMobile ? '11.4px' : '30px')};
	color: #ffffff;
	text-align: center;
`;

export const Title = styled.div`
	font-weight: 500;
	font-size: 24px;
	line-height: 30px;
	color: ${(props) => props.theme.textPrimary};
`;

export const Bookmark = styled.img`
	width: 20px;
	align-self: flex-start;
	margin-left: ${(props) => props.theme.spacing(0.5)};
`;

export const Description = styled.div`
	flex: 1 0 100%;
	background: #eaf1fa;
	border-radius: 5px 5px 0 0;
	padding: ${(props) => props.theme.spacing(2)};
	font-weight: 300;
	font-size: 14px;
	line-height: 20px;
	text-align: justify;
	color: #121213;
`;

export const Timestamp = styled(Typography)`
	text-align: left;
	font-size: 10px;
	line-height: 20px;
	color: #858585;
	margin-left: ${(props) => props.theme.spacing(12)};
	margin-bottom: ${(props) => props.theme.spacing(1.5)};
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
	background: #3a68de;
	border-radius: 0;
`;

export const Footer = styled.div`
	flex: 1 0 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin-top: ${(props) => props.theme.spacing(2)};
`;

export const BiobitToDollarPair = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 0 0 80px;
`;

export const BadgeRow = styled.div`
	display: flex;
	align-items: flex-end;
	width: 100%;
	margin-bottom: ${(props) => props.theme.spacing(0.5)};
`;
export const BadgeLabel = styled.div`
	line-height: 1;
	font-size: 14px;
	font-weight: 700;
	white-space: normal;
	color: #3a68de;
`;

export const BiobitToDollarValue = styled.div`
	font-weight: 600;
	font-size: 15px;
	line-height: 20px;
	color: #3a68de;
	margin-right: 3px;
	margin-left: ${(props) => (props.noMargin ? props.theme.spacing(1) : props.theme.spacing(2.3))};
	white-space: nowrap;
`;

export const Hint = styled.div`
	font-weight: 300;
	font-size: 12px;
	line-height: 20px;
	color: #3a68de;
	white-space: nowrap;
`;

export const ValueLabel = styled.div`
	line-height: 1;
	font-size: 12px;
	font-weight: 700;
	white-space: normal;
	padding-bottom: 2px;
	color: ${(props) => (props.colored ? '#3A68DE' : props.theme.textPrimary)};
`;

export const TokenValue = styled.div`
	font-weight: 600;
	font-size: 18px;
	line-height: 20px;
	color: ${(props) => props.theme.textPrimary};
	margin-right: 3px;
`;

export const ContributorBadge = styled(BiobitToDollarPair)``;

export const TokenIcon = styled.img`
	flex: 0 0 18px;
	height: 18px;
	margin-right: ${(props) => props.theme.spacing(0.5)};
`;

export const ContributorsIcon = styled.img`
	width: 18px;
	height: 18px;
	margin-right: ${(props) => props.theme.spacing(0.5)};
`;

export const Spacer = styled.div`
	flex: 1;
`;

export const Divider = styled.div`
	height: 46px;
	background: #3c87aa;
	width: 1px;
	margin: 0 ${(props) => props.theme.spacing(1)};
`;

export const JoinButton = styled(GenericLinkButton)`
	width: 100%;
	margin: 0;

	& > * {
		color: #7246d0;
	}
`;

export const TagsWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	max-width: 860px;
	flex-wrap: wrap;

	@media only screen and (max-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		margin-top: ${(props) => props.theme.spacing(1)};
	}
`;

export const TagItem = styled.div`
	background: white;
	padding: 8px 16px;
	font-size: 14px;
	line-height: 17px;
	font-weight: 400;
	border: 1px solid #e1e5f5;
	border-radius: 4px;
	margin-top: 5px;
	margin-right: 5px;
	color: #a0aac3;
	@media only screen and (max-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		padding: ${(props) => props.theme.spacing(0.5)};
	}
`;

export default RequestCardWrapper;
export { Typography };
