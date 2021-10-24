import React, { useState } from 'react';
import styled from 'styled-components';
import DownloadFileCard from '../DownloadFileCard/DownloadFileCard';
import UploadFileCard from '../UploadFileCard/UploadFileCard';
import {
	HeaderLayout,
	ProgressTrackerTrack,
	ProgressTrackerWrapper,
	ProgressTrackerProcess,
} from './../Elements/RequestCard';
import maxWidthWrapper from './../Elements/MaxWidth';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import contributorIcon from '../../assets/icons/user-blue.svg';
import documentsIcon from '../../assets/icons/document-blue.svg';
import publicKeyIcon from '../../assets/icons/public-key.svg';
import { CopyableText, timeSince } from '../../utils';
import useBiobit from '../../hooks/useBiobit';
import { Header, BodyText } from './../Elements/Typography';
import { ThemeDivider } from './../Elements/Divider';
import { IdLabel } from '../Elements/IdLabel';
import { ThemeTag } from '../Elements/Tag';
import { ThemeIcon } from '../Elements/Icon';
import { Row, Col } from '../Elements/Flex';

const PageWrapper = styled.div``;

const HeaderContainer = styled.header`
	background: #f4f8fe;
	padding: ${(props) => props.theme.spacing(5)} 0 0;
	width: 100%;
`;

const HeaderInner = styled(HeaderLayout)`
	display: flex;
	flex-direction: column;
	${maxWidthWrapper};
	padding: 0 ${(props) => props.theme.spacing(2)};
`;

const DescriptionContainer = styled.div`
	position: relative;
	${maxWidthWrapper};
	padding: ${(props) => `${props.theme.spacing(4)} ${props.theme.spacing(2)}`};
`;

const PublicKeyBadge = styled.div`
	display: flex;
	position: absolute;
	right: 20px;
	top: 40px;
	max-width: 400px;
`;

const FilesWrapper = styled.div`
	${maxWidthWrapper};
	display: flex;
	justify-content: space-between;
	padding: ${({theme}) => theme.space[4]}px;
`;

const FileCardSpacer = styled.div`
	flex: 0 1 50px;
`;

const CustomProgressTrackerWrapper = styled(ProgressTrackerWrapper)`
	position: relative;
	top: 2px;
	margin-top: ${(props) => props.theme.spacing(1)};
	margin-bottom: ${(props) => props.theme.spacing(0)};
`;

const RequestDetails = ({ setError, zpaperDownloadLink, error, request }) => {
	const contributors = `${request.totalContributed}/${request.totalContributors}`;
	const [signalFile, setSignalFile] = useState(null);
	const getBBIT = useBiobit();

	return (
		<PageWrapper>
			<HeaderContainer>
				<HeaderInner>
					<Row width="100%" alignItems="flex-start">
						<Col flex={'0 0 70px'} mr={[3]}>
							{request.requestID && <IdLabel>{request.requestID}</IdLabel>}
						</Col>
						<Col flex={1}>
							<Row>
								<Header variant="heading4" fontWeight="bold !important">
									{request.title}
								</Header>
							</Row>
							<Row mb={[4]}>
								<BodyText variant="timestamp" ml={0}>
									{timeSince(request.timestamp)}
								</BodyText>
							</Row>
							<Row width="100%">
								<Col>
									<Row>
										<ThemeIcon variant="big" src={documentsIcon} />
										<BodyText variant="small" fontWeight="bold" color="textToken">
											{contributors}
										</BodyText>
									</Row>
								</Col>
								<ThemeDivider variant="vertical" height={'24px !important'} />
								<Col>
									<Row>
										<ThemeIcon variant="big" src={contributorIcon} />
										<BodyText variant="small" fontWeight="bold" color="textToken">
											{request.totalContributedCount}
										</BodyText>
									</Row>
								</Col>
								<Col flex={1}></Col>
								<Col>
									<Row>
										<ThemeIcon variant="big" src={biobitIcon} />
										<BodyText variant="small" fontWeight="bold" mr={2}>
											{getBBIT(request.angelTokenPay, request.laboratoryTokenPay)[0]} BBit
										</BodyText>
										<BodyText variant="extraSmall" fontWeight="semiBold">
											({+request.angelTokenPay} Angel + {+request.laboratoryTokenPay} Hub)
										</BodyText>
										<BodyText variant="small" color="textToken" fontWeight="bold">{`~ $${
											getBBIT(request.angelTokenPay, request.laboratoryTokenPay)[1]
										}`}</BodyText>
									</Row>
								</Col>
							</Row>
						</Col>
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
			<DescriptionContainer>
				<Row>
					{request.categories?.split(',').map((item) => {
						return <ThemeTag variant="display" item={item} />;
					})}
				</Row>

				<PublicKeyBadge data-tour="request-details-one">
					<ThemeIcon variant="bigger" alignSelf="center" src={publicKeyIcon} />
					<CopyableText textToCopy={request.requesterAddress}>
						<Col p="10px 0">
							<BodyText variant="small">Requester public key</BodyText>
							<BodyText variant="extraSmall" fontWeight="semiBold" mt={0.5}>
								{request.requesterAddress}
							</BodyText>
						</Col>
					</CopyableText>
				</PublicKeyBadge>

				<Header variant="heading6" mt={3} mb={2}>
					Description:
				</Header>
				<BodyText variant="big">{request.description}</BodyText>
			</DescriptionContainer>
			<FilesWrapper>
				<DownloadFileCard
					isLoading={!zpaperDownloadLink}
					fileName={'Download Zpaper'}
					buttonLabel={'Download'}
					label={'just label'}
					helperText={'This file contains Zpaper file and survey test files.'}
					fileLink={zpaperDownloadLink}
				/>
				<FileCardSpacer />
				<UploadFileCard
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
			</FilesWrapper>
		</PageWrapper>
	);
};

export default RequestDetails;
