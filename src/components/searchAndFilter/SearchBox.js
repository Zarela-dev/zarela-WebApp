import React, { useContext } from 'react';
import RequestCardWrapper from './../Elements/RequestCard';
import { mainContext } from '../../state';
import FilterMobile from '../Elements/Search/FilterMobile';

import SearchInput from '../Elements/Search/SearchInput';

const SearchBox = ({ requests, applySearch, searchResults }) => {
	const { appState, dispatch } = useContext(mainContext);

	if (appState.isMobile) {
		return <FilterMobile {...{ requests, applySearch, searchResults }} />;
	} else {
		return (
			<RequestCardWrapper>
				<SearchInput {...{ requests, applySearch, searchResults }} />
			</RequestCardWrapper>
		);
	}
};

export default SearchBox;
