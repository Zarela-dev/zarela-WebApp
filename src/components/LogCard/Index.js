import React from "react";
import styled from "styled-components";
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
} from "../Elements/RequestCard/IndexMobile";
import maxWidthWrapper from "../Elements/MaxWidth";
import biobitIcon from "../../assets/icons/biobit-black.svg";
import contributorIcon from "../../assets/icons/user-black.svg";
import documentsIcon from "../../assets/icons/document-black.svg";
import bookmarkIcon from "../../assets/icons/bookmark-purple.svg";
import checkedGreen from "../../assets/icons/check-green.svg";
import pending from "../../assets/icons/pending.svg";
import copyImage from "../../assets/icons/copy.svg";
import publicKeyIcon from "../../assets/icons/public-key.svg";

const PageWrapper = styled.div``;

const HeaderContainer = styled.header`
	background: #f4f8fe;
	padding: ${(props) => props.theme.spacing(1.4)}
		${(props) => props.theme.spacing(0.8)}
		${(props) => props.theme.spacing(1.4)};
	width: 100%;
`;

const HeaderInner = styled(HeaderLayout)`
	display: flex;
	flex-direction: column;
	${maxWidthWrapper};
`;

const CustomFooter = styled(Footer)`
	margin-top: ${(props) => props.theme.spacing(3)};
	padding-left: 50px;
	flex-wrap: nowrap;
`;

const CustomBadgeRow = styled(BadgeRow)`
	flex: 0;
	align-items: center;
`;

const DescriptionContainer = styled.div`
	position: relative;
	${maxWidthWrapper};
`;

const DescriptionTitle = styled.h4`
	margin-bottom: ${(props) => props.theme.spacing(2)};
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
	line-height: 17px;
	text-align: justify;
	margin-bottom: ${(props) => props.theme.spacing(5)};
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
	padding: ${(props) => props.theme.spacing(1)} 0;
`;

const PublicKey = styled(Typography)`
	font-weight: 500;
	font-size: 12px;
	line-height: 20px;
	word-break: break-word;

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
	align-self: center;
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
	margin-top: ${(props) => props.theme.spacing(1)};
	margin-bottom: ${(props) => props.theme.spacing(0)};
`;
const BodyContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding-left: 50px;
	margin-top: 10px;
`;

const HashContent = styled.div``;

const HashBody = styled.div`
	word-break: break-all;
	font-size: 12px;
	font-weight: 500;
	color: #3a68de;
	line-height: 15px;
`;

const HashTitle = styled(HashBody)`
	font-size: 10.5px;
	font-weight: 400;
`;

const CopyIconWrapper = styled(Bookmark)`
	align-self: center;
`;

const LogCard = ({ bookmark, HashAddress,contributes, success, pending }) => {
	return (
		<HeaderContainer>
			<HeaderInner>
				<HeaderLayout>
					<RequestNumber>25</RequestNumber>
					<Title>
						Reactions while playing brutal games among 13 - 19 years teanagers
					</Title>
					<Spacer />
					{bookmark && <Bookmark src={bookmarkIcon} />}
				</HeaderLayout>
				{HashAddress && (
					<BodyContainer>
						<HashContent>
							<HashTitle>TXN Hash</HashTitle>
							<HashBody>OXKMMSISIDNVIOISDUNVDUISUIAISOASNNFDUI</HashBody>
						</HashContent>
						<CopyIconWrapper src={copyImage} />
					</BodyContainer>
				)}

				<CustomFooter>
					<CustomContributeBadge>
						<BadgeRow>
							<BadgeLabel>2020.08.02 13:57</BadgeLabel>
						</BadgeRow>
					</CustomContributeBadge>
					<CustomDivider />
					{contributes && (
						<>
							<CustomContributeBadge>
								<BadgeRow>
									<ContributorsIcon src={contributorIcon} />
									<BadgeLabel>32</BadgeLabel>
								</BadgeRow>
							</CustomContributeBadge>
							<CustomDivider />
						</>
					)}
					<CustomBadgeRow>
						<TokenIcon src={biobitIcon} />
						<TokenValue>20</TokenValue>
						<BiobitToDollarValue>{`~ $ 21`}</BiobitToDollarValue>
					</CustomBadgeRow>
					<CustomDivider />
					{success && (
						<CustomContributeBadge>
							<BadgeRow>
								<ContributorsIcon src={checkedGreen} />
								<BadgeLabel>Recieved</BadgeLabel>
							</BadgeRow>
						</CustomContributeBadge>
					)}
					{pending && (
						<CustomContributeBadge>
							<BadgeRow>
								<ContributorsIcon src={checkedGreen} />
								<BadgeLabel>Recieved</BadgeLabel>
							</BadgeRow>
						</CustomContributeBadge>
					)}
				</CustomFooter>
			</HeaderInner>
		</HeaderContainer>
	);
};

export default LogCard;
