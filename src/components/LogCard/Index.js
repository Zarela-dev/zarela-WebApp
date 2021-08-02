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

const CustomRequestNumber = styled(RequestNumber)`
	flex: 0 0 79px;
	height: 50px;
	border-radius: 10px 10px 0px 10px;
	padding: 10px 20px;
	margin-right: ${(props) => props.theme.spacing(2)};
	font-weight: 700;
	background: linear-gradient(246.29deg, #3a68de 12.69%, #3a68de 100%);
	font-size: 32px;
	line-height: 30px;
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
	flex-direction: row;
	${maxWidthWrapper};
	width: 100%;
	justify-content: space-between;
`;

const HeaderLayoutCustom = styled(HeaderLayout)`
	width: unset;
	flex-grow: 1;
`;

const CustomFooter = styled(Footer)`
	margin-top: ${(props) => props.theme.spacing(0)};
	padding-left: 0;
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
	font-size: 14px;
	font-weight: 600;
	line-heigh: 16.5px;
	margin-bottom: 5px;
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
`;

const HashContent = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const HashBody = styled.div`
	word-break: break-all;
	font-size: 12px;
	font-weight: 500;
	color: #3a68de;
	line-height: 16px;
`;

const HashTitle = styled(HashBody)`
	font-size: 14px;
	font-weight: 400;
	line-height: 20px;
	color: #121213;
	margin-right: 6px;
	align-items: center;
`;

const CustomContributorBadge = styled(ContributorBadge)`
	margin-right: 25px;
`;

const ContributorsIconMobile = styled(ContributorsIcon)`
	width: 18px;
	height: 18px;
`;
const ToeknIconMobile = styled(TokenIcon)`
	width: 20px;
	height: 20px;
`;

const BadgeLabelTimeMobile = styled(BadgeLabel)`
	font-size: 14px;
	line-height: 20px;
	font-weight: ${props => props.subHeader ? 400 : 700};
	color: ${(props) =>
		props.success
			? "rgba(27, 204, 141, 1)"
			: props.pending && "rgba(133, 133, 133, 1)"};
`;

const BadgeLabelContributors = styled(BadgeLabel)`
	font-size: 16px;
	line-height: 18px;
	font-weight: ${(props) => (props.highlight ? 700 : 400)};
	min-width: ${(props) => props.minWidth && "60px"};
	white-space: nowrap;
	color: ${(props) => (props.highlight ? "#3A68DE" : "")};
`;

const CopyIconWrapper = styled(Bookmark)`
	align-self: center;
`;
const ContentWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-grow: 1;
`;
const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const ItemInformation = styled.div`
	display: flex;
	justify-self: self-end;
`;
const BookmarkIconWrapper = styled(Bookmark)`
	align-self: center;
`;

const SubHeaderRow = styled.div`
		display: flex;
		justify-content: flex-start;
