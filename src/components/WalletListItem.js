import React from 'react';
import styled from 'styled-components';
import { Spacer } from './Elements/Spacer';
import publicKeyIcon from '../assets/icons/public-key.svg';

const Wrapper = styled.div`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	background: #F4F8FE;
	opacity: 0.8;
	border-radius: 8px;
	padding: ${props => props.theme.spacing(3)} ${props => props.theme.spacing(3.5)};
	margin-bottom: ${props => props.theme.spacing(2)};
`;

const Icon = styled.img`
	margin-right: ${props => props.theme.spacing(2)};
`;

const Title = styled.div`
	font-weight: 500;
	font-size: 14px;
	line-height: 18px;
`;

const TotalBadge = styled.div`
	background: #2EECA8;
	min-width: 32px;
	height: 32px;
	padding: ${props => props.theme.spacing(0.8)} ${props => props.theme.spacing(0.6)};
	border-radius: 32px;

	text-align: center;
	font-weight: bold;
	font-size: 16px;
	line-height: 18px;
	color: white;
`;

const Col = styled.div`

`;

const Divider = styled.div`
	width: 1px;
	background: #3C87AA;
	min-height: 37px;
	margin: 0 ${props => props.theme.spacing(1)};
`;

function WalletListItem({
	transactionHash,
	timeStamp,
	from,
	to,
	BBTValue,
	incoming
}) {
	return (
		<Wrapper>
			<Icon src={publicKeyIcon} />
			<Title>
				{transactionHash}
			</Title>
			<Spacer />
			<Col>
				{BBTValue}
			</Col>
			<Divider />
			<Divider />
			<TotalBadge>
				{'total'}
			</TotalBadge>
		</Wrapper>
	);
}

export default WalletListItem;
