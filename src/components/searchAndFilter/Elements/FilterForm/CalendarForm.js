import React from 'react';
import { ThemeButton } from '../../../Elements/Button';
import { BodyText } from './../../../Elements/Typography';
import { Row, Col } from 'reactstrap';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const CalendarForm = (props) => {
	return (
		<>
			<div className="customDatePickerWidth">
				<DateRange
					editableDateInputs={true}
					onChange={props.onChange}
					moveRangeOnFirstSelection={false}
					ranges={props.ranges}
					width={100}
					className="custom-calendar"
				/>
			</div>

			<Row class="d-flex align-items-center justify-content-center">
				<Col className="pl-2 d-flex align-items-center">
					<BodyText variant="small" className="text-underline cursor-pointer" m={0} onClick={props.onClear}>
						Clear
					</BodyText>
				</Col>
				<Col className="d-flex justify-content-end">
					<ThemeButton variant="primary" size="normal" onClick={props.onSubmit}>
						submit
					</ThemeButton>
				</Col>
			</Row>
		</>
	);
};

export default CalendarForm;
