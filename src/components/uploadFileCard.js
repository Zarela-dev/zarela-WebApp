import React from 'react';
import { Card, CustomFileInput, HelperText } from './FileCard';
import styled from 'styled-components';
import { Button } from './Elements/Button';

const SubmitButton = styled.button`
	${Button}
	margin-top: ${props => props.theme.spacing(4)};
`;

const ActionFooter = styled.div`
	display: flex;
	justify-content: center;
`;

const UploadFileCard = React.forwardRef(({
	showSelected,
	buttonLabel,
	label,
	helperText,
	name,
	value,
	disableUpload,
	onChange,
	onClick = () => { }
}, ref) => {
	return (
		<Card>
			<CustomFileInput
				hasBorder
				disableUpload={disableUpload}
				showSelected={showSelected}
				buttonLabel={buttonLabel}
				label={label}
				ref={ref}
				name={name}
				value={value}
				onChange={onChange}
			/>
			<HelperText>
				{helperText}
			</HelperText>
			<ActionFooter>
				<SubmitButton onClick={onClick}>
					Submit
				</SubmitButton>
			</ActionFooter>
		</Card>
	);
});

export default UploadFileCard;