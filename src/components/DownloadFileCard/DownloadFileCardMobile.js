import React from 'react';
import { FileInputLink, FileInputWrapper, FileInputTitle, FileInputIcon } from '../UploadFileCard/FileInputMobile';
import { Card } from '../UploadFileCard/FileCard';
import styled from 'styled-components';
import fileDownloadIcon from '../../assets/icons/file-download.svg';

const CustomFileInputWrapper = styled(FileInputWrapper)`
	margin: 0;
	max-width: unset;
	width: 100%;
	flex-wrap: nowrap;
	padding: 9px 10px;
	margin-bottom: ${(props) => props.theme.spacing(5)};
`;

const MobileCard = styled(Card)`
	margin-bottom: 0;
	padding: 0 18px;
	border: none;
	margin-top: 25px;
`;
const FileInputLinkMobile = styled(FileInputLink)`
	padding: 9px 13px;
	font-size: 12px;
	margin: auto 0;
`;

const CustomFileInputIcon = styled(FileInputIcon)`
	width: 33px;
	margin-right: 6px;
`;

const DownloadFileCardMobile = ({ fileName, buttonLabel, label, helperText, fileLink }) => {
	return (
		<MobileCard>
			<CustomFileInputWrapper hasBorder data-tour="request-details-two">
				<FileInputLinkMobile href={fileLink} target="_blank">
					{buttonLabel}
				</FileInputLinkMobile>
				<FileInputTitle>
					<CustomFileInputIcon src={fileDownloadIcon} />
					{fileName}
				</FileInputTitle>
			</CustomFileInputWrapper>
		</MobileCard>
	);
};

export default DownloadFileCardMobile;
