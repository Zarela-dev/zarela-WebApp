import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { FormGroup, Row, Col } from 'reactstrap';
import { Box } from 'rebass/styled-components';
import { ThemeIcon } from './../../../Elements/Icon';
import { BodyText } from './../../../Elements/Typography';
import calendarIcon from './../../../../assets/icons/calendar.svg';
import Select from 'react-select';
import Slider from '@material-ui/core/Slider';
import Switch from '@mui/material/Switch';
import infoIcon from './../../../../assets/icons/info-icon.svg';
import { Tooltip } from '@material-ui/core';

import { mainContext } from '../../../../state';
import { useStore } from '../../../../state/store';

const SliderWrapper = styled.div`
	padding: 0 10px;
`;
const Span = styled.span`
	bottom: 1px;
	position: relative;
	left: 3px;
`;
const CustomSlider = styled(Slider)({
	width: 300,
	color: '#422468',
	'& .MuiSlider-track': {
		color: '#422468',
		height: 8,
	},
	'& .MuiSlider-rail': {
		height: 8,
		color: '#E9E9E9',
		opacity: 1,
	},
	'& .MuiSlider-valueLabel': {
		color: '#422468',
		left: 'calc(-50% - -4px)',
	},
	'& .MuiSlider-thumb': {
		color: '#fff',
		width: 24,
		height: 24,
		marginTop: '-8px',
		border: '1px solid #C4C4C4',
		[`&:hover, &.Mui-focusVisible`]: {
			boxShadow: '0px 0px 0px 8px var(--box-shadow)',
		},
		[`&.Mui-active`]: {
			boxShadow: '0px 0px 0px 14px var(--box-shadow)',
			color: 'red',
			backgroundColor: 'blue',
		},
	},
});

const CustomSwitch = styled(Switch)({
	'& .MuiSwitch-switchBase': {
		color: '#fff',
	},
	'& .Mui-checked': {
		'& .MuiSwitch-thumb': {
			backgroundColor: '#6200EE',
		},
	},
	'& .Mui-checked + .MuiSwitch-track': {
		backgroundColor: '#BB86FC !important',
	},
	'& .MuiSwitch-track': {
		background: '#212121',
	},
});

const DatePickerWrapper = styled.div`
	margin-bottom: 1rem;
`;
const InputStyles = css`
	font-family: Krub;
	background: ${(props) => props.theme.colors.bgWhite};
	border: 1px solid #e8e8e8;
	border-radius: 4px;
	padding: ${(props) => props.theme.spacing(1)};
	${(props) => props.hasAdornment && 'padding-right: 80px'};
	box-sizing: border-box;
	font-weight: 500;
	font-size: 12px;
	color: ${(props) => props.theme.colors.textPrimary};
	width: 100%;
`;

const Input = styled.input`
	${InputStyles}
	width: 100%;
	border: none;
	font-size: 16px;
	line-height: 20px;
	font-weight: 400;
	::placeholder,
	::-webkit-input-placeholder {
		color: #5e5e5e;
	}
	:-ms-input-placeholder {
		color: #5e5e5e;
	}
`;

const DateSection = styled(Box)`
	position: relative;
	padding: 2px 35px 2px 2px;
	width: 100%;
	border: 1px solid #e8e8e8;
	border-radius: 4px;
	min-height: 38px;
	display: flex;
	align-items: center;
`;

const InputWrapper = styled.div`
	width: 100%;
`;

const CalendarIcon = styled(ThemeIcon)`
	position: absolute;
	top: 9px;
	right: 0;
	cursor: pointer;
`;
const CalendarMobileIcon = styled(ThemeIcon)`
	position: absolute;
	top: 7px;
	right: 0;
	cursor: pointer;
`;

const FilterInput = (props) => {
	const { isMobile } = useStore();
	if (props.type === 'select') {
		return (
			<FormGroup>
				<BodyText variant="small" fontWeight="semiBold" m={0}>
					{props.label}
					{props.info && (
						<Tooltip title={props.info} placement="top">
							<Span aria-label={props.info}>
								<ThemeIcon src={infoIcon} />
							</Span>
						</Tooltip>
					)}
				</BodyText>
				<Select
					classNamePrefix="select"
					options={props.options}
					onChange={props.onChange}
					onKeyDown={props.onKeyDown}
					value={props.value}
				/>
			</FormGroup>
		);
	} else if (props.type === 'range') {
		return (
			<FormGroup>
				<BodyText variant="small" fontWeight="semiBold" m={0}>
					{props.label}
					{props.info && (
						<Tooltip title={props.info} placement="top">
							<Span aria-label={props.info}>
								<ThemeIcon src={infoIcon} />
							</Span>
						</Tooltip>
					)}
				</BodyText>
				<SliderWrapper>
					<CustomSlider
						value={props.value}
						onChange={props.onChange}
						valueLabelDisplay="auto"
						aria-labelledby="continuous-slider"
						min={props.min}
						max={props.max}
					/>
					<Row>
						<Col className="p-1">
							<BodyText variant="extraSmall" className="d-flex justify-content-start">
								From {props.min}
							</BodyText>
						</Col>
						<Col className="pt-1">
							<BodyText variant="extraSmall" className="d-flex justify-content-end">
								To {props.max}
							</BodyText>
						</Col>
					</Row>
				</SliderWrapper>
			</FormGroup>
		);
	} else if (props.type === 'calendar') {
		return (
			<DatePickerWrapper>
				<BodyText variant="small" fontWeight="semiBold" m={0}>
					{props.label}
					{props.info && (
						<Tooltip title={props.info} placement="top">
							<Span aria-label={props.info}>
								<ThemeIcon src={infoIcon} />
							</Span>
						</Tooltip>
					)}
				</BodyText>
				<DateSection>
					<InputWrapper>
						<Input placeholder={props.placeholder} value={props.value} onFocus={props.onFocus} />
						{isMobile ? (
							<CalendarMobileIcon variant="normal" src={calendarIcon} />
						) : (
							<CalendarIcon variant="big" src={calendarIcon} />
						)}
					</InputWrapper>
				</DateSection>
			</DatePickerWrapper>
		);
	} else if (props.type === 'switch') {
		return (
			<FormGroup className="d-flex flex-row w-100 justify-content-between align-items-center">
				<BodyText variant="small" fontWeight="semiBold" m={0}>
					{props.label}
					{props.info && (
						<Tooltip title={props.info} placement="top">
							<Span aria-label={props.info}>
								<ThemeIcon src={infoIcon} />
							</Span>
						</Tooltip>
					)}
				</BodyText>
				<CustomSwitch checked={props.checked} onChange={props.onChange} />
			</FormGroup>
		);
	}
};

export default FilterInput;
