import React  from 'react';
import styled, { css } from 'styled-components';
import { Box } from 'rebass/styled-components';
import { ThemeIcon } from './../Icon';
import { BodyText } from '../Typography';
import calendarIcon from './../../../assets/icons/calendar.svg';
import { Modal, ModalHeader, ModalBody, FormGroup, Row, Col } from 'reactstrap';

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
	top: 5px;
	right: 0;
	cursor: pointer;
`;

const DatePickerField = ({
	toggleModals,
}) => {
	return (
		<DatePickerWrapper>
			<BodyText variant="small" fontWeight="semiBold" m={0}>
				Date
			</BodyText>
			<DateSection>
				<InputWrapper>
					<Input placeholder="All" onFocus={toggleModals} />
					<CalendarIcon variant="big" src={calendarIcon} />
				</InputWrapper>
			</DateSection>
		</DatePickerWrapper>
	);
};

export default DatePickerField;
