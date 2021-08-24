import React from 'react';
import styled from 'styled-components';
import questionMarkIcon from '../assets/icons/question-mark.svg';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: ${(props) => props.theme.spacing(5)};
	max-height: 108px;

	@media only screen and (max-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		flex-direction: row;
		padding: ${(props) => `${props.theme.spacing(3)} ${props.theme.spacing(7)}`};
		margin-bottom: 0;
		max-height: 108px;
	}
`;

const Title = styled.h2`
	font-weight: 500;
	font-size: 24px;
	line-height: 150.5%;
	color: #ffffff;
	word-wrap: break-word;
	align-self: flex-start;

	@media only screen and (max-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		font-weight: bold;
		font-size: 16px;
		line-height: 120%;
		margin-right: ${(props) => props.theme.spacing(2)};
		text-align: right;
	}
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: ${(props) => props.theme.spacing(4)};

	@media only screen and (max-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		margin-bottom: 0;
	}
`;

const QuestionIcon = styled.img`
	width: 24px;
	@media only screen and (max-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		display: none;
	}
`;

const ZarelaDay = styled.p`
	font-family: LeagueGothic;
	font-weight: normal;
	font-size: 64px;
	line-height: 43px;
	color: #ffffff;
	letter-spacing: 1px;

	@media only screen and (max-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		font-size: 40.96px;
		line-height: 34px;
		letter-spacing: 1px;
	}
`;

const ZarelaDaySubtitle = styled.p`
	font-weight: 600;
	font-size: 14px;
	line-height: 20px;
	text-align: justify;
	color: #ffffff;
	line-height: 4.8;
	margin-left: 5px;
	@media only screen and (max-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		line-height: 3.4;
	}
`;

const Divider = styled.div`
	border-bottom: 1px solid #fefefe;
	width: 90%;

	@media only screen and (max-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		display: none;
	}
`;

const ZarelaDayBox = ({ currentDay = 0 }) => {
	return (
		<Container>
			<Row>
				<Title>Current Zarela Day</Title>
			</Row>
			<Row>
				<ZarelaDay>{`${currentDay}th`}</ZarelaDay>
				<ZarelaDaySubtitle>Day</ZarelaDaySubtitle>
			</Row>
			<Divider />
		</Container>
	);
};

export default ZarelaDayBox;
