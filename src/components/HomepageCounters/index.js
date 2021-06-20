import React from 'react'
import styled from 'styled-components';
import BankCountdown from './BankCountdown';
import maxWidthWrapper from '../Elements/MaxWidth';
import DailyGift from './DailyGift';

const Wrapper = styled.div`
	${maxWidthWrapper};
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
`;

const HomepageCounters = () => {
	return (
		<Wrapper>
			<BankCountdown />
			<DailyGift />
		</Wrapper>
	)
}

export default HomepageCounters
