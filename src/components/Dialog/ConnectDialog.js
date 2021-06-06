import React from 'react';
import styled from 'styled-components';
import Dialog from './index';
import { Button } from '../Elements/Button';
import metamaskIcon from '../../assets/icons/metamask.png';

const Text = styled.p`
	font-weight: normal;
	font-size: 14px;
	line-height: 12px;
	color: #121213;
	margin-bottom: ${props => props.theme.spacing(3)};
`;
const Icon = styled.img`
  
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
const DownloadButton = styled.a`
	width: 81px;
	height: 30px;
	background: #FFFFFF;
	box-shadow: 0px 5.46667px 18px rgba(223, 236, 255, 0.5);
	border-radius: 5.46667px;
	border: 1px solid #BBBEE6;
	text-decoration: none;
	padding: ${props => props.theme.spacing(0.5)} ${props => props.theme.spacing(1)};
	color: #7246D0;
	font-weight: 500;
	font-size: 12px;
	line-height: 20px;
`;

const ConnectButton = styled.button`
	${Button};
	margin: 0 auto;
`;

const ConnectDialog = (props) => {
	return (
		<Dialog
			{...props}
			title={'Sync your wallet'}
			content={(
				<>
					<Text>
						Our recommended wallet is Metamask.
					</Text>
					<DownloadBox>
						<Icon src={metamaskIcon} />
						<DownloadButton target='_blank' href='https://metamask.io/download.html'>
							Download
						</DownloadButton>
					</DownloadBox>
					<Divider />
					<ConnectButton onClick={() => window.ethereum && window.ethereum.enable()}>
						Connect to Metamask
					</ConnectButton>
				</>
			)}
		/>
	);
};

export default ConnectDialog;
