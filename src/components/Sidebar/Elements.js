import styled from 'styled-components';
import Button from '../Elements/Button';

// #todo this file should be divided info separate files - by component)
export const SidebarCard = styled.div`
	width: 100%;
	background: linear-gradient(221.29deg, #e6f7fb 3.96%, #e1e5f5 102.57%);
	box-shadow: 0px 10px 18px rgba(81, 197, 234, 0.06);
	border-radius: 8px;
	padding: 0 ${(props) => props.theme.spacing(3)} ${(props) => props.theme.spacing(3)}
		${(props) => props.theme.spacing(3)};
	height: auto;
	margin-bottom: ${(props) => props.theme.spacing(3)};
`;

export const Header = styled.header`
	display: flex;
	align-items: center;
	margin-top: ${(props) => props.theme.spacing(3)};
	margin-bottom: ${(props) => props.theme.spacing(3)};
`;

export const Icon = styled.img`
	width: 24px;
	margin-right: ${(props) => props.theme.spacing(1.5)};
`;

export const Title = styled.h3`
	font-weight: 700;
	font-size: 18px;
	line-height: 25px;
	color: ${(props) => props.theme.textPrimary};
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: ${(props) => props.theme.spacing(1)};

	& > * {
		color: ${(props) => (props.hiddenInfo ? '#858585' : props.theme.textPrimary)};
	}
`;

export const Value = styled.span`
	font-size: 18px;
	line-height: 22px;
	margin-left: ${(props) => props.theme.spacing(1)};
`;

export const ValueIcon = styled.img`
	width: 14px;
	margin-right: ${(props) => props.theme.spacing(0.5)};
`;

export const Subtitle = styled.h6`
	flex: 0 0 120px;
	display: block;
	font-weight: 600;
	font-size: 16px;
	line-height: 20px;
	color: #3d5c8a;
	white-space: nowrap;
`;
export const Divider = styled.div`
	border: 1px solid ${(props) => (props.light ? '#FEFEFE' : '#3D5C8A')};
	width: 100%;
	margin: ${(props) => props.theme.spacing(2)} auto;
`;

export const NoConnectionMessage = styled.div`
	font-weight: 600;
	font-size: 12px;
	line-height: 22px;
	text-align: center;
	margin-bottom: ${(props) => props.theme.spacing(1)};
`;

export const ConnectButton = styled(Button)`
	margin: 0 auto;
`;

export const Adornment = styled.img``;
