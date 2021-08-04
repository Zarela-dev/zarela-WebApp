import React, { useContext } from "react";
import styled from "styled-components";
import {
	RequestNumber,
	HeaderLayout,
	Footer,
	TokenIcon,
	Bookmark,
	ContributorBadge,
	ContributorsIcon,
	BadgeRow,
	Title,
	BadgeLabel,
	Timestamp,
} from "../Elements/RequestCard/IndexMobile";
import maxWidthWrapper from "../Elements/MaxWidth";
import biobitIcon from "../../assets/icons/biobit-black.svg";
import contributorIcon from "../../assets/icons/user-black.svg";
import bookmarkIcon from "../../assets/icons/bookmark-purple.svg";
import checkedGreen from "../../assets/icons/check-green.svg";
import pendingIcon from "../../assets/icons/pending.svg";
import copyImage from "../../assets/icons/copy.svg";
import { mainContext } from "../../state";

const CustomRequestNumber = styled(RequestNumber)`
	height: "26px";
	border-radius: "5px 5px 0px 5px";
	padding: "7px 11px";
	margin-right: ${(props) => props.theme.spacing(1)};
	font-weight: bold;
	background: linear-gradient(246.29deg, #3a68de 12.69%, #3a68de 100%);
	font-size: "15px";
	line-height: "11.4px";
	color: #ffffff;
	text-align: center;
`;

const HeaderContainer = styled.header`
	background: #f4f8fe;
	border-radius: 8px;
	padding: 19px 13px;
	width: 100%;
	margin-bottom: 10px;
`;

const HeaderInner = styled(HeaderLayout)`
	display: flex;
	flex-direction: column;
	${maxWidthWrapper};
	width: 100%;
	justify-content: space-between;
`;

const HeaderLayoutCustom = styled(HeaderLayout)`
	width: unset;
	flex-grow: 1;
`;

const CustomFooter = styled(Footer)`
	margin-top: ${(props) => props.theme.spacing(1)};
	padding-left: "50px";
	flex-wrap: nowrap;
	flex-grow: 1;
`;

const CustomBadgeRow = styled(BadgeRow)`
	flex: 0;
	align-items: center;
`;

const CustomBadgeRowGrow = styled(CustomBadgeRow)`
	flex-grow: 1;
`;

const TitleContent = styled(Title)`
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	font-weight: 600;
	line-heigh: 16px;
`;

const BodyContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: 5px;
`;

const HashContent = styled.div`
	display: flex;
	flex-direction: column;
`;

const HashBody = styled.div`
	word-break: break-all;
	font-size: 12px;
	font-weight: 500;
	color: #3a68de;
	line-height: 16px;
`;

const HashTitle = styled(HashBody)`
	font-size: 10.5px;
	font-weight: 400;
	line-height: 16px;
	align-items: center;
`;

const CustomContributorBadge = styled(ContributorBadge)`
	margin-right: ${(props) => (props.noMarginRight ? 0 : "8px")};
	align-self: self-start;
`;

const ContributorsIconMobile = styled(ContributorsIcon)`
	width: 18.3px;
	height: 18.3px;
	margin-right: 0;
`;
const ToeknIconMobile = styled(TokenIcon)`
	width: 16px;
	height: 16px;
`;

const BadgeLabelTimeMobile = styled(BadgeLabel)`
	font-size: 10.5px;
	line-height: 20px;
	font-weight: 700;
	color: ${(props) =>
		props.success
			? "rgba(27, 204, 141, 1)"
			: props.pending && "rgba(133, 133, 133, 1)"};
`;

const BadgeLabelContributors = styled(BadgeLabel)`
	font-size: 12px;
	line-height: 10.5px;
	font-weight: ${(props) => (props.bold ? "700" : "400")};
	min-width: ${(props) => props.minWidth && "60px"};
	margin-right: ${(props) => (props.bold ? "5px" : "0")};
	white-space: nowrap;
`;

const CopyIconWrapper = styled(Bookmark)`
	align-self: center;
`;
const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const CustomTimeStamp = styled(Timestamp)`
	margin: 1px 0 0 0;
	font-size: 12px;
`;
const FooterWrapper = styled.div`
	display: flex;
`;
const FooterSpacer = styled.div`
	width: 45px;
`;
const BookmarkIconWrapper = styled(Bookmark)`
	align-self: flex-start;
`;

const LogCardMobile = ({
	bookmark,
	MyRequests,
	marketRequest,
	success,
	pending,
}) => {
	const { appState } = useContext(mainContext);

	return (
		<HeaderContainer>
			<HeaderInner>
				<HeaderLayoutCustom>
					<CustomRequestNumber>25</CustomRequestNumber>
					<ContentWrapper>
						<TitleContent>
							Reactions while playing brutal games among 13 - 19 years teanagers
						</TitleContent>
						<CustomTimeStamp>time stamp</CustomTimeStamp>
						{MyRequests && (
							<BodyContainer>
								<HashContent>
									<HashTitle>TXN Hash</HashTitle>
									<HashBody>OXKMMSISIDNVIOISDUNVDUISUIAISOASNNFDUI</HashBody>
								</HashContent>
								<CopyIconWrapper src={copyImage} />
							</BodyContainer>
						)}
					</ContentWrapper>
					{marketRequest && <BookmarkIconWrapper src={bookmarkIcon} />}
					{success && (
						<CustomContributorBadge noMarginRight>
							<BadgeRow>
								<ContributorsIconMobile src={checkedGreen} />
							</BadgeRow>
						</CustomContributorBadge>
					)}
					{pending && (
						<CustomContributorBadge noMarginRight>
							<BadgeRow>
								<ContributorsIconMobile src={pendingIcon} />
							</BadgeRow>
						</CustomContributorBadge>
					)}
				</HeaderLayoutCustom>
				<FooterWrapper>
					<FooterSpacer />
					<CustomFooter>
						<CustomBadgeRowGrow>
							<ToeknIconMobile src={biobitIcon} />
							<BadgeLabelContributors bold>20</BadgeLabelContributors>
							<BadgeLabelContributors
								minWidth
							>{`~ $ 21`}</BadgeLabelContributors>
						</CustomBadgeRowGrow>
						{MyRequests || marketRequest ? (
							<CustomContributorBadge noMarginRight>
								<BadgeRow>
									<ContributorsIconMobile src={contributorIcon} />
									<BadgeLabelContributors>32</BadgeLabelContributors>
								</BadgeRow>
							</CustomContributorBadge>
						) : null}
					</CustomFooter>
				</FooterWrapper>
			</HeaderInner>
		</HeaderContainer>
	);
};

export default LogCardMobile;
