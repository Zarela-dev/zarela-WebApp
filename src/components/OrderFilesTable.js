import React from 'react';
import styled from 'styled-components';
import { SmallCheckbox } from './Elements/Checkbox';
import { AvatarImage, Avatar } from './Elements/OrderCard';
import avatarIcon from '../assets/icons/avatar.png';
import downloadIcon from '../assets/icons/download.svg';

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
`;

const FilesList = styled.div`
	flex: 1;
	border-left: 1px solid #3C87AA;
    margin-left: -21px;
    padding-left: 20px;
	max-height: 238px;
    overflow: auto;
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
	margin-right: ${props => props.theme.spacing(4)};
`;

const DownloadButton = styled.img`
	width: 	20px;
	cursor: pointer;
`;

const OrderFilesTable = ({ data, checked, onChange }) => {
	return (
		<Table>
			<Row>
				<CellWrapper>
					<Cell>
						<CustomCheckbox checked={checked} onChange={onChange} />
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
				Object.keys(data).map((item, index) => (
					<Row key={item}>
						<CellWrapper>
							<Cell>
								<CustomCheckbox checked={checked} onChange={onChange} />
							</Cell>
						</CellWrapper>
						<CellWrapper>
							<Cell>
								<SmallAvatar>
									<AvatarImage src={avatarIcon} />
								</SmallAvatar>
								{item}
							</Cell>
						</CellWrapper>
						<CellWrapper>
							<FilesListWrapper>
								<FilesCount>
									{`${data[item].length} files`}
								</FilesCount>
								<FilesList>
									{
										data[item].map((file, fileIndex) => {
											return (
												<FileItem>
													<FileCheckbox />
													<FileName>
														{
															item.substr(0, 4) + '...' + item.substr(item.length - 4) + `  (File #${fileIndex + 1})`
														}
													</FileName>
													<DownloadButton src={downloadIcon} />
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
