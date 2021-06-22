import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BankCountdown from './BankCountdown';
import maxWidthWrapper from '../Elements/MaxWidth';
import DailyGift from './DailyGift';
import { Spacer } from '../Elements/Spacer';

const Wrapper = styled.div`
	${maxWidthWrapper};
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
`;

function getDifferenceInHours(date1, date2) {
	const diffInMs = Math.abs(date2 - date1);
	return diffInMs / (1000 * 60 * 60);
}

function getDifferenceInMSeconds(date1, date2) {
	const diffInMs = Math.abs(date2 - date1);
	return diffInMs;
}

const HomepageCounters = ({ zarelaInitDate, todayGift }) => {
	const [timer, setTimer] = useState(0);
	const timerValue = 54000000; // 15 hours

	useEffect(() => {
		if (zarelaInitDate !== null) {
			setTimer(new Date().getTime() + (timerValue - getDifferenceInMSeconds(zarelaInitDate, new Date().getTime())));
		}
	}, [zarelaInitDate]);

	console.log('timer', timer);
	return (
		<Wrapper>
			{
				timer !== 0 ?
					<BankCountdown countdown={timer} />
					: <Spacer />
			}
			<DailyGift giftValue={todayGift} />
		</Wrapper>
	);
};

export default HomepageCounters;
