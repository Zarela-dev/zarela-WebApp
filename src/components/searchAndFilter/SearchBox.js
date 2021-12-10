import React, { useState, useEffect } from 'react'
import RequestCardWrapper from './../Elements/RequestCard';

import SearchInput from './../Elements/SearchInput'

const SearchBox = () => {
  const [search, setSearch] = useState()

  useEffect(() => {
    console.log('live search')
  }, [search])

  return (
    <RequestCardWrapper>
      <SearchInput
        label="Search"
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
      />
    </RequestCardWrapper>
  )
}

export default SearchBox