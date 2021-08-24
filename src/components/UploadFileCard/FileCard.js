import styled from 'styled-components';
import FileInput from './FileInput';
import FileInputMobile from './FileInputMobile';

export const Card = styled.div`
	flex: 1;
	background: #ffffff;
	border: 1px dashed #3adea3;
	box-shadow: 0px 4px 18px rgba(223, 236, 255, 0.3);
	border-radius: 5px;
	padding: ${(props) => props.theme.spacing(2)};
	margin-bottom: ${(props) => props.theme.spacing(2)};
`;

export const CustomFileInput = styled(FileInput)`
	max-width: unset;
	width: 100%;
`;

export const CustomFileInputMobile = styled(FileInputMobile)`
	max-width: unset;
	width: 100%;
	padding: 0;
	border: 1px dashed #3adea3;
	padding: 9px;
`;

export const HelperText = styled.div`
	font-size: 12px;
	line-height: 20px;
	margin-top: ${(props) => props.theme.spacing(3)};
`;

export const ErrorText = styled.div`
	font-size: 12px;
	line-height: 20px;
	color: #f62d76;
	margin-top: ${(props) => props.theme.spacing(3)};
`;
