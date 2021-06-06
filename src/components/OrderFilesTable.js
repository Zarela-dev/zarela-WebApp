import React from 'react';
import styled from 'styled-components';
import { SmallCheckbox } from './Elements/Checkbox';
import { AvatarImage, Avatar } from './Elements/OrderCard';
import avatarImage0 from '../assets/avatar/avatar-0.jpg';
import avatarImage1 from '../assets/avatar/avatar-1.jpg';
import avatarImage2 from '../assets/avatar/avatar-2.jpg';
import avatarImage3 from '../assets/avatar/avatar-3.jpg';
import downloadIcon from '../assets/icons/download.svg';
import { Spacer } from './Elements/Spacer';
import { Scrollbar } from './Elements/Scrollbar';

const Table = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: ${props => props.theme.spacing(3)};
`;

const CellWrapper = styled.div`
	flex: 1;
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
`;


const Cell = styled.div`
	display: flex;
	align-items: center;
	min-height: 48px;
	padding: ${props => props.theme.spacing(0.6)} ${props => props.theme.spacing(1)};
	font-size: 12px;
	height: 40px;
	width: 100%;

	${CellWrapper}:not(:last-child) & {
		border-right: 1px solid #3C87AA;
	}
`;

const SmallAvatar = styled(Avatar)`
	flex: 0 0 40px;
	height: 40px;
	margin-right: ${props => props.theme.spacing(1)};
`;

const CustomCheckbox = styled(SmallCheckbox)`
	margin: 0;
`;

const FilesCount = styled.div`
	font-size: 12px;
	line-height: 20px;
	color: #858585;
	margin-bottom: ${props => props.theme.spacing(2)};
`;

const FilesListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${props => props.theme.spacing(1)};
	margin-bottom: ${props => props.theme.spacing(2)};
	height: 100%;
`;

const FilesList = styled.div`
	flex: 1;
	border-left: 1px solid #3C87AA;
    margin-left: -21px;
    padding-left: 20px;
	max-height: 238px;
	min-height: 27px;
    overflow: auto;

	${Scrollbar};
`;

const FileItem = styled.div`
	flex: 1;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	font-size: 12px;
	line-height: 20px;
	color: #121213;
	&:not(:last-child) {
		margin-bottom: ${props => props.theme.spacing(2)};
	}
`;

const FileCheckbox = styled(SmallCheckbox)`
	margin-right: ${props => props.theme.spacing(1)};
`;

const FileName = styled.div`
`;

const DownloadButton = styled.img`
	width: 	20px;
`;

const DownloadLink = styled.a`
	margin-right: ${props => props.theme.spacing(2)};
`;

const OrderFilesTable = ({ data, selected, onChange, onBulkChange, isAllChecked, changeAll }) => {
	let avatarImage = [avatarImage0, avatarImage1, avatarImage2, avatarImage3];

	return (
		<Table>
			<Row>
				<CellWrapper>
					<Cell>
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
					</Cell>
				</CellWrapper>
				<CellWrapper>
					<Cell>
						Contributor public key
					</Cell>
				</CellWrapper>
				<CellWrapper>
					<Cell>
						Uploaded files
					</Cell>
				</CellWrapper>
			</Row>
			{
				Object.keys(data).map((reqAddress, index) => (
					<Row key={reqAddress}>
						<CellWrapper>
							<Cell>
								<CustomCheckbox
									checked={selected[reqAddress].length === data[reqAddress].length}
									onChange={(e) => {
										if (e.target.checked === true) {
											onBulkChange('check', reqAddress);
										} else {
											onBulkChange('uncheck', reqAddress);
										}
									}} />
							</Cell>
						</CellWrapper>
						<CellWrapper>
							<Cell>
								<SmallAvatar>
									<AvatarImage src={avatarImage[Math.floor(Math.random() * 4)]} />
								</SmallAvatar>
								{reqAddress}
							</Cell>
						</CellWrapper>
						<CellWrapper>
							<FilesListWrapper>
								<FilesCount>
									{`${data[reqAddress].length} files`}
								</FilesCount>
								<FilesList>
									{
										data[reqAddress].map((file, fileIndex) => {
											return (
												<FileItem key={fileIndex}>
													<FileCheckbox checked={selected[reqAddress].includes(file)} onChange={(e) => {
														if (e.target.checked === true) {
															onChange('check', reqAddress, file);
														} else {
															onChange('uncheck', reqAddress, file);
														}
													}} />
													<FileName>
														{
															// file.substr(0, 4) + '...' + file.substr(file.length - 4) + `  (File #${fileIndex + 1})`
															file + `  (File #${fileIndex + 1})`
														}
													</FileName>
													<Spacer />
													<DownloadLink target='_blank' href={`${process.env.REACT_APP_IPFS_LINK + file}`}>
														<DownloadButton src={downloadIcon} />
													</DownloadLink>
												</FileItem>
											);
										})
									}
								</FilesList>
							</FilesListWrapper>
						</CellWrapper>
					</Row>
				))
			}
		</Table>
	);
};

export default OrderFilesTable;
