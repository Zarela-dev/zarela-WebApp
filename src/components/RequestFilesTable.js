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

const EmptyRowMessage = styled.div`
	flex: 1;
	padding: ${(props) => props.theme.spacing(2)};
	background: white;
`;

const Row = styled.section`
	display: flex;
	margin-bottom: 4px;

	${CellWrapper}:first-of-type {
		flex: 0 0 62px;
	}

	${CellWrapper}:nth-of-type(2) {
		flex: 0 0 500px;
	}

	${CellWrapper}:nth-of-type(3) {
		flex: 1 0 auto;
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

const PublicKeyIcon = styled.img`
	flex: 0 0 40px;
	height: 40px;
	margin-right: ${(props) => props.theme.spacing(1)};
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
	color: ${(props) => props.theme.textPrimary};

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
	color: ${(props) => props.theme.textPrimary};
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
		[pendingFiles.pending]
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
			<Table>
				<Row>
					<EmptyRowMessage>You do not have any visible requests here.</EmptyRowMessage>
				</Row>
			</Table>
		);
	return (
		<Table>
			<Row>
				<CellWrapper>
					<Cell data-tour="inbox-three">
						{isAllApproved() === 'approved' ? (
							<ConfirmedIcon src={confirmIcon} noMargin />
						) : isAllApproved() === 'pending' ? (
							<PendingFileIcon src={pendingFileSpinner} noMargin />
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
				<CellWrapper>
					<Cell>Hub Address</Cell>
				</CellWrapper>
				<CellWrapper>
					<Cell>Uploaded Files & Angel Address</Cell>
				</CellWrapper>
			</Row>
			{Object.keys(renderableData).map((hubAddress, index) => {
				const uniqueAngels = [...new Set(renderableData[hubAddress].map((item) => item.angel))];
				return (
					<Row key={hubAddress}>
						<CellWrapper>
							<Cell>
								{isBulkApproved(hubAddress) === 'approved' ? (
									<ConfirmedIcon src={confirmIcon} noMargin />
								) : isBulkApproved(hubAddress) === 'pending' ? (
									<PendingFileIcon src={pendingFileSpinner} noMargin />
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
						<CellWrapper data-tour="inbox-two">
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
										<FilesTableHeaderCol flex={3}>
											<FilesTableHeaderTitle>{`There are ${renderableData[hubAddress].length} files available`}</FilesTableHeaderTitle>
										</FilesTableHeaderCol>
										<Spacer />
										<FilesTableHeaderCol flex={'1 0 62px'}>
											<FilesTableHeaderTitle>Date</FilesTableHeaderTitle>
										</FilesTableHeaderCol>
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
																<FileItemRow key={angelAddress}>
																	<FileItemCol>
																		{getFileStatus(originalIndex, status) === 'approved' ? (
																			<ConfirmedIcon src={confirmIcon} />
																		) : getFileStatus(originalIndex, status) === 'pending' ? (
																			<PendingFileIcon src={pendingFileSpinner} />
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
																</FileItemRow>
															);
														})}
												</>
											);
										})}
									</FilesList>
								</FilesListWrapper>
							) : (
								<CollapsedFilesListWrapper onClick={() => setExpanded(hubAddress)}>
									<CollapsedLabel>there are {renderableData[hubAddress].length} files available</CollapsedLabel>
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
