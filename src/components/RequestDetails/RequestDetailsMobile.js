import React, { useState } from 'react';
import styled from 'styled-components';
import UploadFileCard from '../UploadFileCard/UploadFileCard';
import {
	HeaderLayout,
	ProgressTrackerTrack,
	ProgressTrackerWrapper,
	ProgressTrackerProcess,
} from '../Elements/RequestCard/IndexMobile';
import maxWidthWrapper from '../Elements/MaxWidth';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import contributorIcon from '../../assets/icons/user-blue.svg';
import documentsIcon from '../../assets/icons/document-blue.svg';
import publicKeyIcon from '../../assets/icons/public-key.svg';
import { CopyableText, timeSince } from '../../utils';
import DownloadFileCardMobile from '../DownloadFileCard/DownloadFileCardMobile';
import MobileLayout from '../MobileLayout';
import useBiobit from '../../hooks/useBiobit';
import { Header, BodyText } from './../Elements/Typography';
import { ThemeDivider } from './../Elements/Divider';
import { IdLabel } from '../Elements/IdLabel';
import { ThemeTag } from '../Elements/Tag';
import { ThemeIcon } from '../Elements/Icon';
import { Row, Col } from '../Elements/Flex';

const HeaderContainer = styled.header`
	background: #f4f8fe;
	padding: ${(props) => props.theme.spacing(3)} ${(props) => props.theme.spacing(2)} 0;
	width: 100%;
`;

const HeaderInner = styled(HeaderLayout)`
	display: flex;
	flex-direction: column;
	${maxWidthWrapper};
`;

const FilesWrapper = styled.div`
	${maxWidthWrapper};
	display: flex;
	justify-content: space-between;
`;

const CustomProgressTrackerWrapper = styled(ProgressTrackerWrapper)`
	position: relative;
	top: 2px;
	margin-top: ${(props) => props.theme.spacing(1)};
	margin-bottom: ${(props) => props.theme.spacing(0)};
`;

const RequestDetailsMobile = ({ setError, zpaperDownloadLink, error, request }) => {
	const contributors = `${request.totalContributed}/${request.totalContributors}`;
	const [signalFile, setSignalFile] = useState(null);
	const getBBIT = useBiobit();

	return (
		<MobileLayout>
			<Col>
				<HeaderContainer>
					<HeaderInner>
						<Row width="100%" alignItems="flex-start">
							<Col flex={'0 0 70px'} mr={[3]}>
								{request.requestID && <IdLabel>{request.requestID}</IdLabel>}
							</Col>
							<Col>
								<Header variant="heading5">{request.title}</Header>
								<BodyText variant="timestamp" ml={0}>
									{timeSince(request.timestamp)}
								</BodyText>
							</Col>
						</Row>
						<Row justifyContent="space-between" mt={4}>
							<Row>
								<ThemeIcon variant="small" src={biobitIcon} />
								<BodyText variant="hint" fontWeight="medium">
									{getBBIT(request.angelTokenPay, request.laboratoryTokenPay)[0]} (
									{+request.angelTokenPay} Angel + {+request.laboratoryTokenPay} Hub)
								</BodyText>
								<BodyText variant="extraSmall" fontWeight="semiBold">{`~ $${
									getBBIT(request.angelTokenPay, request.laboratoryTokenPay)[1]
								}`}</BodyText>
							</Row>

							<Row>
								<Col>
									<Row>
										<ThemeIcon variant="small" src={documentsIcon} />
										<BodyText variant="small" fontWeight="semiBold" color="textToken">
											{contributors}
										</BodyText>
									</Row>
								</Col>
								<ThemeDivider variant="vertical" />
								<Col>
									<Row>
										<ThemeIcon variant="small" src={contributorIcon} />
										<BodyText variant="small" fontWeight="semiBold" color="textToken">
											{request.totalContributedCount}
										</BodyText>
									</Row>
								</Col>
							</Row>
						</Row>

						<CustomProgressTrackerWrapper>
							<ProgressTrackerTrack>
								<ProgressTrackerProcess
									progress={(+request.totalContributed / +request.totalContributors) * 100}
								/>
							</ProgressTrackerTrack>
						</CustomProgressTrackerWrapper>
					</HeaderInner>
				</HeaderContainer>
				<Col width="100%" p={[3]}>
					<UploadFileCard
						isMobile
						showSelected
						disableUpload
						buttonLabel="Contribute"
						label={'Already Have a File?'}
						name={'signal file'}
						value={signalFile}
						onChange={(e) => {
							setSignalFile(e.target.files[0]);
						}}
						helperText={'here you will select and upload your biosignals.'}
						error={error}
						setError={setError}
						request={request}
					/>
					<Row>
						{request.categories?.split(',').map((item) => {
							return <ThemeTag variant="display" item={item} />;
						})}
					</Row>
					<Header variant="heading5" mt={3} mb={2}>
						Description
					</Header>
					<BodyText variant="small" mb={5}>
						{request.description}
					</BodyText>
				</Col>

				<Row data-tour="request-details-one" p={3}>
					<ThemeIcon variant="bigger" src={publicKeyIcon} />
					<CopyableText textToCopy={request.requesterAddress}>
						<Col>
							<BodyText variant="extraSmall" fontWeight="semiBold">
								Requester public key
							</BodyText>
							<BodyText
								variant="extraSmall"
								textOverflow="ellipsis"
								maxWidth="100%"
								overflow="hidden"
								fontWeight="semiBold"
							>
								{request.requesterAddress}
							</BodyText>
						</Col>
					</CopyableText>
				</Row>

				<FilesWrapper>
					<DownloadFileCardMobile
						isLoading={!zpaperDownloadLink}
						fileName={'Download Zpaper'}
						buttonLabel={'Download'}
						label={'just label'}
						helperText={'This file contains Zpaper file and survey test files.'}
						fileLink={zpaperDownloadLink}
					/>
				</FilesWrapper>
			</Col>
		</MobileLayout>
	);
};

export default RequestDetailsMobile;
