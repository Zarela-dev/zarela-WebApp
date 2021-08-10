import React from 'react';
import styled from 'styled-components';
import questionMarkIcon from '../assets/icons/question-mark.svg';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: ${(props) => props.theme.spacing(5)};
`;

const Title = styled.h2`
	font-weight: 500;
	font-size: 24px;
	line-height: 150.5%;
	color: #ffffff;
`;
const Row = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const QuestionIcon = styled.img`
	width: 24px;
`;

const ZarelaDay = styled.p`
	font-family: LeagueGothic;
	font-weight: normal;
	font-size: 64px;
	line-height: 43px;
	color: #ffffff;
`;

const ZarelaDaySubtitle = styled.p`
	font-weight: 600;
	font-size: 14px;
	line-height: 20px;
	text-align: justify;
	color: #ffffff;
	line-height: 4.8;
	margin-left: 5px;
`;

const Divider = styled.div`
	border-bottom: 1px solid #fefefe;
	width: 90%;
`;

const ZarelaDayBox = ({ currentDay = 0 }) => {
	return (
		<Container>
			<Row>
				<Title>Current Zarela Day</Title>
				<QuestionIcon src={questionMarkIcon} />
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
