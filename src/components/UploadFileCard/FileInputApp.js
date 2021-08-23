import React, { forwardRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import fileDownloadIcon from '../../assets/icons/file-download.svg';
import fileUploadIcon from '../../assets/icons/file-upload.svg';
import { Error } from '../Elements/TextField';

export const FileInputWithBorder = css`
	background: #ffffff;
	border: 1px dashed #3adea3;
	box-shadow: 0px 4px 18px rgba(223, 236, 255, 0.3);
	border-radius: 5px;
	padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(3)};
`;

export const FileInputWrapper = styled.div`
	${(props) => (props.hasBorder ? FileInputWithBorder : '')}
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
	flex-wrap: wrap;
	max-width: 530px;
	margin: ${(props) => props.theme.spacing(2)} 0 ${(props) => props.theme.spacing(4)};
`;

export const FileInputTitle = styled.div`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	color: ${(props) => props.theme.textPrimary};
`;

export const FileInputLabel = styled.label`
	background: #ffffff;
	box-shadow: 0px 5.46667px 18px rgba(223, 236, 255, 0.5);
	border-radius: 5.46667px;
	color: #7246d0;
	cursor: pointer;
`;

export const FileInputLink = styled.a`
	background: #ffffff;
	box-shadow: 0px 5.46667px 18px rgba(223, 236, 255, 0.5);
	border-radius: 5.46667px;
	border: 1px solid #bbbee6;
	text-decoration: none;
	padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(4)};
	color: #7246d0;
`;

const FileContainer = styled.div`
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
	width: 100%;
`;

const ErrorContainer = styled.div`
	margin-top: ${(props) => props.theme.spacing(1)};
`;

export const FileInputIcon = styled.img`
	width: 42px;
	margin-right: ${(props) => props.theme.spacing(1)};
`;

export const FileName = styled.div``;

export const formatLabel = (label) => {
	const length = 28;
	if (label.length <= length) return label;
	return label.substr(0, length) + '...';
};

export const getFileName = (inputRef, fallbackLabel) => {
	if (inputRef && inputRef.current)
		if (inputRef.current.files.length)
			if (inputRef.current.files[0]) return formatLabel(inputRef.current.files[0].name);
	return formatLabel(fallbackLabel);
};

const FileInputApp = forwardRef(
	({ disableUpload, className, hasBorder, showSelected, value, buttonLabel, icon, error, label, ...rest }, ref) => {
		return (
			<FileInputWrapper hasBorder={hasBorder} className={className}>
				<FileContainer>
					<FileInputLabel>
						{buttonLabel}
						{!disableUpload ? <input ref={ref} type="file" style={{ display: 'none' }} {...rest} /> : null}
					</FileInputLabel>
					{showSelected ? (
						<FileInputTitle>
							{icon === 'download' ? (
								<FileInputIcon src={fileDownloadIcon} />
							) : (
								<FileInputIcon src={fileUploadIcon} />
							)}
							<FileName>{getFileName(ref, formatLabel(label))}</FileName>
						</FileInputTitle>
					) : (
						<FileInputTitle>
							{icon === 'download' ? (
								<FileInputIcon src={fileDownloadIcon} />
							) : (
								<FileInputIcon src={fileUploadIcon} />
							)}
							<FileName>{formatLabel(label)}</FileName>
						</FileInputTitle>
					)}
				</FileContainer>
				<ErrorContainer>{error ? <Error>{error}</Error> : null}</ErrorContainer>
			</FileInputWrapper>
		);
	}
);

export default FileInputApp;
