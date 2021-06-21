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

const HomepageCounters = ({todayGift}) => {
	return (
		<Wrapper>
			<BankCountdown />
			<DailyGift giftValue={todayGift}/>
		</Wrapper>
	)
}

export default HomepageCounters
