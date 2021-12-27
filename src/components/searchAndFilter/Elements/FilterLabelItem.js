import React, { useContext } from 'react';
import styled from 'styled-components';
import { space, layout, color, compose, fontWeight } from 'styled-system';
import { Box } from 'rebass/styled-components';
import { ThemeIcon } from '../../Elements/Icon';
import filterClose from './../../../assets/icons/filter-close.svg';
import { mainContext } from '../../../state';

const FilterButton = styled(Box)(compose(space, layout, color, fontWeight), {
	border: '1px solid #838383',
	borderRadius: '25px',
	width: '162px',
	height: '40px',
	display: 'flex',
	justifyContent: 'start',
	alignItems: 'center',
	padding: '0 10px',
	cursor: 'pointer',
	fontSize: '14px',
	lineHeight: '19.5px',
	fontWeight: '500',
});

const FilterElement = styled(FilterButton)`
	width: fit-content;
`;

const FilterLabelItem = ({ label, condition, onClick }) => {
	const { appState } = useContext(mainContext);
	return (
		<>
			{condition && (
				<FilterElement as="div" color="filterText" mt={3} mr={2}>
					{label}
					<ThemeIcon variant={appState.isMobile ? 'normal' : 'big'} mr={0} ml={2} src={filterClose} onClick={onClick} />
				</FilterElement>
			)}
		</>
	);
};

export default FilterLabelItem;
