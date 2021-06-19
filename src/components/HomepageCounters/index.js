import React from 'react'
import styled from 'styled-components';
import BankCountdown from './BankCountdown';

const Wrapper = styled.div`
	height: 150px;
`;


const HomepageCounters = () => {
	return (
		<div>
			<BankCountdown />
		</div>
	)
}

export default HomepageCounters
