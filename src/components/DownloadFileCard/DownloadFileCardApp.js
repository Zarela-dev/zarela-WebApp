import React from 'react';
import {
  FileInputLink,
  FileInputWrapper,
  FileInputTitle,
  FileInputIcon
} from '../UploadFileCard/FileInputApp';
import { Card, HelperText } from '../UploadFileCard/FileCard';
import styled from 'styled-components';
import fileDownloadIcon from '../../assets/icons/file-download.svg';

const CustomFileInputWrapper = styled(FileInputWrapper)`
	margin: 0;
	max-width: unset;
	width: 100%;
  flex-wrap: nowrap;
  padding: 10px 18px;
  margin-bottom: ${props => props.theme.spacing(5)};
`;

const MobileCard = styled(Card)`
  margin-bottom: 0;
  padding: 0 18px;
  border: none;
  margin-top: 25px;
`;
const FileInputLinkMobile = styled(FileInputLink)`
  padding: 12px 14px;
  font-size: 13px;
`;


const DownloadFileCardApp = ({
  fileName,
  buttonLabel,
  label,
  helperText,
  fileLink
}) => {
  return (
    <MobileCard>
      <CustomFileInputWrapper hasBorder>
        <FileInputLinkMobile href={fileLink} target='_blank'>
          {buttonLabel}
        </FileInputLinkMobile>
        <FileInputTitle>
          <FileInputIcon src={fileDownloadIcon} />
          {
            fileName
          }
        </FileInputTitle>
      </CustomFileInputWrapper>
    </MobileCard>
  );
};

export default DownloadFileCardApp;