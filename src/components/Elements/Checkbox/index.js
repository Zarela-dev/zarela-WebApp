import React from 'react';
import styled from 'styled-components';
import tick from '../../../assets/icons/tick.svg'

const CheckboxContainer = styled.div`
	margin-right: ${(props) => (!props.small ? props.theme.spacing(1.5) : props.theme.spacing(1))};
	margin-bottom: ${(props) => (!props.small ? props.theme.spacing(2.5) : 0)};
	cursor: pointer;
`;


const Icon = styled.img`
	margin: 0 auto;
	width: ${(props) => (props.small ? '10px' : '18px')};
	position: relative;
	top: ${(props) => (props.small ? '0px' : '5px')};
`;
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input`
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

	border: ${(props) => (props.disabled ? '3px solid transparent' : `3px solid ${props.theme.primaryFaded}`)};

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
	background: ${(props) => (props.disabled ? '#F4F8FE' : props.checked ? '#2EECA8' : 'transparent')};
	text-align: center;
	/* opacity: ${(props) => (props.disabled ? 0.5 : 1)}; */
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const Label = styled.label`
	display: flex;
	font-size: 14px;
	line-height: 20px;
	max-width: 620px;
	font-weight: normal;
	color: ${(props) => props.theme.textPrimary};
`;

const Checkbox = ({ children, checked, ...props }) => (
	<Label className={props.className}>
		<CheckboxContainer>
			<HiddenCheckbox type="checkbox" checked={checked} {...props} />
			<StyledCheckboxWrapper checked={checked}>
				<StyledCheckbox checked={checked}>
					<Icon src={tick} />
				</StyledCheckbox>
			</StyledCheckboxWrapper>
		</CheckboxContainer>
		{children}
	</Label>
);

export const SmallCheckbox = ({ children, checked, disabled, className, ...props }) => (
	<Label className={className} disabled={disabled}>
		<CheckboxContainer small>
			<HiddenCheckbox type="checkbox" checked={checked} disabled={disabled} {...props} />
			<StyledCheckboxWrapper small checked={checked} disabled={disabled}>
				<StyledCheckbox small checked={checked} disabled={disabled}>
					<Icon small src={tick} />
				</StyledCheckbox>
			</StyledCheckboxWrapper>
		</CheckboxContainer>
		{children}
	</Label>
);

export default Checkbox;
