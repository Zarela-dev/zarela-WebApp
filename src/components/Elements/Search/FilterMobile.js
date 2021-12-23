import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { BodyText } from '../Typography';
import { ThemeIcon } from '../../Elements/Icon';
import { ThemeButton } from '../../Elements/Button';
import close from './../../../assets/icons/close-purple.svg';
import filterIcon from './../../../assets/icons/filter-white.svg';
import { Modal, ModalHeader, ModalBody, FormGroup, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modalStyle.css';
import Select from 'react-select';
import Slider from '@material-ui/core/Slider';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import DatePickerField from './DatePickerField';

const MobileSearchAndFilterWrapper = styled.div`
	position: fixed;
	width: 48px;
	height: 48px;
	background: #422468;
	right: 18px;
	bottom: 65px;
	border-radius: 24px;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 99
	cursor: pointer;
`;

const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
`;

const FilterIcon = styled(ThemeIcon)`
	width: fit-content;
	display: flex;
	align-self: center;
  margin: 0;
`;

const HeaderInner = styled.div`
	display: flex;
	width: 200px;
	justify-content: space-between;
	align-items: center;
`;

const DateHeader = styled.div`
	display: flex;
	width: 200px;
	justify-content: space-between;
	align-items: center;
`;
const CloseIconWrapper = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const SliderWrapper = styled.div`
	padding: 0 10px;
`;

const CalendarModal = styled(Modal)`
	width: fit-content;
`;

const FilterMobile = forwardRef(({ label, ...rest }, ref) => {
	const [searchValue, setSearchValue] = useState('');
	const [modalShow, setModalShow] = useState(false);
	const [datePickerModalShow, setDatePickerModalShow] = useState(false);
	const [selectedTotalBiobitOption, setSelectedTotalBiobitOption] = useState({ value: 'All', label: 'All' });
	const [selectedNearFinishOption, setSelectedNearFinishOption] = useState({ value: 'All', label: 'All' });
	const [selectedFulfilledOption, setSelectedFulfilledOption] = useState({ value: 'All', label: 'All' });
	const [selectedTrustableOption, setSelectedTrustableOption] = useState({ value: 'All', label: 'All' });
	const [range, setRange] = useState([0, 0]);
	const [selectedDateRange, setSelectedDateRange] = useState([
		{
			startDate: new Date(),
			endDate: null,
			key: 'selection',
		},
	]);

	const totalBiobitSelectOptions = [
		{ value: 'All', label: 'All' },
		{ value: 'LowToHigh', label: 'Low to High' },
		{ value: 'HighToLow', label: 'High to Low' },
	];

	const nearFinishOptions = [
		{ value: 'All', label: 'All' },
		{ value: 'LowToHigh', label: 'Low to High' },
		{ value: 'HighToLow', label: 'High to Low' },
	];

	const fulfilledOptions = [
		{ value: 'All', label: 'All' },
		{ value: 'Not Fulfiled', label: 'Not Fulfilled' },
		{ value: 'Fulfiled', label: 'Fulfiled' },
	];

	const trustableOptions = [
		{ value: 'All', label: 'All' },
		{ value: 'Not Fulfiled', label: 'Not Fulfilled' },
		{ value: 'Fulfiled', label: 'Fulfiled' },
	];

	const handleChangeRange = (event, newValue) => {
		setRange(newValue);
	};

	const toggleModals = () => {
		setModalShow(!modalShow);
		setDatePickerModalShow(!datePickerModalShow);
	};

	return (
		<Wrapper hasTopMargin={true}>
      <MobileSearchAndFilterWrapper onClick={() => setModalShow(true)}>
			<FilterIcon variant="normal" src={filterIcon} />
      </MobileSearchAndFilterWrapper>

			<Modal isOpen={modalShow} toggle={() => setModalShow(false)} backdropClassName="custom-backdrop">
				<ModalHeader
					close={
						<CloseIconWrapper>
							<ThemeIcon src={close} variant="normal" mr={0} onClick={() => setModalShow(false)} />
						</CloseIconWrapper>
					}
				>
					<HeaderInner>
						<BodyText variant="extraSmall" m={0} className="cursor-pointer">
							Clear All
						</BodyText>
						<BodyText variant="big" fontWeight="semiBold" m={0}>
							Filters and Sort
						</BodyText>
					</HeaderInner>
				</ModalHeader>
				<ModalBody>
					<FormGroup>
						<BodyText variant="small" fontWeight="semiBold" m={0}>
							Total BBIT
						</BodyText>
						<Select
							classNamePrefix="select"
							options={totalBiobitSelectOptions}
							onChange={(e) => {
								setSelectedTotalBiobitOption(e);
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									setSelectedTotalBiobitOption({ value: e.target.value, label: e.target.value });
								}
							}}
							value={selectedTotalBiobitOption}
						/>
					</FormGroup>

					<FormGroup>
						<BodyText variant="small" fontWeight="semiBold" m={0}>
							Total BBIT Range
						</BodyText>
						<SliderWrapper>
							<Slider
								value={range}
								onChange={handleChangeRange}
								valueLabelDisplay="auto"
								aria-labelledby="continuous-slider"
							/>
							<Row>
								<Col className="p-1">
									<BodyText variant="extraSmall" className="d-flex justify-content-start">
										From 0
									</BodyText>
								</Col>
								<Col className="pt-1">
									<BodyText variant="extraSmall" className="d-flex justify-content-end">
										To 1000
									</BodyText>
								</Col>
							</Row>
						</SliderWrapper>
					</FormGroup>

					<FormGroup>
						<BodyText variant="small" fontWeight="semiBold" m={0}>
							Near finish
						</BodyText>
						<Select
							classNamePrefix="select"
							options={nearFinishOptions}
							onChange={(e) => {
								setSelectedNearFinishOption(e);
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									setSelectedNearFinishOption({ value: e.target.value, label: e.target.value });
								}
							}}
							value={selectedNearFinishOption}
						/>
					</FormGroup>

					<FormGroup>
						<BodyText variant="small" fontWeight="semiBold" m={0}>
							Fulfilled
						</BodyText>
						<Select
							classNamePrefix="select"
							options={fulfilledOptions}
							onChange={(e) => {
								setSelectedFulfilledOption(e);
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									setSelectedFulfilledOption({ value: e.target.value, label: e.target.value });
								}
							}}
							value={selectedFulfilledOption}
						/>
					</FormGroup>

					<DatePickerField
						{...{
							toggleModals,
							setSelectedDateRange,
						}}
					/>

					<FormGroup>
						<BodyText variant="small" fontWeight="semiBold" m={0}>
							Trustable
						</BodyText>
						<Select
							classNamePrefix="select"
							options={trustableOptions}
							onChange={(e) => {
								setSelectedTrustableOption(e);
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									setSelectedTrustableOption({ value: e.target.value, label: e.target.value });
								}
							}}
							value={selectedTrustableOption}
						/>
					</FormGroup>

					<ThemeButton
						variant="block"
						size="block"
						onClick={() => {
							console.log('submit');
						}}
					>
						Submit
					</ThemeButton>
				</ModalBody>
			</Modal>

			<CalendarModal isOpen={datePickerModalShow} toggle={toggleModals} backdropClassName="custom-backdrop">
				<ModalHeader
					close={
						<CloseIconWrapper>
							<ThemeIcon src={close} variant="normal" mr={0} onClick={toggleModals} />
						</CloseIconWrapper>
					}
				>
					<DateHeader>
						<BodyText variant="extraSmall" m={0}></BodyText>
						<BodyText variant="big" fontWeight="semiBold" m={0}>
							Calendar
						</BodyText>
					</DateHeader>
				</ModalHeader>

				<ModalBody>
					<DateRange
						editableDateInputs={true}
						onChange={(item) => setSelectedDateRange([item.selection])}
						moveRangeOnFirstSelection={false}
						ranges={selectedDateRange}
						width={100}
					/>

					<Row class="d-flex align-items-center justify-content-center">
						<Col className="pl-2">
							<BodyText variant="small" className="text-underline cursor-pointer">
								Clear
							</BodyText>
						</Col>
						<Col className="d-flex justify-content-end">
							<ThemeButton
								variant="primary"
								size="normal"
								onClick={() => {
									console.log('submit');
								}}
							>
								submit
							</ThemeButton>
						</Col>
					</Row>
				</ModalBody>
			</CalendarModal>
		</Wrapper>
	);
});

export default FilterMobile;
