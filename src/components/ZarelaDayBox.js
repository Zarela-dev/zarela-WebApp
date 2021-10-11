import React from 'react';
import styled from 'styled-components';
import { TYPOGRAPHY } from './../theme';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: ${(props) => props.theme.spacing(5)};
	max-height: 108px;

	@media only screen and (max-width: ${(props) =>
			props.theme.desktop_sm_breakpoint}) {
		flex-direction: row;
		padding: ${(props) =>
			`${props.theme.spacing(3)} ${props.theme.spacing(7)}`};
		margin-bottom: 0;
		max-height: 108px;
	}
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: ${(props) => props.theme.spacing(4)};

	@media only screen and (max-width: ${(props) =>
			props.theme.desktop_sm_breakpoint}) {
		margin-bottom: 0;
	}
`;

const ZarelaDay = styled.p`
	font-family: LeagueGothic;
	font-weight: normal;
	font-size: 64px;
	line-height: 43px;
	color: #ffffff;
	letter-spacing: 1px;

	@media only screen and (max-width: ${(props) =>
			props.theme.desktop_sm_breakpoint}) {
		font-size: 40.96px;
		line-height: 34px;
		letter-spacing: 1px;
	}
`;

const ZarelaDaySubtitle = styled.p`
	text-align: justify;
	margin-left: 5px;
`;

const Divider = styled.div`
	border-bottom: 1px solid #fefefe;
	width: 90%;

	@media only screen and (max-width: ${(props) =>
			props.theme.desktop_sm_breakpoint}) {
		display: none;
	}
`;

const ZarelaDayBox = ({ currentDay = 0 }) => {
	return (
		<Container>
			<Row>
				<TYPOGRAPHY.headLine4 color='white' bold>
					Current Zarela Day
				</TYPOGRAPHY.headLine4>
			</Row>
			<Row>
				<ZarelaDay>{`${currentDay}th`}</ZarelaDay>
				<ZarelaDaySubtitle>
					<TYPOGRAPHY.body2 zarelaDay>Day</TYPOGRAPHY.body2>
				</ZarelaDaySubtitle>
			</Row>
			<Divider />
		</Container>
	);
};

export default ZarelaDayBox;
