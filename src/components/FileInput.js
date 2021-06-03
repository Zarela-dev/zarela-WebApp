import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import fileDownloadIcon from '../assets/icons/file-download.svg';
import fileUploadIcon from '../assets/icons/file-upload.svg';

const withBorder = css`
	background: #FFFFFF;
	border: 0.5px dashed rgba(133, 206, 238, 0.5);
	box-shadow: 0px 4px 18px rgba(223, 236, 255, 0.3);
	border-radius: 5px;
`;

const Wrapper = styled.div`
	${props => props.hasBorder ? withBorder : ''}
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
	max-width: 530px;
	margin: ${props => props.theme.spacing(2)} 0 ${props => props.theme.spacing(4)};
`;

const Title = styled.div`
	color:${props => props.theme.textPrimary};
`;

const InputLabel = styled.label`
	background: #FFFFFF;
	box-shadow: 0px 5.46667px 18px rgba(223, 236, 255, 0.5);
	border-radius: 5.46667px;
	border: 1px solid #BBBEE6;
	padding: ${props => props.theme.spacing(1)} ${props => props.theme.spacing(4)};
	color: #7246D0;
`;

const Icon = styled.img`
	width: 42px;
	margin-right: ${props => props.theme.spacing(1)};
`;

const getFileName = (input, fallbackLabel) => {
	if (input)
		if (input.files)
			if (input.files[0])
				return input.files[0].name;
	return fallbackLabel;
};

const FileInput = forwardRef(({ hasBorder, showSelected, value, buttonLabel, icon, label, ...rest }, ref) => {

	return (
		<Wrapper hasBorder={hasBorder}>
			<InputLabel>
				{buttonLabel}
				<input ref={ref} type='file' style={{ display: 'none' }} {...rest} />
			</InputLabel>
			{
				showSelected ?
					(
						<Title>
							{
								icon === 'download' ?
									<Icon src={fileDownloadIcon} /> :
									<Icon src={fileUploadIcon} />
							}
							{
								getFileName(ref.current, label)
							}
						</Title>
					)
					: (
						<Title>
							{
								icon === 'download' ?
									<Icon src={fileDownloadIcon} /> :
									<Icon src={fileUploadIcon} />
							}
							{label}
						</Title>
					)
			}
		</Wrapper>
	);
});

export default FileInput;
