import {
	RequestNumber,
	HeaderLayout,
	Footer,
	Spacer,
	TokenIcon,
	Bookmark,
	Typography,
	ContributorBadge,
	ContributorsIcon,
	ProgressTrackerWrapper,
	TokenValue,
	Divider,
	BadgeRow,
	Title,
	BiobitToDollarValue,
	BadgeLabel,
} from '../Elements/RequestCard/IndexMobile';
import maxWidthWrapper from '../Elements/MaxWidth';
import styled from 'styled-components';

export const CustomRequestNumber = styled(RequestNumber)`
	flex: ${(props) => (props.isMobile ? '' : '0 0 100px')};
	height: ${(props) => (props.isMobile ? '26px;' : '50px')};
	border-radius: ${(props) => (props.isMobile ? '5px 5px 0px 5px' : '10px 10px 0px 10px')};
	padding: ${(props) => (props.isMobile ? '7px 11px' : '10px 20px')};
	margin-right: ${(props) => (props.isMobile ? props.theme.spacing(1) : props.theme.spacing(2))};
	font-weight: bold;
	background: linear-gradient(246.29deg, #3a68de 12.69%, #3a68de 100%);
	font-size: ${(props) => (props.isMobile ? '15px' : '32px')};
	line-height: ${(props) => (props.isMobile ? '11.4px' : '30px')};
	color: #ffffff;
	text-align: center;
`;

export const HeaderContainer = styled.header`
	background: #f4f8fe;
	border-radius: 8px;
	padding: 13px 21px;
	width: 100%;
	margin-bottom: 10px;
`;

export const HeaderInner = styled(HeaderLayout)`
	display: flex;
	flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
	${maxWidthWrapper};
	width: 100%;
	justify-content: space-between;
`;

export const HeaderLayoutCustom = styled(HeaderLayout)`
	width: unset;
	flex-grow: 1;
`;

export const CustomFooter = styled(Footer)`
	margin-top: ${(props) => (props.isMobile ? props.theme.spacing(3) : props.theme.spacing(0))};
	padding-left: ${(props) => (props.isMobile ? '50px' : '0')};
	flex-wrap: nowrap;
`;

export const CustomBadgeRow = styled(BadgeRow)`
	flex: 0;
	align-items: center;
`;

export const CustomBadgeRowGrow = styled(CustomBadgeRow)`
	flex-grow: 1;
`;

export const TitleContent = styled(Title)`
	font-size: ${(props) => (props.isMobile ? '12px' : '14px')};
	font-weight: ${(props) => (props.isMobile ? '400' : '600')};
	line-height: ${(props) => (props.isMobile ? '16px' : '20px')};
	font-weight: 600;
	line-heigh: 16px;
`;

export const CustomDivider = styled(Divider)`
	height: 48px;
	background-color: rgba(60, 135, 170, 0.6);
	margin: 0 20px;
`;

export const BodyContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: ${(props) => (props.isMobile ? '10px' : '8px')};
`;

export const HashContent = styled.div`
	display: flex;
	flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
`;

export const HashBody = styled.div`
	word-break: break-all;
	font-size: 12px;
	font-weight: 500;
	color: #3a68de;
	line-height: 16px;
`;

export const HashTitle = styled(HashBody)`
	font-size: ${(props) => (props.isMobile ? '10.5px' : '14px')};
	font-weight: 400;
	line-height: ${(props) => (props.isMobile ? '16px' : '20px')};
	color: ${(props) => (props.isMobile ? '' : '#000')};
	margin-right: ${(props) => (props.isMobile ? '' : '6px')};
	align-items: center;
`;

export const CustomContributorBadge = styled(ContributorBadge)`
	margin-right: ${(props) => (props.isMobile ? '8px' : '25px')};
`;

export const ContributorsIconMobile = styled(ContributorsIcon)`
	width: ${(props) => (props.isMobile ? '16px' : '18px')};
	height: ${(props) => (props.isMobile ? '16px' : '18px')};
`;
export const ToeknIconMobile = styled(TokenIcon)`
	width: 20px;
	height: 20px;
`;

export const BadgeLabelTimeMobile = styled(BadgeLabel)`
	font-size: ${(props) => (props.isMobile ? '10.8px' : '14px')};
	line-height: 20px;
	font-weight: ${(props) => (props.success ? '700' : props.pending && '700')};
	color: ${(props) =>
		props.success ? 'rgba(27, 204, 141, 1)' : props.pending && 'rgba(133, 133, 133, 1)'};
`;

export const BadgeLabelContributors = styled(BadgeLabel)`
	font-size: ${(props) => (props.isMobile ? '10.8px' : '16px')};
	line-height: ${(props) => (props.isMobile ? '14px' : '18px')};
	font-weight: 400;
	min-width: ${(props) => props.minWidth && '60px'};
	white-space: nowrap;
`;

export const CopyIconWrapper = styled(Bookmark)`
	align-self: center;
`;

export const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
