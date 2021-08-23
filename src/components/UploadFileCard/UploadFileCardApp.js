import React from 'react';
import { Card, CustomFileInputApp, HelperText, ErrorText } from './FileCard';
import styled from 'styled-components';
import uploadPlusBtn from './../../assets/icons/uploadPlusBtn.svg';

const SubmitButton = styled.img``;

const MobileCard = styled(Card)`
	border: none;
	padding: 18px;
	margin: 0;
`;

const UploadFileCardApp = React.forwardRef(
	(
		{ showSelected, label, helperText, name, value, error, setError, disableUpload, onChange, onClick = () => {} },
		ref
	) => {
		return (
			<MobileCard>
				<CustomFileInputApp
					hasBorder
					disableUpload={disableUpload}
					showSelected={showSelected}
					buttonLabel={
						<SubmitButton
							src={uploadPlusBtn}
							disabled={error !== null}
							variant="primary"
							onClick={onClick}
						/>
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

export default UploadFileCardApp;
