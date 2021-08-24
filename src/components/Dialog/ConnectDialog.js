import React from 'react';
import styled from 'styled-components';
import Dialog from './index';
import Button, { LinkButton } from '../Elements/Button';
import metamaskIcon from '../../assets/icons/metamask.png';
import { injectedConnector } from '../../connectors';
import { useWeb3React } from '@web3-react/core';

const Text = styled.p`
	font-weight: normal;
	font-size: 14px;
	line-height: 18px;
	color: #121213;
	margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const Icon = styled.img`
	max-width: 120px;

	@media only screen and (min-width: ${({ theme }) => theme.desktop_sm_breakpoint}) {
		max-width: 180px;
	}
`;

const Divider = styled.div`
	height: 1px;
	width: 90%;
	margin: ${(props) => props.theme.spacing(3)} auto;
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
	margin: 0;

	& > * {
		font-weight: 500;
		font-size: 12px;
		line-height: 23px;
		padding: 3px;
	}
`;

const ConnectButton = styled(Button)`
	margin: 0 auto;
	min-width: 270px;

	@media only screen and (max-width: ${({ theme }) => theme.tablet_sm_breakpoint}) {
		min-width: unset;
		max-width: unset;
		height: auto;
		margin: 0;
		width: 100%;
		
		& > button {
			font-size: 18px;
			white-space: nowrap;
			padding: 15px 10px;
		}
	}
`;

const ConnectDialog = (props) => {
	const { activate, account } = useWeb3React();

	return (
		<Dialog
			{...props}
			type="success"
			title={'Connect to your wallet'}
			content={
				<>
					<Text>Our recommended wallet is Metamask. If you don't already have a wallet try Metamask.</Text>
					<DownloadBox>
						<Icon src={metamaskIcon} />
						<DownloadButton variant="secondary" target="_blank" href="https://metamask.io/download.html">
							Download
						</DownloadButton>
					</DownloadBox>
					<Divider />
					<ConnectButton
						variant="primary"
						onClick={() => {
							if (account) typeof props.onConnect === 'function' && props.onConnect();
							else activate(injectedConnector);
						}}
					>
						Connect and continue
					</ConnectButton>
				</>
			}
		/>
	);
};

export default ConnectDialog;
