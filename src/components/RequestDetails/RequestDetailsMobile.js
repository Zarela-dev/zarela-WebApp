import React, { useState } from 'react';
import styled from 'styled-components';
import UploadFileCardApp from '../UploadFileCard/UploadFileCardApp';
import {
  RequestNumber,
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
} from '../Elements/RequestCard/IndexApp';
import maxWidthWrapper from '../Elements/MaxWidth';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import contributorIcon from '../../assets/icons/user-blue.svg';
import documentsIcon from '../../assets/icons/document-blue.svg';
import bookmarkIcon from '../../assets/icons/bookmark-purple.svg';
import publicKeyIcon from '../../assets/icons/public-key.svg';
import { CopyableText } from '../../utils';
import DownloadFileCardApp from '../DownloadFileCard/DownloadFileCardApp';

const PageWrapper = styled.div`
`;

const HeaderContainer = styled.header`
	background: #F4F8FE;
	padding: ${props => props.theme.spacing(3)} ${props => props.theme.spacing(2)} ${props => props.theme.spacing(3)};
	width: 100%;
`;

const HeaderInner = styled(HeaderLayout)`
	display: flex;
	flex-direction: column;
	${maxWidthWrapper};
`;

const CustomFooter = styled(Footer)`
	margin-top: ${props => props.theme.spacing(3)};
	padding-left: 0;
	flex-wrap: nowrap;
`;

const CustomBadgeRow = styled(BadgeRow)`
	flex: 0;
	align-items: center;
`;

const DescriptionContainer = styled.div`
	position: relative;
	padding-top: ${props => props.theme.spacing(1)};
	${maxWidthWrapper};
`;

const DescriptionTitle = styled.h4`
	margin-bottom: ${props => props.theme.spacing(2)};
	font-size: 18px;
	font-weight: 600;
`;

const TitleContent = styled(Title)`
  padding: 0 18px;
  font-size: 14px;
  font-weight: 600;
`;

const Description = styled.p`
	font-size: 14px;
	line-height: 25px;
	text-align: justify;
	margin-bottom: ${props => props.theme.spacing(5)};
  padding: 0 18px;
`;

const PublicKeyBadge = styled.div`
	display: flex;
  justify-content: center;
	right: 0;
	top: 40px;
	max-width: 400px;
  padding: 0 20px;
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

const FilesWrapper = styled.div`
	${maxWidthWrapper};
	display: flex; 
	justify-content: space-between;
`;

const CustomDivider = styled(Divider)`
	height: 22px;
`;

const CustomProgressTrackerWrapper = styled(ProgressTrackerWrapper)`
	position: relative;
	top: 2px;
	margin-top: ${props => props.theme.spacing(1)};
	margin-bottom: ${props => props.theme.spacing(0)};
`;

const RequestDetailsMobile = React.forwardRef(({ setError, error, timestamp, request, submitSignal }, ref) => {
  const contributors = `${request.totalContributed}/${request.totalContributors}`;
  const [signalFile, setSignalFile] = useState(null);

  return (
    <PageWrapper>
      <HeaderContainer>
        <HeaderInner>
          <HeaderLayout>
            <RequestNumber>
              {request.requestID}
            </RequestNumber>
            <Title>
              {request.title}
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
                  {request.totalContributedCount}
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
                {request.tokenPay}
              </TokenValue>
              <ValueLabel>
                BBit
              </ValueLabel>
              <BiobitToDollarValue noMargin>
                {`~ $ ${request.tokenPay}`}
              </BiobitToDollarValue>
            </CustomBadgeRow>
          </CustomFooter>
          <CustomProgressTrackerWrapper>
            <ProgressTrackerTrack>
              <ProgressTrackerProcess progress={+request.totalContributed / +request.totalContributors * 100} />
            </ProgressTrackerTrack>
          </CustomProgressTrackerWrapper>
        </HeaderInner>
      </HeaderContainer>




      <DescriptionContainer>
        <UploadFileCardApp
          showSelected
          buttonLabel='Select Files'
          label={'Already have the file?'}
          ref={ref}
          name={'whitepaper'}
          value={signalFile}
          onChange={(e) => {
            setSignalFile(e.target.files[0]);
          }}
          error={error}
          setError={setError}
          onClick={submitSignal}
        />
        <TitleContent>
          Description
        </TitleContent>
        <Description>
          {request.description}
        </Description>
      </DescriptionContainer>
      <PublicKeyBadge>
        <PublicKeyIcon src={publicKeyIcon} />
        <CopyableText textToCopy={request.requesterAddress}>
          <PublicKeyTextContainer>
            <PublicKey variant='body'>
              Requester public key
            </PublicKey>
            <PublicKey variant='body2' weight='semiBold'>
              {request.requesterAddress}
            </PublicKey>
          </PublicKeyTextContainer>
        </CopyableText>
      </PublicKeyBadge>
      <FilesWrapper>
        <DownloadFileCardApp
          fileName={'Download Zpaper'}
          buttonLabel={'Download'}
          label={'just label'}
          helperText={'This file contains Zpaper file and survey test files.'}
          fileLink={process.env.REACT_APP_IPFS_LINK + request.whitePaper}
        />
      </FilesWrapper>
    </PageWrapper>
  );
});

export default RequestDetailsMobile;
