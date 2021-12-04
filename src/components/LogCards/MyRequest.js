import React from 'react';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import contributorIcon from '../../assets/icons/contributor-new.svg';
import { IdLabel } from './../Elements/IdLabel';
import { Header, BodyText, LinkText } from './../Elements/Typography';
import { Row, Col } from './../Elements/Flex';
import { ThemeDivider } from './../Elements/Divider';
import { ThemeIcon } from './../Elements/Icon';
import { CompactRequestCard, QuickReport } from './Elements';
import { timeSince } from '../../utils';
import useBiobit from '../../hooks/useBiobit';

const LogCard = ({ data }) => {
	const {
		requestID,
		title,
		angelTokenPay,
		laboratoryTokenPay,
		timestamp,
		totalContributors,
		totalContributed,
		totalContributedCount,
	} = data;
	const getVariant = () => {
		if (+totalContributedCount === 0) return 'primary';
		if (+totalContributed === +totalContributors) return 'confirmed'; // fulfilled
	};
	const getBBIT = useBiobit();

	return (
		<CompactRequestCard variant={getVariant()}>
			<Row justifyContent="space-evenly" width="100%">
				<Col flex="0 0 80px" mr={3} alignSelf="center">
					<IdLabel>{requestID}</IdLabel>
				</Col>
				<Col flex="0 1 40%">
					<Row>
						<Header
							sx={{
								display: 'inline-block',
								width: '80%',
								whiteSpace: 'nowrap',
								overflow: 'hidden !important',
								textOverflow: 'ellipsis',
							}}
							as={undefined}
							variant="heading5"
							fontWeight="semiBold"
						>
							{title}
						</Header>
					</Row>
					{+totalContributedCount === 0 ? (
						<Row>
							<QuickReport variant="primary">{`No one has contributed yet!`}</QuickReport>
						</Row>
					) : null}
				</Col>
				<Col>
					<Row>
						<ThemeDivider variant="vertical" />
						<BodyText variant="timestamp" minWidth="195px">
							{timeSince(timestamp)}
						</BodyText>
						<ThemeDivider variant="vertical" />
						<Col flex="1" sx={{ whiteSpace: 'nowrap' }}>
							<Row>
								<ThemeIcon variant="big" src={biobitIcon} />
								<BodyText variant="small">{getBBIT(angelTokenPay, laboratoryTokenPay)[0]}</BodyText>
								<BodyText variant="small">{`~ $${getBBIT(angelTokenPay, laboratoryTokenPay)[1]}`}</BodyText>
							</Row>
						</Col>
						<ThemeDivider variant="vertical" />
						<Col>
							<Row>
								<ThemeIcon variant="big" src={contributorIcon} />
								<BodyText variant="small">{totalContributors}</BodyText>
							</Row>
						</Col>
					</Row>
				</Col>
				<ThemeDivider variant="vertical" />
				<Col flex={'0 0 100px'}>
					<BodyText
						variant="small"
						as={LinkText}
						target={'_blank'}
						sx={{ textDecoration: 'none', color: 'textToken' }}
						to={`/request/${requestID}`}
					>
						view request
					</BodyText>
				</Col>
			</Row>
		</CompactRequestCard>
	);
};

export default LogCard;
