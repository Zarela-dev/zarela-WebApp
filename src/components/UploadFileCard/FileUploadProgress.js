import React from 'react';
import { Flex, Box } from 'rebass/styled-components';
import { BodyText, Header, TextComponent } from '../Elements/Typography';
import styled from 'styled-components';
import infoIcon from '../../assets/icons/file-info.svg';
import { ThemeButton } from '../Elements/Button';
import { Scrollbar } from '../Elements/Scrollbar';

const ListContainer = styled(Box)`
	${Scrollbar};
	overflow: auto;
	max-height: 500px;
	padding-right: ${({ theme }) => theme.space[3]}px;
`;

const Icon = styled.img`
	width: 20px;
	margin-right: ${(props) => props.theme.space[4]}px;
`;

const FileProgressItem = ({ status }) => {
	const StatusText = ({ status }) => {
		switch (status) {
			case 'uploading':
				return (
					<TextComponent sx={{ fontSize: '14px', fontWeight: 500, color: '#F8AF1A' }}>Uploading ...</TextComponent>
				);
			case 'done':
				return <TextComponent sx={{ fontSize: '14px', fontWeight: 500, color: '#34C889' }}>Done</TextComponent>;
			case 'pending':
				return <TextComponent sx={{ fontSize: '14px', fontWeight: 500, color: '#AEAEAE' }}>Pending</TextComponent>;
			case 'decrypting':
				return (
					<TextComponent sx={{ fontSize: '14px', fontWeight: 500, color: '#F8AF1A' }}>Decrypting ...</TextComponent>
				);
			case 'failed':
				return <TextComponent sx={{ fontSize: '14px', fontWeight: 500, color: '#E74A26' }}>Failed</TextComponent>;
			default:
				return <TextComponent sx={{ fontSize: '14px', fontWeight: 500, color: '#AEAEAE' }}>Pending</TextComponent>;
		}
	};

	return (
		<Flex pb={3}>
			<Flex
				sx={{
					flex: 6,
					justifyContent: 'flex-start',
					background: '#F4F4F4',
					borderRadius: 8,
					padding: 3,
				}}
			>
				<Flex flex="1" justifyContent={'space-between'}>
					<TextComponent
						sx={{
							fontSize: '14px',
							fontWeight: '500',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
							width: '80%',
						}}
						variant="small"
					>
						File_Name_sdawdxacdasdcsceccascxaxasxcdsvdc sdcaszxdcscsx sdcaszxdcscsx
					</TextComponent>
					<StatusText status={status} />
				</Flex>
			</Flex>
			{status === 'failed' ? (
				<Box flex="1">
					<ThemeButton sx={{ marginLeft: 3, height: 54 }} variant="primary" size="block">
						Retry
					</ThemeButton>
				</Box>
			) : null}
		</Flex>
	);
};

const FileUploadProgress = () => {
	return (
		<Box>
			<Box mb={4}>
				<Header variant="heading6">Files are being uploaded</Header>
			</Box>
			<Flex
				sx={{
					background: '#FFF8F8',
					border: '1px solid #E74A26',
					borderRadius: '8px',
					padding: 3,
				}}
			>
				<Icon src={infoIcon} />
				<BodyText fontWeight={700} variant="hint">
					DO NOT CLOSE THIS WINDOW OR{' '}
				</BodyText>
			</Flex>
			<Box
				sx={{
					width: '100%',
					border: '1px solid #C9C9C9',
					marginTop: 3,
					marginBottom: 3,
				}}
			></Box>
			<ListContainer>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem status={'failed'}>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
				<FileProgressItem>fsd</FileProgressItem>
			</ListContainer>
		</Box>
	);
};

export default FileUploadProgress;