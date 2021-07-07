import React from 'react';
import styled from 'styled-components';
import Dialog from './index';
import Button, { LinkButton } from '../Elements/Button';
import metamaskIcon from '../../assets/icons/metamask.png';
import { injectedConnector} from '../../connectors';
import { useWeb3React } from '@web3-react/core';

const Text = styled.p`
	font-weight: normal;
	font-size: 14px;
	line-height: 12px;
	color: #121213;
	margin-bottom: ${props => props.theme.spacing(3)};
`;

const Icon = styled.img`
	max-width: 180px;
`;

const Divider = styled.div`
	height: 1px;
	width: 90%;
	margin: ${props => props.theme.spacing(3)} auto;
	background: #919191;
	border-radius: 24px;
`;

const DownloadBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const DownloadButton = styled(LinkButton)`
	width: 81px;
	height: 30px;

	& > * {
		font-weight: 500;
		font-size: 12px;
		line-height: 23px;
		padding: 3px;
	}
`;

const ConnectButton = styled(Button)`
	margin: 0 auto;
`;


const ConnectDialog = (props) => {
	const { activate } = useWeb3React();

	return (
		<Dialog
			{...props}
			type="success"
			title={'Sync your wallet'}
			content={(
				<>
					<Text>
						Our recommended wallet is Metamask.
					</Text>
					<DownloadBox>
						<Icon src={metamaskIcon} />
						<DownloadButton variant='secondary' target='_blank' href='https://metamask.io/download.html'>
							Download
						</DownloadButton>
					</DownloadBox>
					<Divider />
					<ConnectButton variant='primary' onClick={() => activate(injectedConnector)}>
						Connect
					</ConnectButton>
				</>
			)}
		/>
	);
};

export default ConnectDialog;
