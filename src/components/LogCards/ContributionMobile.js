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

const LogCardMobile = ({ data, account, paymentDay }) => {
	const [isOpen, setOpen] = useState(false);
	const { requestID, title, angelTokenPay, laboratoryTokenPay, contributions } = data;
	const totalPending = contributions.filter((item) => item.status === false).length;
	const totalConfirmed = contributions.filter((item) => item.status === true).length;
	const allApproved = contributions.length === totalConfirmed;
	const getVariant = () => {
		if (allApproved) return 'confirmed';
		if (contributions.length !== totalConfirmed) return 'primary';
	};
	const getBBIT = useBiobit();

	return (
		<MobileCompactRequestCard variant={getVariant()}>
			<Row onClick={() => setOpen((value) => !value)} width="100%" alignItems="start">
				<Col mr={2}>
					<IdLabel>{requestID}</IdLabel>
				</Col>
				<Col flex={'1 1'}>
					<Row>
						<BodyText variant="small" fontWeight="semiBold">
							{title.length < 70 ? title : title.substr(0, 70) + '...'}
						</BodyText>
					</Row>
					<Row mt={[2]} mb={[2]}>
						<ThemeIcon variant="small" src={biobitIcon} />
						<BodyText variant="hint" fontWeight="medium">
							{getBBIT(angelTokenPay, laboratoryTokenPay)[0]}
						</BodyText>
						<BodyText variant="hint" fontWeight="medium">{`~ $${
							getBBIT(angelTokenPay, laboratoryTokenPay)[1]
						}`}</BodyText>
					</Row>
					<Row>
						{allApproved ? (
							<BodyText
								variant="hint"
								fontWeight="medium"
								color="success"
							>{`all ${contributions.length} are confirmed. >>`}</BodyText>
						) : (
							<Col>
								<BodyText variant="extraSmall" color="bgBadge">{`${totalPending + totalConfirmed} files: `}</BodyText>
								<BodyText
									variant="hint"
									fontWeight="medium"
									color="bgBadge"
									whiteSpace="nowrap"
								>{` ${totalConfirmed} approved, ${totalPending} pending >> `}</BodyText>
							</Col>
						)}
					</Row>
				</Col>
				<Col flex={'0 0 35px'} />
				{allApproved ? <ThemeIcon variant="big" src={checkedGreen} /> : <ThemeIcon variant="small" src={pendingIcon} />}
			</Row>
			{isOpen ? (
				<MobileBody>
					<MobileTable>
						{contributions.map(
							({ originalIndex, timestamp, zarelaDay, angel, hub, rewardGainer, status }, rowIndex) => (
								<Row key={originalIndex} pt={2}>
									<Col flexGrow={1}>
										<Row>
											<BodyText variant="small" fontWeight="bold" color="textTimestamp" mb={2}>{`${
												rowIndex + 1
											}. File #${originalIndex}`}</BodyText>
										</Row>
										<Row>
											<BodyText variant="extraSmall" color="textTimestamp">
												{timeSince(timestamp)}
											</BodyText>
										</Row>
										<Row my={2}>
											<Col flex={'0 0 60px'}>
												<BodyText variant="extraSmall" color="textTimestamp">
													Reward :{' '}
												</BodyText>
											</Col>
											<Col>
												{rewardGainer === true ? (
													<Row mb={1} type="role">
														<ThemeIcon mr={2} height="auto !important" variant="small" src={angelIcon} />
														<BodyText variant="extraSmall">{'Angel 50 BBIT'}</BodyText>
														<BodyText
															ml={2}
															variant="extraSmall"
															color={+paymentDay > zarelaDay ? 'success' : 'orange'}
														>
															{+paymentDay > zarelaDay ? 'Received' : 'Pending'}
														</BodyText>
													</Row>
												) : (
													<Row mb={1} type="role">
														<ThemeIcon mr={2} height="auto !important" variant="small" src={hubIcon} />
														<BodyText variant="extraSmall">{'Hub 50 BBIT'}</BodyText>
														<BodyText
															ml={2}
															variant="extraSmall"
															color={+paymentDay > zarelaDay ? 'success' : 'orange'}
														>
															{+paymentDay > zarelaDay ? 'Received' : 'Pending'}
														</BodyText>
													</Row>
												)}
											</Col>
										</Row>
										<Row my={2}>
											<Col flex={'0 0 60px'}>
												<BodyText variant="extraSmall" color="textTimestamp">
													Wage :{' '}
												</BodyText>
											</Col>
											<Col>
												{angel.toLowerCase() === account.toLowerCase() && (
													<Row mb={1}>
														<ThemeIcon mr={2} height="auto !important" variant="small" src={angelIcon} />
														<BodyText variant="extraSmall">{`Angel ${data.angelTokenPay} BBIT`}</BodyText>
														<BodyText ml={2} variant="extraSmall" color={status ? 'success' : 'orange'}>
															{status ? 'Received' : 'Pending'}
														</BodyText>
													</Row>
												)}
												{hub.toLowerCase() === account.toLowerCase() && (
													<Row>
														<ThemeIcon mr={2} height="auto !important" variant="small" src={hubIcon} />
														<BodyText variant="extraSmall">{`Hub ${data.laboratoryTokenPay} BBIT`}</BodyText>
														<BodyText ml={2} variant="extraSmall" color={status ? 'success' : 'orange'}>
															{status ? 'Received' : 'Pending'}
														</BodyText>
													</Row>
												)}
											</Col>
										</Row>
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
