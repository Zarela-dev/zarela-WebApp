import React from 'react';
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
import useBiobit from '../../hooks/useBiobit';

const LogCardMobile = ({ data }) => {
	const {
		requestID,
		title,
		totalContributedCount,
		totalContributed,
		totalContributors,
		angelTokenPay,
		laboratoryTokenPay,
		timestamp,
	} = data;
	const getVariant = () => {
		if (+totalContributedCount === 0) return 'primary';
		if (+totalContributed === +totalContributors) return 'confirmed'; // fulfilled
	};
	const getBBIT = useBiobit();

	return (
		<MobileCompactRequestCard variant={getVariant()} noPaddingBottom>
			<MobileHeader>
				<MobileColumn flex={'0 1'}>
					<MobileRequestNumber>{requestID}</MobileRequestNumber>
				</MobileColumn>
				<MobileColumn flex={'1 1'}>
					<MobileRow>
						<MobileTitle noMargin>{title.length < 60 ? title : title.substr(0, 60) + '...'}</MobileTitle>
					</MobileRow>
					<MobileRow>
						<TimestampMobile>{timeSince(timestamp)}</TimestampMobile>
					</MobileRow>
					<MobileRow>
						<MobileBiobitIcon src={biobitIcon} />
						<MobileBiobitValue>{getBBIT(angelTokenPay, laboratoryTokenPay)[0]}</MobileBiobitValue>
						<MobileBiobitValue>{`~ $${getBBIT(angelTokenPay, laboratoryTokenPay)[1]}`}</MobileBiobitValue>
					</MobileRow>
					{+totalContributedCount === 0 ? (
						<MobileRow>
							<QuickReport variant="primary">{`No one has contributed yet!`}</QuickReport>
						</MobileRow>
					) : null}
				</MobileColumn>
			</MobileHeader>
		</MobileCompactRequestCard>
	);
};

export default LogCardMobile;
