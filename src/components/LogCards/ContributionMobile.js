import React, { useState } from 'react';
import {
	QuickReport,
	QuickReportTitle,
	MobileHeader,
	MobileCompactRequestCard,
	MobileColumn,
	MobileStatus,
	MobileRequestNumber,
	MobileTitle,
	MobileBiobitIcon,
	MobileBiobitValue,
	MobileRow,
	MobileBody,
	MobileTable,
	MobileTableRow,
	MobileTableColumn,
	MobileTableData,
	MobileTableTitle,
} from './Elements';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import checkedGreen from '../../assets/icons/check-green.svg';
import pendingIcon from '../../assets/icons/pending.svg';
import { Spacer } from '../Elements/Spacer';
import { timeSince } from '../../utils';

const LogCardMobile = ({ data }) => {
	const [isOpen, setOpen] = useState(false);
	const { requestID, title, angelTokenPay, laboratoryTokenPay, contributions } = data;
	const totalPending = contributions.filter((item) => item.status === false).length;
	const totalConfirmed = contributions.filter((item) => item.status === true).length;
	const allApproved = contributions.length === totalConfirmed;
	const getVariant = () => {
		if (allApproved) return 'confirmed';
		if (contributions.length !== totalConfirmed) return 'primary';
	};

	return (
		<MobileCompactRequestCard variant={getVariant()}>
			<MobileHeader onClick={() => setOpen((value) => !value)}>
				<MobileColumn flex={'0 1'}>
					<MobileRequestNumber>{requestID}</MobileRequestNumber>
				</MobileColumn>
				<MobileColumn flex={'1 1'}>
					<MobileRow>
						<MobileTitle>{title.length < 70 ? title : title.substr(0, 70) + '...'}</MobileTitle>
					</MobileRow>
					<MobileRow>
						<MobileBiobitIcon src={biobitIcon} />
						<MobileBiobitValue>{+angelTokenPay + +laboratoryTokenPay}</MobileBiobitValue>
						<MobileBiobitValue>{`~ $${+angelTokenPay + +laboratoryTokenPay}`}</MobileBiobitValue>
					</MobileRow>
					<MobileRow>
						{allApproved ? (
							<QuickReport variant="confirmed">{`all ${contributions.length} are confirmed. >>`}</QuickReport>
						) : (
							<>
								<QuickReportTitle variant="primary">{`${
									totalPending + totalConfirmed
								} files: `}</QuickReportTitle>
								<QuickReport variant="primary">{` ${totalConfirmed} approved, ${totalPending} pending >> `}</QuickReport>
							</>
						)}
					</MobileRow>
				</MobileColumn>
				<MobileColumn flex={'0 0 35px'} />
				{allApproved ? (
					<>
						<MobileStatus src={checkedGreen} />
					</>
				) : (
					<>
						<MobileStatus src={pendingIcon} />
					</>
				)}
			</MobileHeader>
			{isOpen ? (
				<MobileBody>
					<MobileTable>
						{contributions.map(({ originalIndex, timestamp, zarelaDay, status }, rowIndex) => (
							<MobileTableRow key={originalIndex}>
								<MobileTableColumn flex={'6'}>
									<MobileTableTitle>{`${rowIndex + 1}. File #${originalIndex}`}</MobileTableTitle>
									<MobileTableData>{timeSince(timestamp)}</MobileTableData>
									<MobileTableData>{`Zarela Day: ${zarelaDay} th`}</MobileTableData>
								</MobileTableColumn>
								<Spacer />
								<MobileTableColumn flex="0">
									{status ? (
										<MobileStatus static src={checkedGreen} />
									) : (
										<MobileStatus static src={pendingIcon} />
									)}
								</MobileTableColumn>
							</MobileTableRow>
						))}
					</MobileTable>
				</MobileBody>
			) : null}
		</MobileCompactRequestCard>
	);
};

export default LogCardMobile;
