import React from 'react';
import styled, { css } from 'styled-components';
// import { web3Context } from '../../web3Provider';
import contributorIcon from '../../assets/icons/contributor.svg';
// import { convertToBiobit } from '../../utils';
import {
	SidebarCard,
	Header,
	Row,
	Divider
} from './Elements';
import { Spacer } from '../Elements/Spacer';

const TextShadow = css`
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const ColoredSidebarCard = styled(SidebarCard)`
	background: linear-gradient(223.08deg, #0F0F43 -21.82%, #3439A1 51.14%, #C3B8F6 125.64%);
	box-shadow: 0px 10px 18px rgba(81, 197, 234, 0.06);
	padding-bottom: 0;
`;

const Title = styled.div`
	font-weight: 700;
	font-size: 18px;
	color: ${props => props.colored ? '#FDF534' : 'white'};
	${TextShadow};
	flex: 0 0 190px;
`;

const ValueColumn = styled.div`
	display: flex;
	flex-direction: column;
`;

const Value = styled.div`
	font-weight: 400;
	font-size: 14px;
	color: white;
`;

const LastUpdate = styled(Value)``;

const TotalContributorsLabel = styled.div`
	${TextShadow};
	font-weight: normal;
	font-size: 16px;
	word-break: break-word;
	max-width: 110px;
	color: white;
`;

const TotalContributorsIcon = styled.img`
	width: 26px;
	margin-right: ${props => props.theme.spacing(1)};
	${TextShadow};
`;

const TotalContributors = styled.div`
	${TextShadow};
	color: white;
	font-weight: bold;
	font-size: 24px;
`;

const Sidebar = () => {
	// const { Web3 } = useContext(web3Context);

	// useEffect(() => {
	// 	if (Web3.web3){
	// 		Web3.web3.contributer_count()
	// 			.then(result =>
	// 				console.log('contributors count', result))
	// 			.catch(err => console.log(err));
	// 	}
	// 	Web3.web3.sum_of_reward_per_contributer()
	// }, [Web3.web3]);

	return (
		<ColoredSidebarCard>
			<Header>
				<Title>
					BBit Value
				</Title>
				<LastUpdate>
					2020.05.06
				</LastUpdate>
			</Header>
			<Row>
				<Title colored>
					$ 1.00
				</Title>
			</Row>
			<Row>
				<Title >
					Eth. 0.0000015
				</Title>
				<ValueColumn>
					<Value>
						TXN
					</Value>
					<Value>
						0.05689
					</Value>
				</ValueColumn>
			</Row>
			<Divider light />
			<Header>
				<TotalContributorsIcon src={contributorIcon} />
				<TotalContributorsLabel>
					Today contributes
				</TotalContributorsLabel>
				<Spacer />
				<TotalContributors>
					263
				</TotalContributors>
			</Header>
		</ColoredSidebarCard>
	);
};

export default Sidebar;
