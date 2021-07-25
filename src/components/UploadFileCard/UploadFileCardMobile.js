import React from 'react';
import { Card, CustomFileInputMobile, HelperText, ErrorText } from './FileCard';
import styled from 'styled-components';
import uploadPlusBtn from './../../assets/icons/uploadPlusBtn.svg';

const SubmitButton = styled.button`
	background-image: url(${uploadPlusBtn});
	width: 38px;
  height: 38px;
  background-position: center;
	outline: none;
	border: none;
	border-radius: 3px;
`;

const MobileCard = styled(Card)`
	border: none;
	padding: 0 18px;
	margin: 0;
`;


const UploadFileCardMobile = React.forwardRef(({
	showSelected,
	label,
	helperText,
	name,
	value,
	error,
	setError,
	disableUpload,
	onChange,
	onClick = () => { }
}, ref) => {
	return (
		<MobileCard>
			<CustomFileInputMobile
				hasBorder
				disableUpload={disableUpload}
				showSelected={showSelected}
				buttonLabel={<SubmitButton disabled={error !== null} variant='primary' onClick={onClick} />}
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
			<HelperText>
				{helperText}
			</HelperText>
			<ErrorText>
				{error}
			</ErrorText>
		</MobileCard>
	);
});

export default UploadFileCardMobile;