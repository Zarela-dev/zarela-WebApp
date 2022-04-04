import React, { useState, useContext, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { SmallCheckbox } from './Elements/Checkbox';
import downloadIcon from '../assets/icons/download.svg';
import { pendingFilesContext } from '../state/pendingFilesProvider';
import { Spacer } from './Elements/Spacer';
import { Scrollbar } from './Elements/Scrollbar';
import { timeSince } from '../utils';
import hubPublicKeyIcon from '../assets/icons/hub-public-key.svg';
import confirmIcon from '../assets/icons/confirmed.svg';
import caretDownIcon from '../assets/icons/caret-down.svg';
import caretUpIcon from '../assets/icons/caret-up.svg';
import pendingFileSpinner from '../assets/loader/pending-file-spinner.svg';
import WalletAddress from './WalletAddress';
import { localStorageContext } from '../state/localStorageProvider/LocalStoragePriveder';
import { Header, BodyText } from './../components/Elements/Typography';
import { ThemeDivider } from './../components/Elements/Divider';
import { IdLabel } from './../components/Elements/IdLabel';
import { ThemeIcon } from './../components/Elements/Icon';
import { Row, Col } from './../components/Elements/Flex';
import { ApproveBadge } from './../components/Elements/ApproveBadge';
import { ThemeButton } from './../components/Elements/Button';

const Table = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: ${(props) => props.theme.spacing(3)};
`;

const PendingFileIcon = styled.img`
	width: 22px;
	margin-right: ${(props) => (props.noMargin ? 0 : props.theme.spacing(1.5))};
`;

const CellWrapper = styled.div`
	flex: ${(props) => props.flex || 1};
	padding: 5px;
	background: white;

	&:first-child {
		border-radius: 8px 0 0 8px;
	}
	&:last-child {
		border-radius: 0 8px 8px 0;
	}
`;

const CellStyles = css`
	display: flex;
	align-items: center;
	min-height: 48px;
	padding: ${(props) => props.theme.spacing(0.6)} ${(props) => props.theme.spacing(1)};
	font-size: 12px;
	height: 40px;
	width: 100%;
	font-weight: normal;
	cursor: ${(props) => (props.pointer ? 'pointer' : 'normal')};

	${CellWrapper}:not(:last-child) & {
		border-right: 1px solid #3c87aa;
	}
`;

const Cell = styled.div`
	${CellStyles};
`;

const HubAddress = styled(WalletAddress)`
	${CellStyles};
`;

const CustomCheckbox = styled(SmallCheckbox)`
	margin: 0;
`;

const FilesListWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	padding: ${(props) => props.theme.spacing(1)};
	height: 100%;
`;

const CollapseIcon = styled.img`
	position: absolute;
	right: 16px;
	top: 10px;
	width: 24px;
`;

const CollapsedFilesListWrapper = styled(FilesListWrapper)`
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	margin: 0;
`;

const CollapsedLabel = styled.p`
	font-size: 14px;
	line-height: 20px;
`;

const FilesList = styled.div`
	flex: 1;
	border-left: 1px solid #3c87aa;
	margin-left: -21px;
	padding-left: 20px;
	max-height: 238px;
	min-height: 27px;
	overflow: auto;

	${Scrollbar};
`;

const FileItemCol = styled.div`
	flex: 1;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	font-size: 12px;
	line-height: 20px;
	color: ${(props) => props.theme.colors.textPrimary};

	&:nth-child(1) {
		flex: 1 0 113px;
	}
	&:nth-child(2) {
		position: relative;
		flex: 0 0 auto;
		margin-right: ${(props) => props.theme.spacing(2)};
		&::after {
			content: '';
			display: block;
			position: relative;
			top: 0;
			height: 40px;
			width: 1px;
			border-right: 1px solid rgba(60, 135, 170, 0.2);
		}
	}
`;

const FileItemRow = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: nowrap;
	align-items: center;
	height: 40px;
`;

const ConfirmedIcon = styled.img`
	width: 24px;
	margin-right: ${(props) => (props.noMargin ? 0 : props.theme.spacing(1.5))};
`;

const FileCheckbox = styled(SmallCheckbox)`
	width: 24px;
	margin-right: ${(props) => props.theme.spacing(1.5)};
`;

const FilesTableRow = styled.section`
	display: flex;
	flex-direction: row;
`;

const FilesTableHeader = styled(FilesTableRow)`
	border-bottom: 1px solid rgba(60, 135, 170, 0.2);
	margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const FilesTableHeaderCol = styled.div`
	display: flex;
	align-items: center;
	flex: ${(props) => props.flex || 1};
`;

const FilesTableHeaderTitle = styled.div`
	font-size: 14px;
	line-height: 20px;
	margin-bottom: ${(props) => props.theme.spacing(1)};
	color: ${(props) => props.theme.colors.textPrimary};
`;

const FileName = styled.div`
	max-width: 248px;
	word-break: break-word;
	margin-right: ${(props) => props.theme.spacing(2)};
`;

const DownloadButtonImage = styled.img`
	width: 20px;
`;

const DownloadButton = styled.button`
	border: none;
	background: white;
	margin-right: ${(props) => props.theme.spacing(1.5)};
`;

const Timestamp = styled.div`
	white-space: nowrap;
`;

const AngelAddress = styled(WalletAddress)`
	font-size: 12px;
	padding: ${(props) => props.theme.spacing(1)};
	padding-left: 0;
	border-bottom: 1px solid rgba(60, 135, 170, 0.2);

	&:first-child {
		padding-top: 0;
	}
	&:not(:first-child) {
		border-top: 1px solid rgba(60, 135, 170, 0.2);
	}
`;

const RequestFilesTable = ({
	data,
	selected,
	onChange,
	onBulkChange,
	isBulkChecked,
	isBulkApproved,
	isAllChecked,
	isAllApproved,
	changeAll,
	fulfilled,
	signalDownloadHandler,
	requestID,
}) => {
	const { localState } = useContext(localStorageContext);
	const PendingFiles = useContext(pendingFilesContext);
	const { pendingFiles } = PendingFiles;
	const { blockList, hideList } = localState;
	const [isExpanded, setExpanded] = useState(null);

	const getFileStatus = useCallback(
		(originalIndex, originalStatus) => {
			if (originalStatus === true) return 'approved';
			let status = 'available';

			for (let i = 0; i < Object.values(pendingFiles.pending).length; i++) {
				const item = Object.values(pendingFiles.pending)[i];
				if (item.requestID === requestID && item.originalIndexes.includes(originalIndex)) {
					status = 'pending';
					break;
				}
			}
			return status;
		},
		[pendingFiles?.pending]
	);

	// filter data with hidden and blocked addresses
	const renderableData = { ...data };

	// filter blocked
	Object.keys(data).forEach((address) => {
		if (blockList.find((item) => item.toLowerCase() === address.toLowerCase())) delete renderableData[address];
	});

	//filter hidden
	Object.keys(data).forEach((address) => {
		if (hideList[address.toLowerCase()]?.includes(requestID.toString())) delete renderableData[address];
	});

	if (Object.keys(renderableData).length === 0)
		return (
			<Row mt={4} bg="white">
				<BodyText variant="small" p={4}>
					You do not have any visible requests here.
				</BodyText>
			</Row>
		);
	return (
		<Table>
			<Row width="100%">
				<CellWrapper flex={'0 0 5%'}>
					<Cell data-tour="inbox-three">
						{isAllApproved() === 'approved' ? (
							<ThemeIcon variant="big" src={confirmIcon} />
						) : isAllApproved() === 'pending' ? (
							<ThemeIcon variant="big" src={pendingFileSpinner} />
						) : (
							<CustomCheckbox
								disabled={fulfilled}
								checked={isAllChecked()}
								onChange={(e) => {
									if (e.target.checked === true) {
										changeAll('check');
									} else {
										changeAll('uncheck');
									}
								}}
							/>
						)}
					</Cell>
				</CellWrapper>
				<CellWrapper flex={'0 0 45%'}>
					<Cell>
						<BodyText variant="extraSmall">Hub Address</BodyText>
					</Cell>
				</CellWrapper>
				<CellWrapper>
					<Cell>
						<BodyText variant="extraSmall">Uploaded Files & Angel Address</BodyText>
					</Cell>
				</CellWrapper>
			</Row>
			{Object.keys(renderableData).map((hubAddress, index) => {
				const uniqueAngels = [...new Set(renderableData[hubAddress].map((item) => item.angel))];
				return (
					<Row key={hubAddress} alignItems="flex-start" height="100%" bg="white">
						<CellWrapper flex={'0 0 5%'}>
							<Cell>
								{isBulkApproved(hubAddress) === 'approved' ? (
									<ThemeIcon variant="big" src={confirmIcon} />
								) : isBulkApproved(hubAddress) === 'pending' ? (
									<ThemeIcon variant="big" src={pendingFileSpinner} />
								) : (
									<CustomCheckbox
										disabled={fulfilled}
										checked={isBulkChecked(hubAddress)}
										onChange={(e) => {
											if (e.target.checked === true) {
												onBulkChange('check', hubAddress);
											} else {
												onBulkChange('uncheck', hubAddress);
											}
										}}
									/>
								)}
							</Cell>
						</CellWrapper>
						<CellWrapper flex={'0 0 45%'} data-tour="inbox-two">
							<HubAddress
								iconImage={hubPublicKeyIcon}
								publicKey={hubAddress}
								requestID={requestID}
								pointer
							></HubAddress>
						</CellWrapper>
						<CellWrapper flex={1}>
							{(isExpanded === null && index === 0) || isExpanded === hubAddress ? (
								<FilesListWrapper>
									<FilesTableHeader onClick={() => setExpanded(false)}>
										<Col flex={3}>
											<BodyText
												variant="extraSmall"
												pb={[3]}
											>{`There are ${renderableData[hubAddress].length} files available`}</BodyText>
										</Col>
										<Spacer />
										<Col flex={'1 0 62px'}>
											<BodyText variant="extraSmall" pb={[3]}>
												Date
											</BodyText>
										</Col>
										<CollapseIcon src={caretUpIcon} />
									</FilesTableHeader>
									<FilesList>
										{uniqueAngels.map((angelAddress) => {
											const contributions = renderableData[hubAddress];
											return (
												<>
													<AngelAddress
														icons={['contact']}
														publicKey={angelAddress}
														requestID={requestID}
														pointer
													></AngelAddress>
													{contributions
														.filter((item) => item.angel === angelAddress)
														.map(({ ipfsHash, status, originalIndex, AesEncryptedKey, timestamp }, fileIndex) => {
															return (
																<Row key={angelAddress}>
																	<FileItemCol>
																		{getFileStatus(originalIndex, status) === 'approved' ? (
																			<ThemeIcon variant="big" src={confirmIcon} />
																		) : getFileStatus(originalIndex, status) === 'pending' ? (
																			<ThemeIcon variant="big" src={pendingFileSpinner} />
																		) : (
																			<FileCheckbox
																				disabled={fulfilled}
																				checked={selected.includes(originalIndex)}
																				onChange={(e) => {
																					if (e.target.checked === true) {
																						onChange('check', originalIndex);
																					} else {
																						onChange('uncheck', originalIndex);
																					}
																				}}
																			/>
																		)}
																		<FileName>{`File ${originalIndex} (${ipfsHash.substr(0, 10)}...)`}</FileName>
																	</FileItemCol>
																	<FileItemCol>
																		<DownloadButton onClick={() => signalDownloadHandler(ipfsHash, AesEncryptedKey)}>
																			<DownloadButtonImage src={downloadIcon} />
																		</DownloadButton>
																	</FileItemCol>
																	<FileItemCol>
																		<Timestamp>{`${timeSince(timestamp)}`}</Timestamp>
																	</FileItemCol>
																</Row>
															);
														})}
												</>
											);
										})}
									</FilesList>
								</FilesListWrapper>
							) : (
								<CollapsedFilesListWrapper onClick={() => setExpanded(hubAddress)}>
									<BodyText variant="extraSmall">
										there are {renderableData[hubAddress].length} files available
									</BodyText>
									<CollapseIcon src={caretDownIcon} />
								</CollapsedFilesListWrapper>
							)}
						</CellWrapper>
					</Row>
				);
			})}
		</Table>
	);
};

export default RequestFilesTable;
