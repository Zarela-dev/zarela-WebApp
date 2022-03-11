import React, { useContext } from 'react';
import styled from 'styled-components';
import { space, layout, color, compose, fontWeight } from 'styled-system';
import { Box } from 'rebass/styled-components';
import filterIcon from './../../../assets/icons/filter.svg';
import { ThemeIcon } from '../../Elements/Icon';
import { timeConverter } from '../../../utils/helpers';
import FilterLabelItem from './FilterLabelItem';
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

const FilterWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;

const FilterLabelContainer = ({
	modalShow,
	setModalShow,
	selectedTotalBiobitOption,
	setSelectedTotalBiobitOption,
	selectedFulfilledOption,
	setSelectedFulfilledOption,
	applySearch,
	range,
	setRange,
	maxPrice,
	selectedDateRange,
	setSelectedDateRange,
	searchResults,
}) => {
	const { appState } = useContext(mainContext);
	
	return (
		<FilterWrapper>
			{!appState.isMobile && (
				<FilterButton as="div" color="filterText" mt={3} mr={2} onClick={() => setModalShow(!modalShow)}>
					<ThemeIcon variant="big" src={filterIcon} />
					Filters and Sort
				</FilterButton>
			)}

			{/* Total Biobit  */}
			<FilterLabelItem
				label={`BBIT ${selectedTotalBiobitOption.label}`}
				condition={selectedTotalBiobitOption.value !== 'Default'}
				onClick={() => {
					setSelectedTotalBiobitOption({ value: 'Default', label: 'Default' });
					applySearch.order('requestID', 'desc');
				}}
			/>

			{/* Slider */}
			<FilterLabelItem
				label={`BBIT ${range[0]} - ${range[1]}`}
				condition={range[0] !== 0 && range[1] !== maxPrice}
				onClick={() => {
					setRange([0, maxPrice]);
					applySearch.bbitFilter([0, maxPrice]);
				}}
			/>

			{/* Date */}
			<FilterLabelItem
				label={
					Date.parse(selectedDateRange[0].endDate) === Date.parse(selectedDateRange[0].startDate)
						? timeConverter(Date.parse(selectedDateRange[0].startDate))
						: `${timeConverter(Date.parse(selectedDateRange[0].startDate))} - ${timeConverter(
								Date.parse(selectedDateRange[0].endDate)
						  )}`
				}
				condition={!isNaN(Date.parse(selectedDateRange[0].endDate))}
				onClick={() => {
					setSelectedDateRange([
						{
							startDate: null,
							endDate: new Date(''),
							key: 'selection',
						},
					]);
					applySearch.dateFilter([]);
				}}
			/>

			{/* Most Confirmed */}
			<FilterLabelItem
				label="Most Confirmed"
				condition={searchResults.params.mostConfirmed}
				onClick={() => applySearch.mostConfirmed(false)}
			/>

			{/* Near Finish */}
			<FilterLabelItem
				label="Near Finish"
				condition={searchResults.params.nearFinish}
				onClick={(e) => applySearch.nearFinish(false)}
			/>
			{/* Fulfiled */}
			<FilterLabelItem
				label={selectedFulfilledOption?.value}
				condition={selectedFulfilledOption.value !== 'All'}
				onClick={() => {
					setSelectedFulfilledOption({ value: 'All', label: 'All' });
					applySearch.order('requestID', 'desc');
				}}
			/>
		</FilterWrapper>
	);
};

export default FilterLabelContainer;
