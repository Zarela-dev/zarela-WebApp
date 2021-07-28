import React from 'react';
import LogCard from '../../components/LogCard/Index';
import styled from 'styled-components';

const Contributes = () => {
  return(
    <div>
      <LogCard success  />
      <LogCard pending  />
    </div>
  )
}

export default Contributes;