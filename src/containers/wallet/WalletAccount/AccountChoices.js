import styled from 'styled-components';

export const Title = styled.div`
	font-size: 14px;
	line-height: 20px;
	color: ${(props) => props.theme.textPrimary};
	margin-bottom: ${(props) => props.theme.spacing(1.5)};
`;

export const TokenList = styled.div`
	display: flex;
	justify-content: ${(props) => (props.setApart ? 'space-between' : 'flex-start')};
	margin-bottom: ${(props) => props.theme.spacing(7)};
`;

export const TokenButton = styled.button`
	background: #ffffff;
	box-sizing: border-box;
	border-radius: 3px;
	color: #581d9f;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	padding: ${(props) => props.theme.spacing(0.4)} ${(props) => props.theme.spacing(1)};
`;

export const TokenIcon = styled.img`
	width: 23px;
	margin-right: ${(props) => props.theme.spacing(1)};
`;

export const TokenName = styled.span`
	font-weight: 600;
	font-size: 14px;
	line-height: 20px;
`;

export const Token = styled.div`
	display: flex;
	margin-right: ${(props) => props.theme.spacing(1)};
	cursor: pointer;
	${(props) => props.active};

	& ${TokenName} {
		color: ${(props) => (!props.active ? props.theme.textPrimary : '#581D9F')};
	}

	& ${TokenButton} {
		color: ${(props) => (!props.active ? '#858585' : '#581D9F')};
		border: ${(props) => (!props.active ? '1px solid #858585' : '1px solid #A981FE')};
	}
`;
