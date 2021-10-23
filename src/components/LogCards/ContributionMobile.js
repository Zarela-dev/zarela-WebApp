import React, { useState } from 'react';
import { MobileCompactRequestCard, MobileBody, MobileTable } from './Elements';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import checkedGreen from '../../assets/icons/check-green.svg';
import pendingIcon from '../../assets/icons/pending.svg';
import angelIcon from '../../assets/icons/angel.png';
import hubIcon from '../../assets/icons/hub.png';
import { timeSince } from '../../utils';
import useBiobit from '../../hooks/useBiobit';
import { IdLabel } from './../Elements/IdLabel';
import { BodyText } from './../Elements/Typography';
import { Row, Col } from './../Elements/Flex';
import { ThemeIcon } from './../Elements/Icon';
import { ThemeDivider } from './../Elements/Divider';

const LogCardMobile = ({ data, account }) => {
	const [isOpen, setOpen] = useState(false);
	const {
		requestID,
		title,
		angelTokenPay,
		laboratoryTokenPay,
		contributions,
	} = data;
	const totalPending = contributions.filter((item) => item.status === false)
		.length;
	const totalConfirmed = contributions.filter((item) => item.status === true)
		.length;
	const allApproved = contributions.length === totalConfirmed;
	const getVariant = () => {
		if (allApproved) return 'confirmed';
		if (contributions.length !== totalConfirmed) return 'primary';
	};
	const getBBIT = useBiobit();

	return (
		<MobileCompactRequestCard variant={getVariant()}>
			<Row
				onClick={() => setOpen((value) => !value)}
				width='100%'
				alignItems='start'
			>
				<Col>
					<IdLabel>{requestID}</IdLabel>
				</Col>
				<Col flex={'1 1'}>
					<Row>
						<BodyText variant='small' fontWeight='semiBold'>
							{title.length < 70 ? title : title.substr(0, 70) + '...'}
						</BodyText>
					</Row>
					<Row mt={[2]} mb={[2]}>
						<ThemeIcon variant='small' src={biobitIcon} />
						<BodyText variant='small'>
							{getBBIT(angelTokenPay, laboratoryTokenPay)[0]}
						</BodyText>
						<BodyText variant='small'>{`~ $${
							getBBIT(angelTokenPay, laboratoryTokenPay)[1]
						}`}</BodyText>
					</Row>
					<Row>
						{allApproved ? (
							<BodyText
								variant='extraSmall'
								color='success'
							>{`all ${contributions.length} are confirmed. >>`}</BodyText>
						) : (
							<Col>
								<BodyText variant='extraSmall' color='bgBadge'>{`${
									totalPending + totalConfirmed
								} files: `}</BodyText>
								<BodyText
									variant='extraSmall'
									color='bgBadge'
									whiteSpace='nowrap'
								>{` ${totalConfirmed} approved, ${totalPending} pending >> `}</BodyText>
							</Col>
						)}
					</Row>
				</Col>
				<Col flex={'0 0 35px'} />
				{allApproved ? (
					<ThemeIcon variant='big' src={checkedGreen} />
				) : (
					<ThemeIcon variant='small' src={pendingIcon} />
				)}
			</Row>
			{isOpen ? (
				<MobileBody>
					<MobileTable>
						{contributions.map(
							(
								{
									originalIndex,
									timestamp,
									zarelaDay,
									angel,
									hub,
									rewardGainer,
									status,
								},
								rowIndex
							) => (
								<Row key={originalIndex}>
									<Col flexGrow={1}>
										<BodyText variant='small' color='textTimestamp'>{`${
											rowIndex + 1
										}. File #${originalIndex}`}</BodyText>
										<BodyText variant='extraSmall' color='textTimestamp' ml={3}>
											{timeSince(timestamp)}
										</BodyText>
										<BodyText
											variant='extraSmall'
											color='textTimestamp'
											ml={3}
										>{`Zarela Day: ${zarelaDay} th`}</BodyText>
										<Row ml='15px' type='role'>
											<BodyText variant='extraSmall' color='textTimestamp'>
												Role :{' '}
											</BodyText>
											{angel.toLowerCase() === account.toLowerCase() && (
												<ThemeIcon variant='small' src={angelIcon} />
											)}
											{hub.toLowerCase() === account.toLowerCase() && (
												<ThemeIcon variant='small' src={hubIcon} />
											)}
											<ThemeDivider variant='vertical' />
											<BodyText variant='extraSmall' color='textTimestamp'>
												Gainer :{' '}
											</BodyText>
											<ThemeIcon
												variant='small'
												src={rewardGainer === true ? angelIcon : hubIcon}
											/>
										</Row>
									</Col>
									<Col>
										{status ? (
											<ThemeIcon variant='small' src={checkedGreen} />
										) : (
											<ThemeIcon variant='small' src={pendingIcon} />
										)}
									</Col>
								</Row>
							)
						)}
					</MobileTable>
				</MobileBody>
			) : null}
		</MobileCompactRequestCard>
	);
};

export default LogCardMobile;
