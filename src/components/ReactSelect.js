import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { BodyText } from './Elements/Typography';

const Wrapper = styled.div`
	margin-bottom: 50px;
	position: relative;
`;

const StyledSelect = styled(Select)`
	.Select__control {
		width: 100%;
		border-radius: 4px;
		cursor: pointer;
		padding-left: 3px;
		position: relative;
	}
	.Select__control::after {
		content: '';
		width: 490px;
		height: 1px;
		background: #9090904d;
		margin: 1px auto 5px auto;
		display: ${(props) => (props.isMenuOpen ? '' : 'none')};
	}
	.Select__clear-indicator {
		display: none;
	}
	.Select__dropdown-indicator {
		color: ${(props) => props.theme.colors.primary};
		transform: ${(props) => (props.isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
		transition: all 0.3s;
	}

	.Select__control:hover {
		height: fit-content;
		width: 100%;
		border: none;
		cursor: pointer;
	}

	.Select__control:hover {
		border: none;
		outline: none;
	}
	.Select__control:active {
		border: none;
		outline: none;
	}
	.Select__control:focus {
		border: none !important;
	}

	.Select__control--is-focused {
		border: none !important;
		outline: none;
	}
	.Select__indicator-separator {
		display: none;
	}
	.Select__value-container {
		padding: 3px 4px;
	}

	.Select__multi-value__remove {
		color: ${(props) => props.theme.colors.primary};
		& svg {
			width: 24px !important;
			height: 24px !important;
		}
		&:hover {
			color: ${(props) => props.theme.colors.primary};
			background-color: transparent;
		}
	}

	.Select__menu {
		color: ${(props) => props.theme.colors.textPrimary};
		display: flex;
		flex-direction: flex-row;
		flex-wrap: wrap;
		z-index: 2;
		border: none !important;
		box-shadow: none;
		background-color: ${(props) => props.theme.colors.bgWhite};
		margin: 0;
		overflow-y: hidden;
		position: relative;
		padding: 0 10px;
	}
	.Select__menu-list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.Select__option {
		display: inline;
		width: fit-content;
		margin-bottom: 5px;
		margin-right: 5px;
		background: ${(props) => props.theme.colors.bgDisabled};
		border-radius: 4px;
		padding: 7.5px 16px;
		font-size: 14px;
		line-height: 15.5px;
		font-weight: 500;
		color: ${(props) => props.theme.colors.textPrimary};
		display: flex;
		align-items: center;
	}
	.Select__placeholder {
		font-size: 12px;
		font-weight: 500;
		line-height: 18px;
		color: ${(props) => props.theme.colors.textTimestamp};
	}

	.Select__multi-value {
		background: ${(props) => props.theme.colors.bgDisabled};
		padding: 5px;
		border-radius: 4px;
	}
	.Select__multi-value__label {
		font-size: 14px;
		font-weight: 400;
		line-height: 16.8px;
		color: ${(props) => props.theme.colors.textPrimary};
	}
	#react-select-3-input {
		width: 100%;
		font-size: 12px;
		line-height: 18px;
		font-weight: 500;
	}
`;

const customStyles = {
	container: (provided, state) => ({
		...provided,
		border: '1px solid #9090904D',
		borderRadius: '4px',
		width: '510px',
		backgroundColor: '#fff',
		maxHeight: state.selectProps.isMenuOpen ? '270px' : '',
		zIndex: 1,
		overflow: 'hidden',
	}),
	control: () => ({
		border: 'none',
		alignItems: 'center',
		boxAlign: 'center',
		backgroundColor: 'hsl(0, 0% , 100%)',
		cursor: 'default',
		display: 'flex',
		boxFlexWrap: 'wrap',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	}),
	menu: (provided, state) => ({
		...provided,
		position: 'absolute',
		bottom: '0',
		top: 'unset',
		zIndex: 5,
	}),
	svg: () => ({
		color: 'red',
	}),
};

export const Error = styled.label`
	font-weight: 500;
	font-size: 10px;
	line-height: 20px;
	color: ${(props) => props.theme.colors.textPrimary.error};
`;

const Label = styled.label`
	display: flex;
	width: 100%;
	justify-content: space-between;
	margin-bottom: ${(props) => props.theme.spacing(0.5)};
`;

const LabelText = styled.div`
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	color: ${(props) => props.theme.colors.textTimestamp};
`;

const Hint = styled.div`
	font-weight: normal;
	font-size: 13px;
	line-height: 16px;
`;

const ReactSelect = ({ options, onChange, isMulti, value, onKeyDown, error, label, hint, placeholder }, props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [input, setInput] = useState('');

	return (
		<Wrapper isMenuOpen={isMenuOpen}>
			<Label>
				<BodyText variant="extraSmall" color="timestamp">
					{label}
				</BodyText>
				{hint ? <Hint>{hint}</Hint> : null}
			</Label>
			<StyledSelect
				{...{ props }}
				classNamePrefix="Select"
				options={options}
				onChange={(e) => {
					setIsMenuOpen(true);
					onChange(e);
				}}
				onKeyDown={(e) => {
					onKeyDown(e);
					if (e.key === 'Enter') {
						setInput('');
					}
				}}
				styles={customStyles}
				isMulti={isMulti}
				autoFocus
				menuIsOpen={isMenuOpen}
				onMenuOpen={() => setIsMenuOpen(true)}
				onMenuClose={() => setIsMenuOpen(false)}
				isMenuOpen={isMenuOpen}
				valueLength={value.length}
				value={value}
				inputValue={input}
				onInputChange={(e) => setInput(e)}
				placeholder={placeholder}
			/>
			{error ? <Error>{error}</Error> : null}
		</Wrapper>
	);
};

export default ReactSelect;
