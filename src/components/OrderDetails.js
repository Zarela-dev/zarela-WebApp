import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import avatarImage from '../assets/icons/avatar.png';
import biobitIcon from '../assets/icons/biobit.svg';
import contributorIcon from '../assets/icons/contributor.png';
import bookmarkIcon from '../assets/icons/bookmark.svg';
import publicKeyIcon from '../assets/icons/public-key.svg';
import DownloadFileCard from './DownloadFileCard';
import UploadFileCard from './uploadFileCard';
import {
	Avatar,
	AvatarImage,
	HeaderLayout,
	ProgressLayout,
	TokenBadge,
	Spacer,
	TokenIcon,
	Bookmark,
	Typography,
	ContributorBadge,
	ContributorsIcon
} from './Elements/OrderCard';
import maxWidthWrapper from './Elements/MaxWidth';

const PageWrapper = styled.div`
	
`;

const HeaderContainer = styled.header`
	background: #F4F8FE;
	padding: ${props => props.theme.spacing(5)} 0;
	width: 100%;
`;

const HeaderInner = styled(HeaderLayout)`
	display: flex;
	flex-direction: column;
	${maxWidthWrapper};
`;

const DescriptionContainer = styled.div`
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
`;

const PublicKeyBadge = styled.div`
	display: flex;
	max-width: 400px;
	margin-bottom: ${props => props.theme.spacing(10)};
	margin-top: ${props => props.theme.spacing(5)};
`;

const PublicKeyTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${props => props.theme.spacing(1)} 0;
`;

const PublicKey = styled(Typography)`
	margin-top: ${props => props.theme.spacing(1)};
`;

const PublicKeyIcon = styled.img`
	flex: 0 0 63px;
	margin-right: ${props => props.theme.spacing(1)};
`;

const FilesWrapper = styled.div`
	${maxWidthWrapper};
	display: flex; 
	justify-content: space-between;
`;

const FileCardSpacer = styled.div`
	flex: 0 1 50px;
`;

const OrderDetails = React.forwardRef(({ order, submitSignal }, ref) => {
	const contributors = `${order.totalContributed}/${order.totalContributors}`;

	return (
		<PageWrapper>
			<HeaderContainer>
				<HeaderInner>
					<HeaderLayout>
						<Avatar>
							<AvatarImage src={avatarImage} />
						</Avatar>
						<Typography weight='bold' variant='title'>
							{order.title}
						</Typography>
						<Spacer />
						<Typography nowrap variant='caption'>
							6 hours ago
						</Typography>
						<Bookmark src={bookmarkIcon} />
					</HeaderLayout>
					<ProgressLayout>
						<TokenBadge>
							<TokenIcon src={biobitIcon} />
							<Typography weight='bold' color='secondary' variant='badge'>
								{order.tokenPay}
							</Typography>
							<Typography weight='bold' color='secondary' variant='badge'>
								BioBit
							</Typography>
						</TokenBadge>
						<Spacer />
						<ContributorBadge>
							<ContributorsIcon src={contributorIcon} />
							<Typography weight='bold' color='secondary' variant='badge'>
								{contributors}
							</Typography>
						</ContributorBadge>
					</ProgressLayout>
				</HeaderInner>
			</HeaderContainer>
			<DescriptionContainer>
				<DescriptionTitle>
					Description:
				</DescriptionTitle>
				<Description>
					{order.description}
				</Description>
				<PublicKeyBadge>
					<PublicKeyIcon src={publicKeyIcon} />
					<PublicKeyTextContainer>
						<Typography variant='body'>
							Requester public key
						</Typography>
						<PublicKey variant='body2' weight='semiBold'>
							{order.requesterAddress}
						</PublicKey>
					</PublicKeyTextContainer>
				</PublicKeyBadge>
			</DescriptionContainer>
			<FilesWrapper>
				<DownloadFileCard
					fileName={'Download Whitepaper'}
					buttonLabel={'Download'}
					label={'just label'}
					helperText={'This .Zip file contains Whitepaper file and survey test files.'}
					fileLink={'http://94.237.41.18:8080/ipfs/' + order.whitePaper}
				/>
				<FileCardSpacer />
				<UploadFileCard
					showSelected
					buttonLabel='Upload'
					helperText={'This .Zip file contains Whitepaper file and survey test files.'}
					label={'Upload your white paper here'}
					ref={ref}
					name={'whitepaper'}
					value={null}
					onChange={(e) => { }}
					onClick={submitSignal}
				/>
			</FilesWrapper>
		</PageWrapper>
	);
});

export default OrderDetails;
