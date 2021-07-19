import React from 'react';
import styled, { css } from 'styled-components';
import tick from '../../../assets/icons/tick.svg';
import confirmedCheckIcon from '../../../assets/icons/file-check.svg';
import stagedFileSpinner from '../../../assets/icons/stagedFile-spinner.svg';

function getCheckboxBackground(props) {
	let background = '';

	if (props.checked && props.variant === 'confirmed') {
		background = 'blue';
	} else if (props.checked && props.variant === 'staged') {
		background = 'yellow';
	} else if (props.checked) {
		background = '#2eeca8';
	} else {
		background = 'transparent';
	}

	return css`
		background: ${background};
	`;
}

const CheckboxContainer = styled.div`
	margin-right: ${(props) => (!props.small ? props.theme.spacing(1.5) : 0)};
	margin-bottom: ${(props) => (!props.small ? props.theme.spacing(2.5) : 0)};
	cursor: ${(props) => {
		if (props.variant === 'staged' || props.variant === 'confirmed') {
			return 'default';
		} else if (props.readonly) {
			return 'not-allowed';
		} else {
			return 'pointer';
		}
	}};
`;

const ConfirmedFileIcon = styled.img`
	width: 18px;
`;

const StagedFileSpinner = styled.img`
	width: 22px;
`;

const Icon = styled.img`
	margin: 0 auto;
	width: ${(props) => (props.small ? '10px' : '18px')};
	position: relative;
	top: ${(props) => (props.small ? '0px' : '5px')};
`;
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs((props) => {
	return { type: 'checkbox', readonly: props.readonly };
})`
	border: 0;
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`;

const StyledCheckboxWrapper = styled.div`
	display: inline-block;
	position: relative;
	width: ${(props) => (props.small ? '20px' : '40px')};
	height: ${(props) => (props.small ? '20px' : '40px')};
	background: white;
	box-sizing: border-box;
	border-radius: 4px;
	transition: all 150ms;
	text-align: center;
	/* opacity: ${(props) => (props.readonly ? '0.5' : 1)}; */
	opacity: 1;
	border: 3px solid ${(props) => props.theme.primaryFaded};

	${Icon} {
		visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
	}
`;

const StyledCheckbox = styled.div`
	display: inline-block;
	position: absolute;
	z-index: 1;
	top: ${(props) => (props.small ? '-3px' : '2px')};
	left: ${(props) => (props.small ? '-3px' : '2px')};
	width: ${(props) => (props.small ? '20px' : '30px')};
	height: ${(props) => (props.small ? '20px' : '30px')};
	background: white;
	box-sizing: border-box;
	border-radius: 4px;
	transition: all 150ms;
	${(props) => getCheckboxBackground(props)};
	text-align: center;
`;

const Label = styled.label`
	display: flex;
	font-size: 14px;
	line-height: 20px;
	max-width: 620px;
`;

const Checkbox = ({ children, checked, ...props }) => (
	<Label>
		<CheckboxContainer>
			<HiddenCheckbox checked={checked} {...props} />
			<StyledCheckboxWrapper checked={checked} readonly={props.readonly}>
				<StyledCheckbox checked={checked}>
					<Icon src={tick} />
				</StyledCheckbox>
			</StyledCheckboxWrapper>
		</CheckboxContainer>
		{children}
	</Label>
);

export const SmallCheckbox = ({ children, checked, className, ...props }) => (
	<Label className={className}>
		<CheckboxContainer small readonly={props.readonly} variant={props.variant}>
			{props.variant === 'staged' ? (
				<StagedFileSpinner src={stagedFileSpinner} />
			) : props.variant === 'confirmed' ? (
				<ConfirmedFileIcon src={confirmedCheckIcon} />
			) : (
				<>
					<HiddenCheckbox checked={checked} {...props} />
					<StyledCheckboxWrapper small checked={checked}>
						<StyledCheckbox small checked={checked} variant={props.variant}>
							<Icon small src={tick} />
						</StyledCheckbox>
					</StyledCheckboxWrapper>
				</>
			)}
		</CheckboxContainer>
		{children}
	</Label>
);

export default Checkbox;
