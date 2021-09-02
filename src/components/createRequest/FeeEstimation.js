import React, {useContext} from 'react';
import styled from 'styled-components';
import alertOrange from './../../assets/icons/alert.svg';
import { mainContext } from '../../state';

const FeeEstimationContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: flex-start;
	flex-grow: 1;
`;

const GasFeeBox = styled.div`
	border: 1.5px solid #d13ade;
	padding: 15px 0;
	box-shadow: 0px 10px 18px 0px #51c5ea0f;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	max-width: 309px;
	height: 162px;
`;

const AlertIcon = styled.img`
	width: 23px;
	height: 20px;
	margin-right: 4.6px;
`;
const Title = styled.h4`
	font-size: 18px;
	font-weight: 500;
	line-height: 21.6px;
	text-align: center;
	padding: 0 35px;
	margin-bottom: 17px;
`;
const ContentText = styled.p`
	font-size: 14px;
	font-weight: ${(props) => (props.bold ? 500 : 400)};
	line-height: 20px;
	margin-bottom: 3px;
`;

const FeeEstimation = ({fee}) => {
  const {appState} = useContext(mainContext);
  let gas = (+appState.gas.average * Math.pow(10, 8)) / Math.pow(10, 9);









	return (
		<FeeEstimationContainer>
			<GasFeeBox>
				<Title>
					<AlertIcon src={alertOrange} />
					Current network Gas fee rate = {gas.toLocaleString()} Gwei
				</Title>
				<ContentText bold>Estimated minimum fee</ContentText>
				<ContentText>ETH. ~ {fee}</ContentText>
				<ContentText>$. ~ 0.0000023</ContentText>
			</GasFeeBox>
		</FeeEstimationContainer>
	);
};

export default FeeEstimation;
