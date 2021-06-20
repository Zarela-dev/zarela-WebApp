import React from 'react';
import styled from 'styled-components';
import Countdown from "react-countdown";

const Wrapper = styled.div`
	flex: 3 0 auto;
	height: 250px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

const Title = styled.div`
	font-weight: bold;
	font-size: 28px;
	line-height: 30px;
	color: white;
	margin-bottom: ${props => props.theme.spacing(4)};
`;

const Segment = styled.div`
	display: flex;
	flex-direction: column;
	justify-content:center;
	align-items: center;
	flex: 0 0 105px;
    text-align: center;
`;

const Digit = styled.div`
	font-family: LeagueGothic;
	font-weight: normal;
	font-size: 88.889px;
	line-height: 82px;
	color: #FFFFFF;
	filter: drop-shadow(0px 5.55556px 5.55556px rgba(0, 0, 0, 0.25));
`;

const Label = styled.div`
	font-weight: 600;
	font-size: 14px;
	line-height: 20px;
	text-align: justify;
	margin-top: ${props => props.theme.spacing(1)};
	color: #081985;
	
`;

const Colon = styled.div`
	height: 100%;

	&::after {
		display: block;
		content: ':';
		color: white;
		opacity: 0.5;
		font-size: 58.3334px;
		line-height: 1;
		filter: drop-shadow(0px 5.55556px 5.55556px rgba(0, 0, 0, 0.25));
	}
`;

const Renderer = ({ days, hours, minutes, seconds, completed }) => {
	if (completed) {
		return 'done';
	}
	return (
		<>
			<Title>
				Bank Countdown
			</Title>
			<Row>
				<Segment>
					<Digit>{days}</Digit>
					<Label>Days</Label>
				</Segment>
				<Colon />
				<Segment>
					<Digit>{hours}</Digit>
					<Label>Hours</Label>
				</Segment>
				<Colon />
				<Segment>
					<Digit>{minutes}</Digit>
					<Label>Minutes</Label>
				</Segment>
				<Colon />
				<Segment>
					<Digit>{seconds}</Digit>
					<Label>Seconds</Label>
				</Segment>
			</Row>
		</>
	);

};

const BankCountdown = () => {
	return (
		<Wrapper>
			<Countdown
				date={Date.now() + 5000000}
				renderer={Renderer}
			/>
		</Wrapper>
	);
};



export default BankCountdown;
