import styled from 'styled-components';
import FileInput from './FileInput';
import FileInputApp from './FileInputApp';

export const Card = styled.div`
	flex: 1;
	background: #FFFFFF;
	border: 0.5px dashed rgba(133, 206, 238, 0.5);
	box-shadow: 0px 4px 18px rgba(223, 236, 255, 0.3);
	border-radius: 5px;
	padding: ${props => props.theme.spacing(2)};
	margin-bottom: ${props => props.theme.spacing(2)};
	/* max-width: 570px; */
`;

export const CustomFileInput = styled(FileInput)`
	margin: 0;
	max-width: unset;
	width: 100%;
`;

export const CustomFileInputApp = styled(FileInputApp)`
	margin: 0;
	max-width: unset;
	width: 100%;
	padding: 0;
	border: 1px dashed #3ADEA3;
`;


export const HelperText = styled.div`
	font-size: 12px;
	line-height: 20px;
	margin-top: ${props => props.theme.spacing(3)};
`;

export const ErrorText = styled.div`
	font-size: 12px;
	line-height: 20px;
	color: #F62D76;
	margin-top: ${props => props.theme.spacing(3)};
`;