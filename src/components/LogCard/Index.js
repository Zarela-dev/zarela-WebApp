import React, { useContext } from "react";
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
	ProgressTrackerWrapper,
	TokenValue,
	Divider,
	BadgeRow,
	Title,
	BiobitToDollarValue,
	BadgeLabel,
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
	flex: ${(props) => (props.isMobile ? "" : "0 0 100px")};
	height: ${(props) => (props.isMobile ? "26px;" : "50px")};
	border-radius: ${(props) =>
		props.isMobile ? "5px 5px 0px 5px" : "10px 10px 0px 10px"};
	padding: ${(props) => (props.isMobile ? "7px 11px" : "10px 20px")};
	margin-right: ${(props) =>
		props.isMobile ? props.theme.spacing(1) : props.theme.spacing(2)};
	font-weight: bold;
	background: linear-gradient(246.29deg, #3a68de 12.69%, #3a68de 100%);
	font-size: ${(props) => (props.isMobile ? "15px" : "32px")};
	line-height: ${(props) => (props.isMobile ? "11.4px" : "30px")};
	color: #ffffff;
	text-align: center;
`;

const HeaderContainer = styled.header`
	background: #f4f8fe;
	border-radius: 8px;
	padding: 13px 21px;
	width: 100%;
	margin-bottom: 10px;
`;

const HeaderInner = styled(HeaderLayout)`
	display: flex;
	flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
	${maxWidthWrapper};
	width: 100%;
	justify-content: space-between;
`;

const HeaderLayoutCustom = styled(HeaderLayout)`
	width: unset;
	flex-grow: 1;
`;

const CustomFooter = styled(Footer)`
	margin-top: ${(props) =>
		props.isMobile ? props.theme.spacing(3) : props.theme.spacing(0)};
	padding-left: ${(props) => (props.isMobile ? "50px" : "0")};
	flex-wrap: nowrap;
`;

const CustomBadgeRow = styled(BadgeRow)`
	flex: 0;
	align-items: center;
`;

const CustomBadgeRowGrow = styled(CustomBadgeRow)`
	flex-grow: 1;
`;

const TitleContent = styled(Title)`
	font-size: ${(props) => (props.isMobile ? "12px" : "14px")};
	font-weight: ${(props) => (props.isMobile ? "400" : "600")};
	line-height: ${(props) => (props.isMobile ? "16px" : "20px")};
	font-weight: 600;
	line-heigh: 16px;
`;

const CustomDivider = styled(Divider)`
	height: 48px;
	background-color: rgba(60, 135, 170, 0.6);
	margin: 0 20px;
`;

const BodyContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: ${(props) => (props.isMobile ? "10px" : "8px")};
`;

const HashContent = styled.div`
	display: flex;
	flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
`;

const HashBody = styled.div`
	word-break: break-all;
	font-size: 12px;
	font-weight: 500;
	color: #3a68de;
	line-height: 16px;
`;

const HashTitle = styled(HashBody)`
	font-size: ${(props) => (props.isMobile ? "10.5px" : "14px")};
	font-weight: 400;
	line-height: ${(props) => (props.isMobile ? "16px" : "20px")};
	color: ${(props) => (props.isMobile ? "" : "#000")};
	margin-right: ${(props) => (props.isMobile ? "" : "6px")};
	align-items: center;
`;

const CustomContributorBadge = styled(ContributorBadge)`
	margin-right: ${(props) => (props.isMobile ? "8px" : "25px")};
`;

const ContributorsIconMobile = styled(ContributorsIcon)`
	width: ${(props) => (props.isMobile ? "16px" : "18px")};
	height: ${(props) => (props.isMobile ? "16px" : "18px")};
`;
const ToeknIconMobile = styled(TokenIcon)`
	width: 20px;
	height: 20px;
`;

const BadgeLabelTimeMobile = styled(BadgeLabel)`
	font-size: ${(props) => (props.isMobile ? "10.8px" : "14px")};
	line-height: 20px;
	font-weight: ${(props) => (props.success ? "700" : props.pending && "700")};
	color: ${(props) =>
		props.success
			? "rgba(27, 204, 141, 1)"
			: props.pending && "rgba(133, 133, 133, 1)"};
`;

const BadgeLabelContributors = styled(BadgeLabel)`
	font-size: ${(props) => (props.isMobile ? "10.8px" : "16px")};
	line-height: ${(props) => (props.isMobile ? "14px" : "18px")};
	font-weight: 400;
	min-width: ${(props) => props.minWidth && "60px"};
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

const LogCard = ({
	bookmark,
	HashAddress,
	contributes,
	contributed,
	success,
	pending,
}) => {
	const { appState } = useContext(mainContext);

	return (
		<HeaderContainer>
			<HeaderInner isMobile={appState.isMobile}>
				<HeaderLayoutCustom>
					<CustomRequestNumber isMobile={appState.isMobile}>
						25
					</CustomRequestNumber>
					<ContentWrapper>
						<TitleContent isMobile={appState.isMobile}>
							Reactions while playing brutal games among 13 - 19 years teanagers
						</TitleContent>
						{HashAddress && (
							<BodyContainer isMobile={appState.isMobile}>
								<HashContent isMobile={appState.isMobile}>
									<HashTitle isMobile={appState.isMobile}>TXN Hash</HashTitle>
									<HashBody>OXKMMSISIDNVIOISDUNVDUISUIAISOASNNFDUI</HashBody>
								</HashContent>
								{appState.isMobile ? <CopyIconWrapper src={copyImage} /> : null}
							</BodyContainer>
						)}
					</ContentWrapper>
					{success && appState.isMobile && (
						<CustomContributorBadge isMobile={appState.isMobile}>
							<BadgeRow>
								<ContributorsIconMobile
									isMobile={appState.isMobile}
									src={checkedGreen}
								/>
							</BadgeRow>
						</CustomContributorBadge>
					)}

					{pending && appState.isMobile && (
						<CustomContributorBadge isMobile={appState.isMobile}>
							<BadgeRow>
								<ContributorsIconMobile
									isMobile={appState.isMobile}
									src={pendingIcon}
								/>
							</BadgeRow>
						</CustomContributorBadge>
					)}
				</HeaderLayoutCustom>

				<CustomFooter isMobile={appState.isMobile}>
					{!appState.isMobile && (
						<>
							<CustomContributorBadge isMobile={appState.isMobile}>
								<BadgeRow>
									<BadgeLabelTimeMobile isMobile={appState.isMobile}>
										2020.08.02
									</BadgeLabelTimeMobile>
								</BadgeRow>
							</CustomContributorBadge>
							<CustomContributorBadge isMobile={appState.isMobile}>
								<BadgeLabelTimeMobile isMobile={appState.isMobile}>
									13:57
								</BadgeLabelTimeMobile>
							</CustomContributorBadge>
						</>
					)}
					{contributed && appState.isMobile && (
						<CustomBadgeRowGrow>
							<ToeknIconMobile src={biobitIcon} />
							<BadgeLabelContributors isMobile={appState.isMobile}>
								20
							</BadgeLabelContributors>
							<BadgeLabelContributors
								isMobile={appState.isMobile}
								minWidth
							>{`= $ 21`}</BadgeLabelContributors>
						</CustomBadgeRowGrow>
					)}
					{contributes &&
						(appState.isMobile ? (
							<>
								<CustomBadgeRowGrow>
									<ToeknIconMobile src={biobitIcon} />
									<BadgeLabelContributors isMobile={appState.isMobile}>
										20
									</BadgeLabelContributors>
									<BadgeLabelContributors
										isMobile={appState.isMobile}
										minWidth
									>{`= $ 21`}</BadgeLabelContributors>
								</CustomBadgeRowGrow>
								<CustomContributorBadge isMobile={appState.isMobile}>
									<BadgeRow>
										<ContributorsIconMobile
											isMobile={appState.isMobile}
											src={contributorIcon}
										/>
										<BadgeLabelContributors isMobile={appState.isMobile}>
											32
										</BadgeLabelContributors>
									</BadgeRow>
								</CustomContributorBadge>
							</>
						) : (
							<>
								<CustomContributorBadge isMobile={appState.isMobile}>
									<BadgeRow>
										<ContributorsIconMobile
											isMobile={appState.isMobile}
											src={contributorIcon}
										/>
										<BadgeLabelContributors isMobile={appState.isMobile}>
											32
										</BadgeLabelContributors>
									</BadgeRow>
								</CustomContributorBadge>
								<CustomDivider />
								<CustomBadgeRow>
									<ToeknIconMobile src={biobitIcon} />
									<BadgeLabelContributors isMobile={appState.isMobile}>
										20
									</BadgeLabelContributors>
									<BadgeLabelContributors
										isMobile={appState.isMobile}
										minWidth
									>{`= $ 21`}</BadgeLabelContributors>
								</CustomBadgeRow>
								{bookmark && (
									<>
										<CustomDivider />
										<CopyIconWrapper src={bookmarkIcon} />
									</>
								)}
							</>
						))}
					{success && !appState.isMobile && (
						<>
							<CustomDivider />
							<CustomContributorBadge isMobile={appState.isMobile}>
								<BadgeRow>
									<ContributorsIconMobile
										isMobile={appState.isMobile}
										src={checkedGreen}
									/>
									<BadgeLabelTimeMobile success>Recieved</BadgeLabelTimeMobile>
								</BadgeRow>
							</CustomContributorBadge>
						</>
					)}
					{pending && !appState.isMobile && (
						<>
							<CustomDivider />
							<CustomContributorBadge isMobile={appState.isMobile}>
								<BadgeRow>
									<ContributorsIconMobile
										isMobile={appState.isMobile}
										src={pendingIcon}
									/>
									<BadgeLabelTimeMobile pending>Pending</BadgeLabelTimeMobile>
								</BadgeRow>
							</CustomContributorBadge>
						</>
					)}
				</CustomFooter>
			</HeaderInner>
		</HeaderContainer>
	);
};

export default LogCard;
