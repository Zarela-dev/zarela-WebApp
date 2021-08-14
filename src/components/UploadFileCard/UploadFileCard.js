import React from 'react';
import { Card, CustomFileInput, HelperText, ErrorText } from './FileCard';
import styled from 'styled-components';
import Button from '../Elements/Button';

const SubmitButton = styled(Button)`
	margin-top: ${(props) => props.theme.spacing(4)};
	@media only screen and (max-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		margin-top: 0;
	}
`;

const ActionFooter = styled.div`
	display: flex;
	justify-content: center;
`;

const UploadFileCard = React.forwardRef(
	(
		{
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
			onClick = () => {},
		},
		ref
	) => {
		return (
			<Card data-tour="request-details-three">
				<CustomFileInput
					hasBorder
					disableUpload={disableUpload}
					showSelected={showSelected}
					buttonLabel={buttonLabel}
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
				<ActionFooter>
					<SubmitButton disabled={error !== null} variant="primary" onClick={onClick}>
						Submit
					</SubmitButton>
				</ActionFooter>
			</Card>
		);
	}
);

export default UploadFileCard;
