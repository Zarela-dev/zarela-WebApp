import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import fileDownloadIcon from '../../assets/icons/file-download.svg';
import fileUploadIcon from '../../assets/icons/file-upload.svg';
import { Error } from '../Elements/TextField';

export const FileInputWithBorder = css`
	background: #ffffff;
	border: 1px dashed rgb(58 222 163 / 50%);
	box-shadow: 0px 4px 18px rgba(223, 236, 255, 0.3);
	border-radius: 5px;
	padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(1)};
`;

export const FileInputWrapper = styled.div`
	${(props) => (props.hasBorder ? FileInputWithBorder : '')}
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
	flex-wrap: wrap;
	max-width: 530px;
	font-weight: 400;
`;

export const FileInputTitle = styled.div`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	color: ${(props) => props.theme.textPrimary};
	overflow: hidden;

	@media only screen and (max-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		font-size: 12px;
		margin-bottom: ${(props) => props.theme.spacing(1)};
	}
`;

export const FileInputLabel = styled.label`
	white-space: nowrap;
	background: linear-gradient(226.69deg, #85ceee 10.5%, #a687fd 86.82%);
	box-shadow: 0px 6px 20px rgba(81, 197, 234, 0.15);
	border-radius: 4px;
	padding: ${(props) => props.theme.spacing(1.2)};
	color: ${(props) => props.theme.textPrimary};
	cursor: pointer;
	text-align: center;
	height: 40px;
	width: 110px;
	font-size: 16px;
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
	text-align: left;
	width: 100%;
`;

export const FileInputIcon = styled.img`
	width: 42px;
	margin-right: ${(props) => props.theme.spacing(1)};
`;

export const FileName = styled.div`
	overflow: hidden;
	text-align: left;
	text-overflow: ellipsis;
`;

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

const MainWrapper = styled.div``;
const ContentRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: end;
	padding: 23px 0;
	margin-bottom: 15px;
`;

const DownLoadText = styled.span`
	font-size: 12px;
	line-height: 10px;
	color: #121213;
	font-weight: ${(props) => (props.bold ? 'bold' : '')};
`;

const LinkWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 110px;
`;

const DownLoadLink = styled.a`
	color: #7246d0;
	font-size: 12px;
	line-height: 10px;
	font-weight: bold;
	text-decoration: none;
	cursor: pointer;
`;

const LimitSizeMessage = styled.p`
	font-size: 14px;
	margin-top: 15px;
	text-align: left;
	color: #121213;
	font-weight: 600;

	@media (max-width: 768px) {
		font-size: 12px;
	}
`;

// #refactor_candidate
const FileInput = forwardRef(
	(
		{
			disableUpload,
			className,
			hasBorder,
			downLoadLink,
			showSelected,
			value,
			buttonLabel,
			icon,
			onClick,
			error,
			label,
			fileSizeLimit,
			...rest
		},
		ref
	) => {
		return (
			<MainWrapper>
				<FileInputWrapper hasBorder={hasBorder} className={className}>
					<FileContainer>
						{typeof onClick === 'function' ? (
							<FileInputLabel onClick={onClick}>{buttonLabel}</FileInputLabel>
						) : (
							<FileInputLabel>
								{buttonLabel}
								{!disableUpload ? (
									<input ref={ref} type="file" style={{ display: 'none' }} {...rest} />
								) : null}
							</FileInputLabel>
						)}
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
					{error ? (
						<ErrorContainer>
							<Error>{error}</Error>
						</ErrorContainer>
					) : null}
				</FileInputWrapper>
				{fileSizeLimit && <LimitSizeMessage>{fileSizeLimit}</LimitSizeMessage>}
				{downLoadLink && (
					<ContentRow>
						<DownLoadText>
							Don’t know how to make your Z-paper? <DownLoadText bold>download the sample</DownLoadText>
						</DownLoadText>
						<LinkWrapper>
							<DownLoadLink
								href={`${process.env.REACT_APP_IPFS_LINK + downLoadLink}?filename=Zpaper-sample.zip`}
								target="_blank"
							>
								DownLoad
							</DownLoadLink>
						</LinkWrapper>
					</ContentRow>
				)}
			</MainWrapper>
		);
	}
);

export default FileInput;
