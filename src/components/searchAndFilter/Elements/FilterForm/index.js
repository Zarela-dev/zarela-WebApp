import React from 'react';
import { timeConverter } from './../../../../utils/helpers';
import { ThemeButton } from '../../../Elements/Button';
import FilterInput from './FilterInput';

const FilterForm = ({
	totalBiobitSelectOptions,
	fulfilledSelectOptions,
	selectedFulfilledOption,
	setSelectedFulfilledOption,
	selectedTotalBiobitOption,
	setSelectedTotalBiobitOption,
	range,
	maxPrice,
	handleChangeRange,
	selectedDateRange,
	toggleModals,
	setModalShow,
	applySearch,
	searchResults,
}) => {
	return (
		<>
			<FilterInput
				label="Total BBIT"
				type="select"
				options={totalBiobitSelectOptions}
				onChange={(e) => {
					if (e.value === 'HighToLow') {
						applySearch.order('bbit', 'desc');
					} else if (e.value === 'LowToHigh') {
						applySearch.order('bbit', 'asc');
					} else if (e.value === 'Default') {
						applySearch.order('requestID', 'desc');
					}
					setSelectedTotalBiobitOption(e);
				}}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						setSelectedTotalBiobitOption({ value: e.target.value, label: e.target.value });
					}
				}}
				value={selectedTotalBiobitOption}
			/>

			<FilterInput
				label="Total BBIT Range"
				type="range"
				value={range}
				onChange={handleChangeRange}
				min={0}
				max={maxPrice}
			/>

			<FilterInput
				label="Date"
				type="calendar"
				placeholder="Please choose date"
				onFocus={toggleModals}
				value={
					selectedDateRange[0].startDate !== null && selectedDateRange[0].endDate !== null
						? Date.parse(selectedDateRange[0].endDate) === Date.parse(selectedDateRange[0].startDate)
							? timeConverter(Date.parse(selectedDateRange[0].startDate))
							: `${timeConverter(Date.parse(selectedDateRange[0].startDate))} - ${timeConverter(
									Date.parse(selectedDateRange[0].endDate)
							  )}`
						: ''
				}
			/>

			<FilterInput
				label="Fulfiled"
				type="select"
				info="Requests that have received as much contributions as required by the mage and can no longer receive contributions."
				options={fulfilledSelectOptions}
				onChange={(e) => {
					applySearch.fulfilled(e.value);
					setSelectedFulfilledOption(e);
				}}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						setSelectedFulfilledOption({ value: e.target.value, label: e.target.value });
					}
				}}
				value={selectedFulfilledOption}
			/>

			<FilterInput
				label="Near finish"
				type="switch"
				info="Requests with only 30% remaining capacity for contribution."
				checked={searchResults.params.nearFinish}
				onChange={(e) => applySearch.nearFinish(e.target.checked)}
			/>

			<FilterInput
				label="Most Confirmed"
				type="switch"
				info="Requests with more than 70% ratio on how many contributions the mage has accepted."
				checked={searchResults.params.mostConfirmed}
				onChange={(e) => applySearch.mostConfirmed(e.target.checked)}
			/>

			<ThemeButton
				variant="block"
				size="block"
				onClick={() => setModalShow(false)}
				disabled={searchResults.data.length === 0}
			>
				{searchResults.data.length > 0
					? searchResults.hasActiveFilters
						? `Show ${searchResults.data.length} results`
						: 'Submit'
					: 'No results found!'}
			</ThemeButton>
		</>
	);
};

export default FilterForm;