`;

const LogCard = ({
	bookmark,
	HashAddress,
	MyRequests,
	marketRequest,
	contributes,
	contributed,
	success,
	pending,
}) => {
	return (
		<HeaderContainer>
			<HeaderInner>
				<HeaderLayoutCustom>
					<CustomRequestNumber>25</CustomRequestNumber>

					<ContentWrapper>
						<TitleWrapper>
							<TitleContent>
								Reactions while playing brutal games among 13 - 19 years
								teanagers
							</TitleContent>
							{MyRequests && (
								<BodyContainer>
									<HashContent>
										<HashTitle>TXN Hash</HashTitle>
										<HashBody>OXKMMSISIDNVIOISDUNVDUISUIAISOASNNFDUI</HashBody>
									</HashContent>
								</BodyContainer>
							)}

							{marketRequest &&
								<SubHeaderRow>
										<CustomContributorBadge>
										<BadgeRow>
											<BadgeLabelTimeMobile subHeader>2020.08.02</BadgeLabelTimeMobile>
										</BadgeRow>
									</CustomContributorBadge>
									<CustomContributorBadge>
										<BadgeLabelTimeMobile subHeader>13:57</BadgeLabelTimeMobile>
									</CustomContributorBadge>
								</SubHeaderRow>
							}
						</TitleWrapper>

						<ItemInformation>
							{MyRequests && (
								<>
									<CustomContributorBadge>
										<BadgeRow>
											<BadgeLabelTimeMobile>2020.08.02</BadgeLabelTimeMobile>
										</BadgeRow>
									</CustomContributorBadge>
									<CustomContributorBadge>
										<BadgeLabelTimeMobile>13:57</BadgeLabelTimeMobile>
									</CustomContributorBadge>
									<CustomContributorBadge>
										<BadgeRow>
											<ContributorsIconMobile src={contributorIcon} />
											<BadgeLabelContributors>32</BadgeLabelContributors>
										</BadgeRow>
									</CustomContributorBadge>
									<CustomDivider />
									<CustomBadgeRow>
										<ToeknIconMobile src={biobitIcon} />
										<BadgeLabelContributors>20</BadgeLabelContributors>
										<BadgeLabelContributors
											minWidth
										>{`= $ 21`}</BadgeLabelContributors>
									</CustomBadgeRow>
								</>
							)}

							{marketRequest && (
								<>
									<CustomContributorBadge>
										<BadgeRow>
											<ContributorsIconMobile src={contributorIcon} />
											<BadgeLabelContributors highlight>
												32/5 left
											</BadgeLabelContributors>
										</BadgeRow>
									</CustomContributorBadge>

									<CustomDivider />
									<CustomBadgeRow>
										<ToeknIconMobile src={biobitIcon} />
										<BadgeLabelContributors>20</BadgeLabelContributors>
										<BadgeLabelContributors
											minWidth
										>{`= $ 21`}</BadgeLabelContributors>
									</CustomBadgeRow>
									<CustomDivider />
									<BookmarkIconWrapper src={bookmarkIcon} />
								</>
							)}
						</ItemInformation>
					</ContentWrapper>

					{/* {success && appState.isMobile && (
						<CustomContributorBadge>
							<BadgeRow>
								<ContributorsIconMobile src={checkedGreen} />
							</BadgeRow>
						</CustomContributorBadge>
					)} */}

					{/* {pending && appState.isMobile && (
						<CustomContributorBadge>
							<BadgeRow>
								<ContributorsIconMobile src={pendingIcon} />
							</BadgeRow>
						</CustomContributorBadge>
					)} */}
				</HeaderLayoutCustom>

				<CustomFooter>
					{/* {!appState.isMobile && (
						<>
							<CustomContributorBadge>
								<BadgeRow>
									<BadgeLabelTimeMobile>2020.08.02</BadgeLabelTimeMobile>
								</BadgeRow>
							</CustomContributorBadge>
							<CustomContributorBadge>
								<BadgeLabelTimeMobile>13:57</BadgeLabelTimeMobile>
							</CustomContributorBadge>
						</>
					)} */}
					{/* {contributed && appState.isMobile && (
						<CustomBadgeRowGrow>
							<ToeknIconMobile src={biobitIcon} />
							<BadgeLabelContributors>20</BadgeLabelContributors>
							<BadgeLabelContributors
								minWidth
							>{`= $ 21`}</BadgeLabelContributors>
						</CustomBadgeRowGrow>
					)} */}
					{contributes && (
						<>
							{bookmark && (
								<>
									<CustomDivider />
									<CopyIconWrapper src={bookmarkIcon} />
								</>
							)}
						</>
					)}
					{success && (
						<>
							<CustomDivider />
							<CustomContributorBadge>
								<BadgeRow>
									<ContributorsIconMobile src={checkedGreen} />
									<BadgeLabelTimeMobile success>Recieved</BadgeLabelTimeMobile>
								</BadgeRow>
							</CustomContributorBadge>
						</>
					)}
					{pending && (
						<>
							<CustomDivider />
							<CustomContributorBadge>
								<BadgeRow>
									<ContributorsIconMobile src={pendingIcon} />
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
