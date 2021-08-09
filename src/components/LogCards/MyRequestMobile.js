import React, { useState } from 'react';
import {
	QuickReport,
	MobileHeader,
	MobileCompactRequestCard,
	MobileColumn,
	MobileRequestNumber,
	MobileTitle,
	MobileBiobitIcon,
	MobileBiobitValue,
	MobileRow,
	TimestampMobile,
} from './Elements';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import { timeSince } from '../../utils';

const LogCardMobile = ({ data }) => {
	const { requestID, title, totalContributedCount, tokenPay, timestamp } = data;

	return (
		<MobileCompactRequestCard>
			<MobileHeader>
				<MobileColumn flex={'0 1'}>
					<MobileRequestNumber>{requestID}</MobileRequestNumber>
				</MobileColumn>
				<MobileColumn flex={'1 1'}>
					<MobileRow>
						<MobileTitle noMargin>{title}</MobileTitle>
					</MobileRow>
					<MobileRow>
						<TimestampMobile>{timeSince(timestamp)}</TimestampMobile>
					</MobileRow>
					<MobileRow>
						<MobileBiobitIcon src={biobitIcon} />
						<MobileBiobitValue>{tokenPay}</MobileBiobitValue>
						<MobileBiobitValue>{`~ $${tokenPay}`}</MobileBiobitValue>
					</MobileRow>
					{+totalContributedCount === 0 ? (
						<MobileRow>
							<QuickReport>{`No one has contributed yet!`}</QuickReport>
						</MobileRow>
					) : null}
				</MobileColumn>
			</MobileHeader>
		</MobileCompactRequestCard>
	);
};

export default LogCardMobile;
