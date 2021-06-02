import React from 'react';
import styled from 'styled-components';
import walletBlack from '../assets/icons/wallet-black.svg';
import biobitBlack from '../assets/icons/biobit-black.svg';
import etherBlack from '../assets/icons/ether-black.svg';

const SidebarCard = styled.div`
	flex: 0 0 390px;
	background: linear-gradient(221.29deg, #E6F7FB 3.96%, #E1E5F5 102.57%);
	box-shadow: 0px 10px 18px rgba(81, 197, 234, 0.06);
	border-radius: 8px;
	padding: ${props => props.theme.spacing(3)};
	height: 300px;
`;


const Header = styled.header`
	display: flex;
	margin-bottom: ${props => props.theme.spacing(3)};
`;

const Icon = styled.img`
	width: 24px;
	margin-right: ${props => props.theme.spacing(1.5)};
`;

const Title = styled.h3`
	font-weight: 700;
	font-size: 18px;
	line-height: 20px;
`;

const Row = styled.div`
	
`;

const Value = styled.span`
	font-weight: normal;
	font-size: 12px;
`;

const ValueIcon = styled.img`
	width: 14px;
	margin-right: ${props => props.theme.spacing(.5)};
`;

const Subtitle = styled.h6`
	display: block;
	font-weight: 700;
	font-size: 14px;
	margin-bottom: ${props => props.theme.spacing(1)};
	color: '#3C87AA';
`;

const Sidebar = () => {
	return (
		<SidebarCard>
			<Header>
				<Icon src={walletBlack} />
				<Title>
					Metamask Wallet
				</Title>
			</Header>
			<Subtitle>
				Total amount 
			</Subtitle>
			<Row>
				<ValueIcon src={biobitBlack}/>
				<Value>
					0.0497786589
				</Value>
			</Row>
			<Row>
				<ValueIcon src={etherBlack}/>
				<Value>
					0.0497786589
				</Value>
			</Row>
		</SidebarCard>
	);
};

export default Sidebar;
