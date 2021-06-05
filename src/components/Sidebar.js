import React, { useContext } from 'react';
import styled from 'styled-components';
import biobitBlack from '../assets/icons/biobit-black.svg';
import { web3Context } from '../web3Provider';
import walletBlack from '../assets/icons/wallet-black.svg';
import etherBlack from '../assets/icons/ether-black.svg';

const SidebarCard = styled.div`
	flex: 0 0 390px;
	background: linear-gradient(221.29deg, #E6F7FB 3.96%, #E1E5F5 102.57%);
	box-shadow: 0px 10px 18px rgba(81, 197, 234, 0.06);
	border-radius: 8px;
	padding: 0 ${props => props.theme.spacing(3)} ${props => props.theme.spacing(3)} ${props => props.theme.spacing(3)};
	height: 305px;
`;


const Header = styled.header`
	display: flex;
	margin-top: ${props => props.theme.spacing(3)};
	margin-bottom: ${props => props.theme.spacing(3)};
`;

const Icon = styled.img`
	width: 24px;
	margin-right: ${props => props.theme.spacing(1.5)};
`;

const Title = styled.h3`
	font-weight: 700;
	font-size: 18px;
    line-height: 25px;
	color: #3C87AA;
`;

const Row = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: ${props => props.theme.spacing(1)};

`;

const Value = styled.span`
	font-weight: normal;
	font-size: 14px;
	margin-left: ${props => props.theme.spacing(1)};
`;

const ValueIcon = styled.img`
	width: 14px;
	margin-right: ${props => props.theme.spacing(.5)};
`;

const Subtitle = styled.h6`
	display: block;
	font-weight: 700;
	font-size: 14px;
	color: '#3C87AA';
`;

const Sidebar = () => {
	const { Web3 } = useContext(web3Context);

	return (
		<SidebarCard>
			<Header>
				<Icon src={biobitBlack} />
				<Title>
					Token Info
				</Title>
			</Header>
			<Row>
				<Subtitle>
					Total Supply:
				</Subtitle>
				<Value>
					20,000,000,000
				</Value>
			</Row>
			<Row>
				<Subtitle>
					Token Name:
				</Subtitle>
				<Value>
					Biobit
				</Value>
			</Row>
			<Row>
				<Subtitle>
					Symbol:
				</Subtitle>
				<Value>
					BBit
				</Value>
			</Row>
			<Header>
				<Icon src={walletBlack} />
				<Title>
					Wallet Info
				</Title>
			</Header>
			<Row>
				<Subtitle>
					Your Biobit Balance:
				</Subtitle>
				<Value>
					{`${+Web3.biobitBalance / Math.pow(10, 9)}  Biobit`}
				</Value>
			</Row>
			<Row>
				<Subtitle>
					Your Ether Balance:
				</Subtitle>
				<Value>
					{Web3.etherBalance}
				</Value>
			</Row>
		</SidebarCard>
	);
};

export default Sidebar;
