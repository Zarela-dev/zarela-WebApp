import React, { useState, useContext } from 'react';
import RequestCardWrapper from './../Elements/RequestCard';
import { mainContext } from '../../state';
import FilterMobile from '../Elements/Search/FilterMobile';

import SearchInput from '../Elements/Search/SearchInput';

const SearchBox = () => {
	const [search, setSearch] = useState();
	const { appState, dispatch } = useContext(mainContext);

	if (appState.isMobile) {
		return (
			<FilterMobile
				label="Search"
				type="text"
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			/>
		);
	} else {
		return (
			<RequestCardWrapper>
				<SearchInput
					label="Search"
					type="text"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
				/>
			</RequestCardWrapper>
		);
	}
};

export default SearchBox;
