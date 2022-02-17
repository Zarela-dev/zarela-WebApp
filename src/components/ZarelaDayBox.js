import React from 'react';
import styled from 'styled-components';
import questionMarkIcon from '../assets/icons/question-mark.svg';
import { Header, BodyText } from './Elements/Typography';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: ${props => props.theme.space[8]}px;

	@media only screen and (max-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		flex-direction: row;
		padding: ${(props) => `${props.theme.spacing(3)} ${props.theme.spacing(7)}`};
		margin-bottom: 0;
		justify-content: 'space-evenly';
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

const Title = styled.h2`
	font-weight: 500;
	font-size: 24px;
	line-height: 150.5%;
	color: ${props => props.theme.colors.textLabel};
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

const ZarelaDay = styled.p`
	font-family: LeagueGothic;
	font-weight: normal;
	font-size: 64px;
	line-height: 43px;
	color: ${props => props.theme.colors.textLabel};
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
	color: ${props => props.theme.colors.textLabel};
`;

const Divider = styled.div`
	border-bottom: 1px solid ${props => props.theme.colors.bgDisabled};
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
				<ZarelaDay>{`10th`}</ZarelaDay>
				<ZarelaDaySubtitle>Day</ZarelaDaySubtitle>
			</Row>
			<Divider />
		</Container>
	);
};

export default ZarelaDayBox;
