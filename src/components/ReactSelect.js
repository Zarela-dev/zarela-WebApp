import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const Wrapper = styled.div``;

const StyledSelect = styled(Select)`
	.Select__control {
		height: fit-content;
		width: 100%;
		border-radius: 4px;
		cursor: pointer;
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
		color: #7246d0;
		&:hover {
			color: #7246d0;
			background-color: transparent;
		}
	}
	.Select__menu::before {
		content: '';
		width: 490px;
		height: 1px;
		background: #9090904d;
		margin: 0 auto 5px auto;
	}

	.Select__menu {
		color: #3c3d3e;
		display: flex;
		flex-direction: flex-row;
		flex-wrap: wrap;
		z-index: 2;
		border: none !important;
		box-shadow: none;
	}
	.Select__menu-list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.Select__option {
		display: inline;
		width: fit-content;
		background: #f4f8fe;
		margin: 5px;
		border-radius: 4px;
		padding: 5px;
		font-size: 14px;
		line-height: 15.5px;
		font-weight: 500;
		color: #333333;
	}
	.Select__placeholder {
		font-size: 12px;
		font-weight: 500;
		line-height: 18px;
		color: #c4c4c4;
	}

	.Select__multi-value {
		background: #f4f8fe;
		padding: 5px;
		border-radius: 4px;
	}
	.Select__multi-value__label {
		font-size: 14px;
		font-weight: 400;
		line-height: 16.8px;
		color: #212121;
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
		height: 'fit-content',
		border: '1px solid #9090904D',
		borderRadius: '4px',
		position: 'relative',
		height: state.selectProps.isMenuOpen && '180px',
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
		border: 'none',
	}),
	menu: (provided, state) => ({
		...provided,
		position: 'absolute',
		bottom: '5px',
		top: 'unset',
	}),
};

export const Error = styled.label`
	font-weight: 500;
	font-size: 10px;
	line-height: 20px;
	color: #f62d76;
`;

const ReactSelect = (
	{ options, onChange, isMulti, menuIsOpen, value, onKeyDown, inputValue, error },
	props
) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [input, setInput] = useState('');

	return (
		<Wrapper>
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
				value={value}
				inputValue={input}
				onInputChange={(e) => setInput(e)}
			/>
			{error ? <Error>{error}</Error> : null}
		</Wrapper>
	);
};

export default ReactSelect;
