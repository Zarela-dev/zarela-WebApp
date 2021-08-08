import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import close from './../assets/icons/close-purple.svg';

const Wrapper = styled.div`
	margin-bottom: ${(props) => (props.isMenuOpen ? '83px' : '0')};
`;

const StyledSelect = styled(Select)`
	.Select__control {
		width: 100%;
		border-radius: 4px;
		cursor: pointer;
		padding-left: 3px;
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
		color: #7246d0;
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
		color: #7246d0;
		& svg {
			width: 24px !important;
			height: 24px !important;
		}
		&:hover {
			color: #7246d0;
			background-color: transparent;
		}
	}

	.Select__menu {
		color: #3c3d3e;
		display: flex;
		flex-direction: flex-row;
		flex-wrap: wrap;
		z-index: 2;
		border: none !important;
		box-shadow: none;
		background-color: #fff;
		margin: 0;
		overflow-y: hidden;
	}
	.Select__menu-list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.Select__option {
		display: inline;
		width: fit-content;
		margin: 3px 7px;
		background: #f4f8fe;
		border-radius: 4px;
		padding: 4px 8px;
		font-size: 14px;
		line-height: 15.5px;
		font-weight: 500;
		color: #333333;
		display: flex;
		align-items: center;
	}
	.Select__option::after {
		content: url(${close});
		width: 24px;
		height: 24px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		top: 2px;
		margin-left: 16px;
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
		border: '1px solid #9090904D',
		borderRadius: '4px',
		position: state.selectProps.isMenuOpen ? 'absolute' : 'relative',
		width: '510px',
		backgroundColor: '#fff',
		height: state.selectProps.isMenuOpen ? '270px' : '',
		zIndex: 5,
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
		bottom: '0',
		top: 'unset',
		zIndex: 5,
	}),
	svg: () => ({
		color: 'red',
	}),
};

const ReactSelect = (
	{ options, onChange, isMulti, menuIsOpen, value, onKeyDown, inputValue },
	props
) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [input, setInput] = useState('');

	return (
		<Wrapper isMenuOpen={isMenuOpen}>
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
			/>
		</Wrapper>
	);
};

export default ReactSelect;
