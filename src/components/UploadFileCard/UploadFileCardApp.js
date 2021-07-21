import React from 'react';
import { Card, CustomFileInputApp, HelperText, ErrorText } from './FileCard';
import styled from 'styled-components';
import Button from '../Elements/Button';
import uploadPlusBtn from './../../assets/icons/uploadPlusBtn.svg';

const SubmitButton = styled.img`
	
`;

const ActionFooter = styled.div`
	display: flex;
	justify-content: center;
`;

const UploadFileCardApp = React.forwardRef(({
	showSelected,
	buttonLabel,
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
		<Card>
			<CustomFileInputApp
				hasBorder
				disableUpload={disableUpload}
				showSelected={showSelected}
				buttonLabel={<SubmitButton src={uploadPlusBtn} disabled={error !== null} variant='primary' onClick={onClick} />}
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
		</Card>
	);
});

export default UploadFileCardApp;