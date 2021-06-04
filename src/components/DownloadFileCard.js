import React from 'react';
import {
	FileInputLink,
	FileInputWrapper,
	FileInputTitle,
	FileInputIcon
} from './FileInput';
import { Card, HelperText } from './FileCard';
import styled from 'styled-components';
import fileDownloadIcon from '../assets/icons/file-download.svg';

const CustomFileInputWrapper = styled(FileInputWrapper)`
	margin: 0;
	max-width: unset;
	width: 100%;
`;

const DownloadFileCard = ({
	fileName,
	buttonLabel,
	label,
	helperText,
	fileLink
}) => {
	return (
		<Card>
			<CustomFileInputWrapper hasBorder>
				<FileInputLink href={fileLink}>
					{buttonLabel}
				</FileInputLink>
				<FileInputTitle>
					<FileInputIcon src={fileDownloadIcon} />
					{
						fileName
					}
				</FileInputTitle>
			</CustomFileInputWrapper>
			<HelperText>
				{helperText}
			</HelperText>
		</Card>
	);
};

export default DownloadFileCard;