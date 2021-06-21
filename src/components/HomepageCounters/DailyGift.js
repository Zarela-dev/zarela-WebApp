import React from 'react';
import styled from 'styled-components';
import Countdown from "react-countdown";

const Wrapper = styled.div`
	position: relative;
	width: 310px;
	flex: 0 0 310px;

`;

const Inner = styled.div`
	display: flex;
	justify-content: center;
	position: absolute;
	top: 2px;
	left: 2px;
	width: calc(100% - 2px);
	height: calc(100% - 2px);
`;

const TimerContainer = styled.div`
	position: relative;
  	height: 120px;
	width: 100%;
	/* background: linear-gradient(256.48deg, #A2F0EA -37.74%, #75F0E7 -37.73%, #A981FE 103.72%); */
	border: 3px solid #41C4BB;
	box-shadow: 0px 10px 18px rgba(81, 197, 234, 0.06);
	border-radius: 25px;
`;

const Content = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: ${props => props.theme.spacing(2)};
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: ${props => props.theme.spacing(3)};
`;

const Title = styled.div`
	font-weight: bold;
	font-size: 24px;
	line-height: 30px;
	color: #FFFFFF;
`;

const Subtitle = styled.div`
	font-weight: bold;
	font-size: 24px;
	line-height: 30px;
	color: #F1EA3A;
`;

const Segment = styled.div`
	display: flex;
	flex-direction: column;
	justify-content:center;
	align-items: center;
	flex: 0 0 60px;
    text-align: center;
`;

const Digit = styled.div`
	font-family: LeagueGothic;
	font-weight: normal;
	font-size: 45px;
	line-height: 50px;
	color: #FF772A;
	filter: drop-shadow(0px 5.55556px 5.55556px rgba(0, 0, 0, 0.25));
`;

const Label = styled.div`
	font-weight: 600;
	font-size: 14px;
	line-height: 20px;
	text-align: justify;
	margin-top: ${props => props.theme.spacing(1)};
	color: #fff;
`;

const Colon = styled.div`
	height: 60%;

	&::after {
		display: block;
		content: ':';
		opacity: 0.5;
		font-weight: 500;
		font-size: 24px;
		line-height: 30px;
		color: #FFFFFF;
		filter: drop-shadow(0px 5.55556px 5.55556px rgba(0, 0, 0, 0.25));
	}
`;

const Renderer = ({ days, hours, minutes, seconds, completed }) => {
	if (completed) {
		return 'done';
	}
	return (
		<Content>
			<Segment>
				<Digit>{hours}</Digit>
				<Label>Hours</Label>
			</Segment>
			<Colon />
			<Segment>
				<Digit>{minutes}</Digit>
				<Label>Minutes</Label>
			</Segment>
		</Content>
	);

};

const DailyGift = ({giftValue}) => {
	return (
		<Wrapper>
			<Header>
				<Title>
					Today Gift
				</Title>
				<Subtitle>
					{giftValue + ' BBit'}
				</Subtitle>
			</Header>
			<TimerContainer>
				<Inner>
					<Countdown
						date={Date.now() + 5000000}
						renderer={Renderer}
					/>
				</Inner>
			</TimerContainer>
		</Wrapper>
	);
};

export default DailyGift;
