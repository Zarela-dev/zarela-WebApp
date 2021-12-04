import React from 'react';
import { MobileCompactRequestCard } from './Elements';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import { timeSince } from '../../utils';
import useBiobit from '../../hooks/useBiobit';
import { IdLabel } from './../Elements/IdLabel';
import { BodyText, LinkText } from './../Elements/Typography';
import { Row, Col } from './../Elements/Flex';
import { ThemeIcon } from './../Elements/Icon';

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
			<Row alignItems="start" width="100%">
				<Col mr={2}>
					<IdLabel>{requestID}</IdLabel>
				</Col>
				<Col flex={'1 1'}>
					<Row>
						<LinkText to={`/request/${requestID}`} sx={{color: 'textPrimary', textDecoration: 'none', lineHeight: '20px' }} variant="extraSmall" fontWeight="semiBold">
							{title.length < 60 ? title : title.substr(0, 60) + '...'}
						</LinkText>
					</Row>
					<Row>
						<BodyText variant="timestamp">{timeSince(timestamp)}</BodyText>
					</Row>
					<Row alignItems="center" mt={[1]} mb={3}>
						<ThemeIcon variant="small" src={biobitIcon} />
						<BodyText variant="hint" fontWeight="medium">
							{getBBIT(angelTokenPay, laboratoryTokenPay)[0]}
						</BodyText>
						<BodyText variant="hint" fontWeight="medium">{`~ $${
							getBBIT(angelTokenPay, laboratoryTokenPay)[1]
						}`}</BodyText>
					</Row>
					{+totalContributedCount === 0 ? (
						<Row alignItems="center" mb={3}>
							<BodyText
								variant="hint"
								fontWeight="medium"
								color="bgBadge"
							>{`No one has contributed yet!`}</BodyText>
						</Row>
					) : null}
				</Col>
			</Row>
		</MobileCompactRequestCard>
	);
};

export default LogCardMobile;
