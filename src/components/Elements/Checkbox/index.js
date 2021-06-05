import React from 'react';
import styled from 'styled-components';
import tick from '../../../assets/icons/tick.svg';

const CheckboxContainer = styled.div`
	margin-right: ${props => !props.small ? props.theme.spacing(1.5) : 0};
	margin-bottom: ${props => !props.small ? props.theme.spacing(2.5) : 0};
`;

const Icon = styled.img`
	width: ${props => props.small ? '20px' : '40px'};
`;
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
	border: 0;
	clip: rect(0 0 0 0);
	clippath: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`;


const StyledCheckbox = styled.div`
	display: inline-block;
	width: ${props => props.small ? '20px' : '40px'};
	height: ${props => props.small ? '20px' : '40px'};
	background: white;
	border: 1px solid #A78BE2;
	box-sizing: border-box;
	border-radius: 4px;
	transition: all 150ms;

	${HiddenCheckbox}:focus + & {
		box-shadow: 0 0 0 3px ${props => props.theme.primaryFaded};
	}

	${Icon} {
		visibility: ${props => (props.checked ? 'visible' : 'hidden')}
	}
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
			<StyledCheckbox checked={checked}>
				<Icon src={tick} />
			</StyledCheckbox>
		</CheckboxContainer>
		{children}
	</Label>
);

export const SmallCheckbox = ({ children, checked, className, ...props }) => (
	<Label className={className}>
		<CheckboxContainer small>
			<HiddenCheckbox checked={checked} {...props} />
			<StyledCheckbox small checked={checked}>
				<Icon small src={tick} />
			</StyledCheckbox>
		</CheckboxContainer>
		{children}
	</Label>
);

export default Checkbox;
