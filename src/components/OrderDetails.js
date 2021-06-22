import React, { useState } from 'react';
import styled from 'styled-components';
import DownloadFileCard from './DownloadFileCard';
import UploadFileCard from './uploadFileCard';
import {
	OrderNumber,
	HeaderLayout,
	Footer,
	Spacer,
	TokenIcon,
	Bookmark,
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
} from './Elements/OrderCard';
import maxWidthWrapper from './Elements/MaxWidth';
import biobitIcon from '../assets/icons/biobit-black.svg';
import contributorIcon from '../assets/icons/user-blue.svg';
import documentsIcon from '../assets/icons/document-blue.svg';
import bookmarkIcon from '../assets/icons/bookmark-purple.svg';
import publicKeyIcon from '../assets/icons/public-key.svg';
import { CopyableText } from '../utils';

const PageWrapper = styled.div`
	
`;

const HeaderContainer = styled.header`
	background: #F4F8FE;
	padding: ${props => props.theme.spacing(5)} 0 0;
	width: 100%;
`;

const HeaderInner = styled(HeaderLayout)`
	display: flex;
	flex-direction: column;
	${maxWidthWrapper};
`;

const CustomFooter = styled(Footer)`
	margin-top: ${props => props.theme.spacing(3)};
	padding-left: ${props => props.theme.spacing(12)};
	flex-wrap: nowrap;
`;

const CustomBadgeRow = styled(BadgeRow)`
	flex: 0;
	align-items: center;
`;

const DescriptionContainer = styled.div`
	position: relative;
	padding-top: ${props => props.theme.spacing(6)};
	${maxWidthWrapper};
`;

const DescriptionTitle = styled.h4`
	margin-bottom: ${props => props.theme.spacing(2)};
	font-size: 18px;
	font-weight: 600;
`;

const Description = styled.p`
	font-size: 14px;
	line-height: 25px;
	text-align: justify;
	margin-bottom: ${props => props.theme.spacing(5)};
`;

const PublicKeyBadge = styled.div`
	display: flex;
	position: absolute;
	right: 0;
	top: 40px;
	max-width: 400px;
`;

const PublicKeyTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${props => props.theme.spacing(1)} 0;
`;

const PublicKey = styled(Typography)`
	font-weight: 500;
	font-size: 12px;
	line-height: 20px;
	
	&:not(:last-child) {
		margin-bottom: ${props => props.theme.spacing(0)};
	}
`;

const PublicKeyIcon = styled.img`
	flex: 0 0 36px;
	width: 36px;
	margin-right: ${props => props.theme.spacing(1)};
`;

const CustomContributeBadge = styled(ContributorBadge)`
	flex: 0 0 auto;
`;

const EqualSign = styled(BiobitToDollarValue)`
	margin: 0 5px;
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
	margin-top: ${props => props.theme.spacing(1)};
	margin-bottom: ${props => props.theme.spacing(0)};
`;

const OrderDetails = React.forwardRef(({ timestamp, order, submitSignal }, ref) => {
	const contributors = `${order.totalContributed}/${order.totalContributors}`;
	const [signalFile, setSignalFile] = useState(null);
	
	return (
		<PageWrapper>
			<HeaderContainer>
				<HeaderInner>
					<HeaderLayout>
						<OrderNumber>
							{order.orderId}
						</OrderNumber>
						<Title>
							{order.title}
						</Title>
						<Spacer />
						<Bookmark src={bookmarkIcon} />
					</HeaderLayout>
					<CustomFooter>
						<CustomContributeBadge>
							<BadgeRow>
								<ContributorsIcon src={documentsIcon} />
								<BadgeLabel>
									{contributors}
								</BadgeLabel>
							</BadgeRow>
						</CustomContributeBadge>
						<CustomDivider />
						<CustomContributeBadge>
							<BadgeRow>
								<ContributorsIcon src={contributorIcon} />
								<BadgeLabel>
									{order.totalContributedCount}
								</BadgeLabel>
							</BadgeRow>
						</CustomContributeBadge>
						<CustomDivider />
						<CustomContributeBadge>
							<BadgeRow>
								<BadgeLabel>
									{timestamp}
								</BadgeLabel>
							</BadgeRow>
						</CustomContributeBadge>
						<Spacer />
						<CustomBadgeRow>
							<TokenIcon src={biobitIcon} />
							<TokenValue>
								{order.tokenPay}
							</TokenValue>
							<ValueLabel>
								BioBit
							</ValueLabel>

							<EqualSign>
								=
							</EqualSign>
							<BiobitToDollarValue>
								{'$' + order.tokenPay}
							</BiobitToDollarValue>
							<ValueLabel colored>
								Dollar
							</ValueLabel>
						</CustomBadgeRow>
					</CustomFooter>
					<CustomProgressTrackerWrapper>
						<ProgressTrackerTrack>
							<ProgressTrackerProcess width={+order.totalContributed / +order.totalContributors * 100} />
						</ProgressTrackerTrack>
					</CustomProgressTrackerWrapper>
				</HeaderInner>
			</HeaderContainer>
			<DescriptionContainer>
				<PublicKeyBadge>
					<PublicKeyIcon src={publicKeyIcon} />
					<CopyableText textToCopy={order.requesterAddress}>
						<PublicKeyTextContainer>
							<PublicKey variant='body'>
								Requester public key
							</PublicKey>
							<PublicKey variant='body2' weight='semiBold'>
								{order.requesterAddress}
							</PublicKey>
						</PublicKeyTextContainer>
					</CopyableText>
				</PublicKeyBadge>
				<DescriptionTitle>
					Description:
				</DescriptionTitle>
				<Description>
					{order.description}
				</Description>
			</DescriptionContainer>
			<FilesWrapper>
				<DownloadFileCard
					fileName={'Download Zpaper'}
					buttonLabel={'Download'}
					label={'just label'}
					helperText={'This file contains Zpaper file and survey test files.'}
					fileLink={process.env.REACT_APP_IPFS_LINK + order.whitePaper}
				/>
				<FileCardSpacer />
				<UploadFileCard
					showSelected
					buttonLabel='Select Files'
					label={'upload your files here'}
					ref={ref}
					name={'whitepaper'}
					value={signalFile}
					onChange={(e) => {
						setSignalFile(e.target.files[0]);
					}}
					onClick={submitSignal}
				/>
			</FilesWrapper>
		</PageWrapper>
	);
});

export default OrderDetails;
