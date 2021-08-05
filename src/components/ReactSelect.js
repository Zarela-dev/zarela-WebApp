import React from 'react';
import Select from 'react-select';
import Styled from 'styled-components';

const StyledSelect = Styled(Select)`
	.Select__control {
		height: fit-content;
		width: 100%;
		border: 1px solid #909090;
		border-radius: 0;
		cursor: pointer;
	}

	.Select__control:hover {
		border-color: #909090;
	}

	.Select__control--is-focused {
		box-shadow: 0 0 0 1px #909090;
		outline: none;
	}

	.Select__indicator-separator {
		display: none;
	}

	.Select__multi-value__remove{
		color: #7246D0;
		&:hover {
			color: #7246D0;
			background-color: transparent;
		}
	}
	.Select__menu {
		color: #3c3d3e;
		display: flex;
		flex-direction: flex-row;
		flex-wrap: wrap;

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

	.Select__multi-value {
		background: #f4f8fe;
		padding: 5px;
		border-radius: 4px;
	}
`;

const ReactSelect = ({options , onChange, isMulti, menuIsOpen, value}) => {
	return (
		<StyledSelect
			classNamePrefix="Select"
			options={options}
			onChange={onChange}
			isMulti={isMulti}
			autoFocus
			menuIsOpen={menuIsOpen}
			value={value}
		/>
	);
};

export default ReactSelect;
