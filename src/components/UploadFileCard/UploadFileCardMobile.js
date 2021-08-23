import React from 'react';
import { Card, CustomFileInputMobile, HelperText, ErrorText } from './FileCard';
import styled from 'styled-components';
import { GenericLinkButton } from './../Elements/Button';
import plusIcon from '../../assets/icons/requests/uploadPlus.svg';

const MobileCard = styled(Card)`
	border: none;
	padding: 0 18px;
	margin: 0;
`;

const UploadFileButtonWrapper = styled.div`
	position: relative;
	background: transparent;
	flex: 1;
	height: 37px;
	min-width: 37px;
`;

const UploadFileButton = styled(GenericLinkButton)`
	width: 37px;
	height: 37px;
	position: absolute;
	margin: 0;
	background: linear-gradient(228.09deg, #8cc0f1 -3.49%, #a291fb 96.8%);

	& > a {
		padding: ${(props) => props.theme.spacing(1)};
	}
`;

const UploadFileIcon = styled.img`
	width: 100%;
	display: flex;
	align-self: center;
`;

const UploadFileCardMobile = React.forwardRef(
	(
		{ showSelected, label, helperText, name, value, error, setError, disableUpload, onChange, onClick = () => {} },
		ref
	) => {
		return (
			<MobileCard>
				<CustomFileInputMobile
					hasBorder
					disableUpload={disableUpload}
					showSelected={showSelected}
					buttonLabel={
						<UploadFileButtonWrapper>
							<UploadFileButton>
								<UploadFileIcon src={plusIcon} />
							</UploadFileButton>
						</UploadFileButtonWrapper>
					}
					label={label}
					ref={ref}
					name={name}
					value={value}
					onChange={(e) => {
						if (e.target.value !== '' && e.target.value !== null) {
							setError(null);
							onChange(e);
						}
					}}
				/>
				<HelperText>{helperText}</HelperText>
				<ErrorText>{error}</ErrorText>
			</MobileCard>
		);
	}
);

export default UploadFileCardMobile;
