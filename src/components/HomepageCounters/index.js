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

const HomepageCounters = ({ zarelaInitDate, zarelaDailyGift, todayGift }) => {
	const [bankCountdown, setBankCountdown] = useState(0);
	const [giftCountdown, setGiftCountdown] = useState(0);
	const bankInterval = 7776000000; // 90 days
	const giftInterval = 86400000; // 24 hours

	useEffect(() => {
		if (zarelaInitDate !== null && zarelaDailyGift !== null) {
			setBankCountdown(1627141373705 /* 2021-07-24 */ + 45 * 24 * 60 * 60 * 1000);
			setGiftCountdown(
				new Date().getTime() +
					(giftInterval - getDifferenceInMSeconds(zarelaDailyGift, new Date().getTime()))
			);
		}
	}, [zarelaInitDate, zarelaDailyGift]);

	return (
		<Wrapper>
			{bankCountdown !== 0 ? <BankCountdown countdown={bankCountdown} /> : <Spacer />}
			{bankCountdown !== 0 ? (
				<DailyGift countdown={giftCountdown} giftValue={todayGift} />
			) : (
				<Spacer />
			)}
		</Wrapper>
	);
};

export default HomepageCounters;
