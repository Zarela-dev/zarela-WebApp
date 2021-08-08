import styled from 'styled-components';

// layout
export const CompactRequestCard = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	min-height: 75px;
	background: #f4f8fe;
	border-radius: 8px;
	margin-bottom: ${(props) => props.theme.spacing(1)};
	padding: ${(props) => `${props.theme.spacing(1.3)} ${props.theme.spacing(2)}`};
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	flex-direction: row;
	flex: 1 0 100%;
`;

export const Header = styled(Row)``;
export const Body = styled(Row)``;

export const Column = styled.div`
	display: ${(props) => (props.displayFlex ? 'flex' : 'block')};
	align-items: center;
	align-self: ${(props) => props.alignSelf || 'center'};
	flex: ${(props) => props.flex || 1};
`;
// icons
export const Icon = styled.img``;

export const BiobitIcon = styled(Icon)`
	width: 20px;
	margin-right: 5px;
`;

export const CaretIcon = styled(Icon)`
	width: 24px;
	margin-left: ${(props) => props.theme.spacing(1)};
`;
export const StatusIcon = styled(Icon)`
	width: 20px;
	margin-right: ${(props) => props.theme.spacing(1)};
`;
export const ContributorIcon = styled(Icon)``;
export const BookmarkIcon = styled(Icon)``;

// icon labels
export const StatusLabel = styled.p`
	font-weight: bold;
	font-size: 16px;
	line-height: 20px;
	color: ${(props) => (props.approved ? '#1bcc8d' : '#858585')};
`;

export const BiobitValue = styled.p`
	white-space: nowrap;
`;
export const DollarValue = styled.p`
	white-space: nowrap;
`;

export const VerticalDivider = styled.div`
	height: 50px;
	width: 1px;
	border-right: 1px solid rgba(60, 135, 170, 0.6);
	margin: 0 ${(props) => props.theme.spacing(2)};
`;

export const ContributorCount = styled.p``;

export const Title = styled.h4`
	font-weight: 700;
	font-size: 18px;
	line-height: 1.8;
	color: ${(props) => props.theme.textPrimary};
	margin-right: ${(props) => props.theme.spacing(1.5)};
	margin-bottom: ${(props) => props.theme.spacing(0.8)};
`;

export const Timestamp = styled.p``;

export const QuickReport = styled.p`
	font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
	font-size: 12px;
	line-height: 16px;
	color: #d13ade;
`;

export const RequestNumber = styled.div`
	height: 60px;
	border-radius: 10px 10px 0px 10px;
	padding: 0 20px;
	margin-right: ${(props) => props.theme.spacing(2)};
	font-weight: 700;
	background: linear-gradient(246.29deg, #3a68de 12.69%, #3a68de 100%);
	font-size: 32px;
	line-height: 60px;
	color: #ffffff;
	text-align: center;
	user-select: text;
`;
