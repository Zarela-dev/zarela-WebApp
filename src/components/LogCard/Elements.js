import styled from 'styled-components';

// layout
export const CompactRequestCard = styled.div`
	display: flex;
	flex-direction: column;
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
		flex: 0 0 58%;
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
