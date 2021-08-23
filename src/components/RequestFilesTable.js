import React from 'react';
import styled from 'styled-components';
import { SmallCheckbox } from './Elements/Checkbox';
import downloadIcon from '../assets/icons/download.svg';
import { Spacer } from './Elements/Spacer';
import { Scrollbar } from './Elements/Scrollbar';
import { timeSince, CopyableText } from '../utils';
import publicKeyIcon from '../assets/icons/public-key.svg';
import confirmIcon from '../assets/icons/confirmed.svg';

const Table = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: ${(props) => props.theme.spacing(3)};
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

const Row = styled.section`
	display: flex;
	margin-bottom: 4px;

	${CellWrapper}:first-of-type {
		flex: 0 0 62px;
	}

	${CellWrapper}:nth-of-type(2) {
		flex: 0 0 420px;
	}

	${CellWrapper}:nth-of-type(3) {
		flex: 1 0 auto;
	}
`;

const Cell = styled.div`
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

const PublicKeyIcon = styled.img`
	flex: 0 0 40px;
	height: 40px;
	margin-right: ${(props) => props.theme.spacing(1)};
`;

const CustomCheckbox = styled(SmallCheckbox)`
	margin: 0;
`;

const FilesListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${(props) => props.theme.spacing(1)};
	margin-bottom: ${(props) => props.theme.spacing(2)};
	height: 100%;
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
		flex: 1 0 170px;
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
			height: 60px;
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

	&:not(:last-child) {
		margin-bottom: ${(props) => props.theme.spacing(2)};
	}
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
	signalDownloadHandler,
}) => {
	return (
		<Table>
			<Row>
				<CellWrapper>
					<Cell data-tour="inbox-three">
						{isAllApproved() ? (
							<ConfirmedIcon src={confirmIcon} noMargin />
						) : (
							<CustomCheckbox
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
					<Cell>Contributor's public key</Cell>
				</CellWrapper>
				<CellWrapper>
					<Cell>Uploaded files</Cell>
				</CellWrapper>
			</Row>
			{Object.keys(data).map((contributorAddress, index) => (
				<Row key={contributorAddress}>
					<CellWrapper>
						<Cell>
							{isBulkApproved(contributorAddress) ? (
								<ConfirmedIcon src={confirmIcon} noMargin />
							) : (
								<CustomCheckbox
									checked={isBulkChecked(contributorAddress)}
									onChange={(e) => {
										if (e.target.checked === true) {
											onBulkChange('check', contributorAddress);
										} else {
											onBulkChange('uncheck', contributorAddress);
										}
									}}
								/>
							)}
						</Cell>
					</CellWrapper>
					<CellWrapper data-tour="inbox-two">
						<CopyableText textToCopy={contributorAddress}>
							<Cell pointer>
								<PublicKeyIcon src={publicKeyIcon} />
								{contributorAddress}
							</Cell>
						</CopyableText>
					</CellWrapper>
					<CellWrapper flex={1}>
						{true ? (
							<FilesListWrapper>
								<FilesTableHeader>
									<FilesTableHeaderCol flex={3}>
										<FilesTableHeaderTitle>{`There are ${data[contributorAddress].length} files available`}</FilesTableHeaderTitle>
									</FilesTableHeaderCol>
									<Spacer />
									<FilesTableHeaderCol flex={'1 0 62px'}>
										<FilesTableHeaderTitle>Date</FilesTableHeaderTitle>
									</FilesTableHeaderCol>
								</FilesTableHeader>
								<FilesList>
									{data[contributorAddress].map(
										(
											{ ipfsHash, status, originalIndex, AesEncryptedKey, timestamp },
											fileIndex
										) => {
											return (
												<FileItemRow key={originalIndex}>
													<FileItemCol>
														{status === true ? (
															<ConfirmedIcon src={confirmIcon} />
														) : (
															<FileCheckbox
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
														<FileName>
															{
																originalIndex +
																	'.' +
																	ipfsHash +
																	`  (File #${fileIndex + 1})`
															}
														</FileName>
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
										}
									)}
								</FilesList>
							</FilesListWrapper>
						) : (
							<FilesListWrapper>
								there are {data[contributorAddress].length} files available
							</FilesListWrapper>
						)}
					</CellWrapper>
				</Row>
			))}
		</Table>
	);
};

export default RequestFilesTable;
