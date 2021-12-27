import React from 'react';
import { timeConverter } from './../../../../utils/helpers';
import { ThemeButton } from '../../../Elements/Button';
import FilterInput from './FilterInput';

const FilterForm = ({
	totalBiobitSelectOptions,
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
				label="Near finish"
				type="switch"
				checked={searchResults.params.nearFinish}
				onChange={(e) => applySearch.nearFinish(e.target.checked)}
			/>

			<FilterInput
				label="Most Confirmed"
				type="switch"
				checked={searchResults.params.mostConfirmed}
				onChange={(e) => applySearch.mostConfirmed(e.target.checked)}
			/>

			<FilterInput
				label="Fulfiled"
				type="switch"
				checked={searchResults.params.fulfilled}
				onChange={(e) => applySearch.fulfilled(e.target.checked)}
			/>

			<ThemeButton variant="block" size="block" onClick={() => setModalShow(false)}>
				Submit
			</ThemeButton>
		</>
	);
};

export default FilterForm;
