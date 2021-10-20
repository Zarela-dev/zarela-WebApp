import React, { useState } from 'react';
import styled from 'styled-components';
import DownloadFileCard from '../DownloadFileCard/DownloadFileCard';
import UploadFileCard from '../UploadFileCard/UploadFileCard';
import {
	RequestNumber,
	HeaderLayout,
	Footer,
	Spacer,
	TokenIcon,
	Typography,
	ContributorBadge,
	ContributorsIcon,
	ProgressTrackerTrack,
	ProgressTrackerWrapper,
	ProgressTrackerProcess,
	TokenValue,
	Divider,
	BadgeRow,
	Title,
	ValueLabel,
	BiobitToDollarValue,
	BadgeLabel,
} from './../Elements/RequestCard';
import { TagsWrapper, TagItem } from '../Elements/RequestCard';
import maxWidthWrapper from './../Elements/MaxWidth';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import contributorIcon from '../../assets/icons/user-blue.svg';
import documentsIcon from '../../assets/icons/document-blue.svg';
import publicKeyIcon from '../../assets/icons/public-key.svg';
import { CopyableText, timeSince } from '../../utils';
import useBiobit from '../../hooks/useBiobit';

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

const CustomFooter = styled(Footer)`
	margin-top: ${(props) => props.theme.spacing(3)};
	padding-left: ${(props) => props.theme.spacing(12)};
	flex-wrap: nowrap;
`;

const CustomBadgeRow = styled(BadgeRow)`
	flex: 1;
	align-items: center;
	justify-content: end;
	& > * {
		white-space: nowrap;
	}
`;

const DescriptionContainer = styled.div`
	position: relative;
	${maxWidthWrapper};
	padding: ${(props) => `${props.theme.spacing(4)} ${props.theme.spacing(2)}`};
`;

const DescriptionTitle = styled.h4`
	margin-top: ${(props) => props.theme.spacing(3)};
	margin-bottom: ${(props) => props.theme.spacing(2)};
	font-size: 18px;
	font-weight: 600;
`;

const Description = styled.p`
	font-size: 14px;
	line-height: 25px;
	text-align: justify;
	margin-bottom: ${(props) => props.theme.spacing(5)};
`;

const PublicKeyBadge = styled.div`
	display: flex;
	position: absolute;
	right: 20px;
	top: 40px;
	max-width: 400px;
`;

const PublicKeyTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${(props) => props.theme.spacing(1)} 0;
`;

const PublicKey = styled(Typography)`
	font-weight: 500;
	font-size: 12px;
	line-height: 20px;

	&:not(:last-child) {
		margin-bottom: ${(props) => props.theme.spacing(0)};
	}
`;

const PublicKeyIcon = styled.img`
	flex: 0 0 36px;
	width: 36px;
	margin-right: ${(props) => props.theme.spacing(1)};
`;

const CustomContributeBadge = styled(ContributorBadge)`
	flex: 0 0 auto;
`;

const FilesWrapper = styled.div`
	${maxWidthWrapper};
	display: flex;
	justify-content: space-between;
`;

const FileCardSpacer = styled.div`
	flex: 0 1 50px;
`;

const CustomDivider = styled(Divider)`
	height: 26px;
`;

const CustomProgressTrackerWrapper = styled(ProgressTrackerWrapper)`
	position: relative;
	top: 2px;
	margin-top: ${(props) => props.theme.spacing(1)};
	margin-bottom: ${(props) => props.theme.spacing(0)};
`;

const Timestamp = styled.p`
	font-weight: normal;
	font-size: 14px;
	line-height: 130%;
	color: #6c6c6c;
	margin-top: ${(props) => props.theme.spacing(1)};
`;

const RequestDetails = ({ setError, zpaperDownloadLink, error, request }) => {
	const contributors = `${request.totalContributed}/${request.totalContributors}`;
	const [signalFile, setSignalFile] = useState(null);
	const getBBIT = useBiobit();

	return (
		<PageWrapper>
			<HeaderContainer>
				<HeaderInner>
					<HeaderLayout>
						<RequestNumber>{request.requestID}</RequestNumber>
						<Title>
							<p>{request.title}</p>
							<Timestamp>{timeSince(request.timestamp)}</Timestamp>
						</Title>
						<Spacer />
					</HeaderLayout>
					<CustomFooter>
						<CustomContributeBadge>
							<BadgeRow>
								<ContributorsIcon src={documentsIcon} />
								<BadgeLabel>{contributors}</BadgeLabel>
							</BadgeRow>
						</CustomContributeBadge>
						<CustomDivider />
						<CustomContributeBadge>
							<BadgeRow>
								<ContributorsIcon src={contributorIcon} />
								<BadgeLabel>{request.totalContributedCount}</BadgeLabel>
							</BadgeRow>
						</CustomContributeBadge>
						<Spacer />
						<CustomBadgeRow>
							<TokenIcon src={biobitIcon} />
							<TokenValue>{getBBIT(request.angelTokenPay, request.laboratoryTokenPay)[0]} BBit</TokenValue>
							<ValueLabel>
								({request.angelTokenPay} Angel + {request.laboratoryTokenPay} Hub)
							</ValueLabel>
							<BiobitToDollarValue noMargin>{`~ $${
								getBBIT(request.angelTokenPay, request.laboratoryTokenPay)[1]
							}`}</BiobitToDollarValue>
						</CustomBadgeRow>
					</CustomFooter>
					<CustomProgressTrackerWrapper>
						<ProgressTrackerTrack>
							<ProgressTrackerProcess progress={(+request.totalContributed / +request.totalContributors) * 100} />
						</ProgressTrackerTrack>
					</CustomProgressTrackerWrapper>
				</HeaderInner>
			</HeaderContainer>
			<DescriptionContainer>
				<TagsWrapper>
					{request.categories?.split(',').map((item) => {
						return <TagItem key={item}>#{item}</TagItem>;
					})}
				</TagsWrapper>
				<PublicKeyBadge data-tour="request-details-one">
					<PublicKeyIcon src={publicKeyIcon} />
					<CopyableText textToCopy={request.requesterAddress}>
						<PublicKeyTextContainer>
							<PublicKey variant="body">Requester public key</PublicKey>
							<PublicKey variant="body2" weight="semiBold">
								{request.requesterAddress}
							</PublicKey>
						</PublicKeyTextContainer>
					</CopyableText>
				</PublicKeyBadge>
				<DescriptionTitle>Description:</DescriptionTitle>
				<Description>{request.description}</Description>
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
