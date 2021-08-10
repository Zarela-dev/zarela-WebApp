import styled, { css } from 'styled-components';

// layout
const getFontColorVariant = ({ variant, theme }) => {
	if (variant === 'primary') {
		return css`
			color: #d13ade;
		`;
	} else if (variant === 'confirmed') {
		return css`
			color: #3adea3;
		`;
	} else {
		return css`
			color: ${theme.textPrimary};
		`;
	}
};
const getBorderVariant = ({ variant }) => {
	if (variant === 'primary') {
		return css`
			border-color: #d13ade;
		`;
	} else if (variant === 'confirmed') {
		return css`
			border-color: #3adea3;
		`;
	} else {
		return css`
			border-color: transparent;
		`;
	}
};

export const CompactRequestCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	min-height: 75px;
	background: #f4f8fe;
	border-radius: 8px;
	border-width: 1px;
	border-style: solid;
	${(props) => getBorderVariant(props)};
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

export const Header = styled(Row)`
	width: 100%;
	flex: 1;
`;
export const Body = styled(Row)`
	width: 100%;
	flex: 1;
`;

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
	visibility: ${(props) => (props.hide ? 'hidden' : 'visible')};
	height: 50px;
	width: 1px;
	border-right: 1px solid rgba(60, 135, 170, 0.6);
	margin: 0 ${(props) => props.theme.spacing(2)};
`;

export const ContributorCount = styled.p``;

export const Title = styled.h4`
	font-weight: 700;
	font-size: 16px;
	line-height: 1.8;
	color: ${(props) => props.theme.textPrimary};
	margin-right: ${(props) => props.theme.spacing(1.5)};
	margin-bottom: ${(props) => props.theme.spacing(0.8)};
`;

export const Timestamp = styled.p`
	white-space: nowrap;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 130%;
	min-width: 200px;
	color: ${(props) => props.theme.textPrimary};
`;

export const QuickReport = styled.p`
	font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
	font-size: 12px;
	line-height: 16px;
	${(props) => getFontColorVariant(props)};
	white-space: nowrap;
`;

export const QuickReportTitle = styled(QuickReport)`
	font-weight: bold;
	margin-right: 5px;
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

// files table
export const Table = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: ${(props) => props.theme.spacing(3)};
`;

export const TableCellWrapper = styled.div`
	flex: ${(props) => props.flex || 1};
	background: white;

	&:first-child {
		border-radius: 8px 0 0 8px;
	}
	&:last-child {
		border-radius: 0 8px 8px 0;
	}
`;

export const TableBulkRow = styled.div`
	border-radius: 8px;
	background: white;
	padding: ${(props) => props.theme.spacing(2)} 0;
`;

export const TableRow = styled.section`
	display: flex;
	margin-bottom: ${(props) => (props.header ? props.theme.spacing(1) : 0)};

	${TableCellWrapper}:first-of-type {
		flex: 0 0 53%;
	}

	${TableCellWrapper}:nth-of-type(2) {
		flex: 1 0 auto;
	}

	${TableCellWrapper}:nth-of-type(3) {
		flex: 0 0 100px;
	}
	${TableCellWrapper}:nth-of-type(4) {
		flex: 0 0 160px;
	}
`;

export const TableCell = styled.div`
	display: flex;
	align-items: center;
	min-height: 48px;
	padding: ${(props) => props.theme.spacing(0.6)} ${(props) => props.theme.spacing(2)};
	font-size: 12px;
	height: 40px;
	width: 100%;
	font-weight: normal;
	cursor: ${(props) => (props.pointer ? 'pointer' : 'normal')};

	${TableCellWrapper}:not(:last-child) & {
		border-right: 1px solid rgba(60, 135, 170, 0.6);
	}
`;
//  Mobile components

export const MobileHeader = styled(Header)`
	align-items: flex-start;
	position: relative;
`;

export const MobileCompactRequestCard = styled(CompactRequestCard)`
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	padding: ${(props) => `${props.theme.spacing(2)} ${props.theme.spacing(1.5)}`};
`;

export const MobileColumn = styled(Column)`
	display: flex;
	flex-direction: column;
	align-self: unset;
	align-items: flex-start;
`;

export const MobileStatus = styled(StatusIcon)`
	position: ${(props) => (props.static ? 'static' : 'absolute')};
	right: 0;
	top: 0;
	width: 18px;
`;

export const MobileRequestNumber = styled(RequestNumber)`
	height: 26px;
	border-radius: 5px 5px 0px 5px;
	padding: 7px 11px;
	margin-right: ${(props) => props.theme.spacing(1)};
	font-weight: bold;
	background: linear-gradient(246.29deg, #3a68de 12.69%, #3a68de 100%);
	font-size: 15px;
	line-height: 11.4px;
	color: #ffffff;
	text-align: center;
`;

export const MobileTitle = styled(Title)`
	font-weight: normal;
	font-size: 12px;
	line-height: 16px;
	color: ${(props) => props.theme.textPrimary};
	margin-right: ${(props) => props.noMargin && 0};
`;

export const MobileBiobitIcon = styled(BiobitIcon)`
	padding: ${(props) => `${props.theme.spacing(1)} 0 ${props.theme.spacing(2)}`};
`;

export const MobileBiobitValue = styled(BiobitValue)`
	font-weight: bold;
	font-size: 12px;
	line-height: 11px;
	padding: ${(props) => `${props.theme.spacing(1)} 0 ${props.theme.spacing(2)}`};
`;

export const MobileRow = styled(Row)`
	display: flex;
	align-items: center;
`;

export const MobileBody = styled(Body)``;

export const MobileTable = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	border-top: 1px solid #c4c4c4;
	padding: ${(props) => `${props.theme.spacing(1.5)} 0 0`};
	margin-top: ${(props) => props.theme.spacing(2.5)};
`;

export const MobileTableRow = styled.section`
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;

	&:not(:last-child) {
		border-bottom: 1px solid #c4c4c4;
		margin-bottom: ${(props) => props.theme.spacing(1)};
	}
`;

export const MobileTableColumn = styled.div`
	flex: ${(props) => props.flex || 1};
	display: flex;
	flex-direction: column;
`;

export const MobileTableData = styled.p`
	font-size: 12px;
	line-height: 16px;
	color: #858585;
	margin-left: ${(props) => props.theme.spacing(1.5)};
	margin-bottom: ${(props) => props.theme.spacing(0.5)};
	white-space: nowrap;
`;

export const MobileTableTitle = styled(MobileTableData)`
	margin-left: 0;
	color: ${(props) => props.theme.textPrimary};
`;

export const TimestampMobile = styled(Timestamp)`
	font-weight: normal;
	font-size: 12px;
	line-height: 16px;
	color: #858585;
`;
