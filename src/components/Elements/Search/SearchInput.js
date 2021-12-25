import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { Header as Heading, BodyText } from '../Typography';
import { ThemeIcon } from '../../Elements/Icon';
import { ThemeButton } from '../../Elements/Button';
import searchIcon from './../../../assets/icons/search.svg';
import searchClose from './../../../assets/icons/search-clear-icon.svg';
import filterClose from './../../../assets/icons/filter-close.svg';
import close from './../../../assets/icons/close-purple.svg';
import { Box } from 'rebass/styled-components';
import { space, layout, color, compose, fontWeight } from 'styled-system';
import filterIcon from './../../../assets/icons/filter.svg';
import { Modal, ModalHeader, ModalBody, FormGroup, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modalStyle.css';
import Select from 'react-select';
import Slider from '@material-ui/core/Slider';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import DatePickerField from './DatePickerField';
import Switch from '@mui/material/Switch';
import BigNumber from 'bignumber.js';

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
const InputWrapper = styled.div`
	width: 100%;
`;

const CustomModalHeader = styled(ModalHeader)`
	flex-direction: row-reverse;
`;

const Input = styled.input`
	${InputStyles}
	width: 100%;
	border: none;
`;

const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
`;

const Label = styled.label`
	display: flex;
	width: 100%;
	justify-content: space-between;
	margin-bottom: ${(props) => props.theme.spacing(1.5)};
`;

const SearchIcon = styled(ThemeIcon)`
	position: absolute;
	top: 10px;
	left: 8px;
	cursor: pointer;
`;

const SearchClear = styled(ThemeIcon)`
	position: absolute;
	top: 10px;
	right: 8px;
	cursor: pointer;
`;

const SearchSection = styled(Box)`
	position: relative;
	padding: 2px 35px;
	width: 100%;
	border: 1px solid #e8e8e8;
	border-radius: 4px;
	min-height: 48px;
	display: flex;
	align-items: center;
`;

const FilterWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;

const FilterButton = styled(Box)(compose(space, layout, color, fontWeight), {
	border: '1px solid #838383',
	borderRadius: '25px',
	width: '162px',
	height: '40px',
	display: 'flex',
	justifyContent: 'start',
	alignItems: 'center',
	padding: '0 10px',
	cursor: 'pointer',
	fontSize: '14px',
	lineHeight: '19.5px',
	fontWeight: '500',
});

const FilterElement = styled(FilterButton)`
	width: fit-content;
`;

const HeaderInner = styled.div`
	display: flex;
	width: 300px;
	justify-content: space-between;
	align-items: center;
`;

const DateHeader = styled.div`
	display: flex;
	width: 177px;
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

function timeConverter(UNIX_timestamp) {
	var a = new Date(UNIX_timestamp);
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var time = date + ' ' + month + ' ' + year;
	return time;
}

const SearchInput = forwardRef(({ requests, applySearch, searchResults }, ref) => {
	const [modalShow, setModalShow] = useState(false);
	const [datePickerModalShow, setDatePickerModalShow] = useState(false);
	const [selectedTotalBiobitOption, setSelectedTotalBiobitOption] = useState({ value: 'Default', label: 'Default' });

	const maxPrice = Object.values(requests).sort((a, b) => {
		const aPrice = new BigNumber(a.totalTokenPay);
		const bPrice = new BigNumber(b.totalTokenPay);
		return bPrice.comparedTo(aPrice);
	})[0]?.totalTokenPay;

	const [range, setRange] = useState([0, 100]);

	useEffect(() => {
		if (maxPrice) {
			setRange([0, maxPrice]);
		}
	}, [maxPrice]);

	const [selectedDateRange, setSelectedDateRange] = useState([
		{
			startDate: new Date(),
			endDate: null,
			key: 'selection',
		},
	]);

	useEffect(() => {
		if (selectedDateRange[0].endDate) {
			const startDate = Date.parse(selectedDateRange[0].startDate) / 1000;
			const endDate = Date.parse(selectedDateRange[0].endDate) / 1000;
			console.log('selectedDateRange', startDate, endDate);
			applySearch.dateFilter([startDate, endDate]);
		}
	}, [selectedDateRange]);

	const totalBiobitSelectOptions = [
		{ value: 'Default', label: 'Default' },
		{ value: 'LowToHigh', label: 'Low to High' },
		{ value: 'HighToLow', label: 'High to Low' },
	];


	const handleChangeRange = (event, newValue) => {
		setRange(newValue);
		applySearch.bbitFilter(range);
	};

	const toggleModals = () => {
		setModalShow(!modalShow);
		setDatePickerModalShow(!datePickerModalShow);
	};

	return (
		<Wrapper hasTopMargin={true}>
			<Label>
				<Heading as="h4" variant="heading4">
					Search
				</Heading>
			</Label>
			<SearchSection>
				<InputWrapper>
					<SearchIcon variant="big" src={searchIcon} />
					<Input
						ref={ref}
						type="text"
						placeholder="Start typing ..."
						value={searchResults.params.q}
						onChange={(e) => applySearch.q(e.target.value)}
					/>
					{searchResults.params.q !== '' && (
						<SearchClear variant="big" src={searchClose} onClick={() => applySearch.q('')} />
					)}
				</InputWrapper>
			</SearchSection>

			<FilterWrapper>
				<FilterButton as="div" color="filterText" mt={3} mr={2} onClick={() => setModalShow(!modalShow)}>
					<ThemeIcon variant="big" src={filterIcon} />
					Filters and Sort
				</FilterButton>

				{selectedTotalBiobitOption.value !== 'Default' && (
					<FilterElement as="div" color="filterText" mt={3} mr={2}>
						BBIT {selectedTotalBiobitOption.label}
						<ThemeIcon
							variant="big"
							mr={0}
							ml={2}
							src={filterClose}
							onClick={() => {
								setSelectedTotalBiobitOption({ value: 'Default', label: 'Default' });
								applySearch.order('requestID', 'desc');
							}}
						/>
					</FilterElement>
				)}

				{(range[0] !== 0 || range[1] !== maxPrice) && (
					<FilterElement as="div" color="filterText" mt={3} mr={2}>
						BBIT {range[0]} - {range[1]}
						<ThemeIcon
							variant="big"
							mr={0}
							ml={2}
							src={filterClose}
							onClick={() => {
								setRange([0, maxPrice]);
								applySearch.bbitFilter([0, maxPrice]);
							}}
						/>
					</FilterElement>
				)}

				{!isNaN(Date.parse(selectedDateRange[0].endDate)) && (
					<FilterElement as="div" color="filterText" mt={3} mr={2}>
						{Date.parse(selectedDateRange[0].endDate) === Date.parse(selectedDateRange[0].startDate)
							? timeConverter(Date.parse(selectedDateRange[0].startDate))
							: `${timeConverter(Date.parse(selectedDateRange[0].startDate))}
                            -
                            ${timeConverter(Date.parse(selectedDateRange[0].endDate))}`}
						<ThemeIcon
							variant="big"
							mr={0}
							ml={2}
							src={filterClose}
							onClick={() => {
								setSelectedDateRange([
									{
										startDate: new Date(),
										endDate: null,
										key: 'selection',
									},
								]);
								applySearch.dateFilter([]);
							}}
						/>
					</FilterElement>
				)}

				{searchResults.params.mostConfirmed && (
					<FilterElement as="div" color="filterText" mt={3} mr={2}>
						Most Confirmed
						<ThemeIcon
							variant="big"
							mr={0}
							ml={2}
							src={filterClose}
							onClick={(e) => applySearch.mostConfirmed(false)}
						/>
					</FilterElement>
				)}
				{searchResults.params.nearFinish && (
					<FilterElement as="div" color="filterText" mt={3} mr={2}>
						Near Finish
						<ThemeIcon variant="big" mr={0} ml={2} src={filterClose} onClick={() => applySearch.nearFinish(false)} />
					</FilterElement>
				)}

				{searchResults.params.fulfilled && (
					<FilterElement as="div" color="filterText" mt={3} ml={2}>
						Fulfiled
						<ThemeIcon variant="big" mr={0} ml={2} src={filterClose} onClick={(e) => applySearch.fulfilled(false)} />
					</FilterElement>
				)}
			</FilterWrapper>

			<Modal isOpen={modalShow} toggle={() => setModalShow(false)} backdropClassName="custom-backdrop">
				<CustomModalHeader
					close={
						<CloseIconWrapper>
							<ThemeIcon src={close} variant="normal" mr={0} onClick={() => setModalShow(false)} />
						</CloseIconWrapper>
					}
				>
					<HeaderInner>
						<BodyText variant="big" fontWeight="semiBold" m={0}>
							Filters and Sort
						</BodyText>
						<BodyText variant="extraSmall" m={0} className="cursor-pointer">
							Clear All
						</BodyText>
					</HeaderInner>
				</CustomModalHeader>
				<ModalBody>
					<FormGroup>
						<BodyText variant="small" fontWeight="semiBold" m={0}>
							Total BBIT
						</BodyText>
						<Select
							classNamePrefix="select"
							options={totalBiobitSelectOptions}
							onChange={(e) => {
								if (e.value === 'HighToLow') {
									applySearch.order('bbit', 'desc');
								} else if (e.value === 'LowToHigh') {
									applySearch.order('bbit', 'asc');
								} else if (e.value === 'Default') {
									applySearch.order('requestID', 'desc');
								}
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
							<CustomSlider
								value={range}
								onChange={handleChangeRange}
								valueLabelDisplay="auto"
								aria-labelledby="continuous-slider"
								min={0}
								max={maxPrice}
							/>
							<Row>
								<Col className="p-1">
									<BodyText variant="extraSmall" className="d-flex justify-content-start">
										From 0
									</BodyText>
								</Col>
								<Col className="pt-1">
									<BodyText variant="extraSmall" className="d-flex justify-content-end">
										To {maxPrice}
									</BodyText>
								</Col>
							</Row>
						</SliderWrapper>
					</FormGroup>

					<DatePickerField
						{...{
							toggleModals,
							setSelectedDateRange,
							isMobile: true,
						}}
						value={
							Date.parse(selectedDateRange[0].endDate) === Date.parse(selectedDateRange[0].startDate)
								? timeConverter(Date.parse(selectedDateRange[0].startDate))
								: `${timeConverter(Date.parse(selectedDateRange[0].startDate))} - ${timeConverter(
										Date.parse(selectedDateRange[0].endDate)
								  )}`
						}
					/>

					<FormGroup className="d-flex flex-row w-100 justify-content-between align-items-center">
						<BodyText variant="small" fontWeight="semiBold" m={0}>
							Near finish
						</BodyText>
						<CustomSwitch
							checked={searchResults.params.nearFinish}
							onChange={(e) => applySearch.nearFinish(e.target.checked)}
						/>
					</FormGroup>

					<FormGroup className="d-flex flex-row w-100 justify-content-between align-items-center">
						<BodyText variant="small" fontWeight="semiBold" m={0}>
							Most Confirmed
						</BodyText>
						<CustomSwitch
							checked={searchResults.params.mostConfirmed}
							onChange={(e) => applySearch.mostConfirmed(e.target.checked)}
						/>
					</FormGroup>

					<FormGroup className="d-flex flex-row w-100 justify-content-between align-items-center">
						<BodyText variant="small" fontWeight="semiBold" m={0}>
							Fulfiled
						</BodyText>
						<CustomSwitch
							checked={searchResults.params.fulfilled}
							onChange={(e) => applySearch.fulfilled(e.target.checked)}
						/>
					</FormGroup>

					<ThemeButton variant="block" size="block" onClick={() => setModalShow(false)}>
						Submit
					</ThemeButton>
				</ModalBody>
			</Modal>

			<CalendarModal isOpen={datePickerModalShow} toggle={toggleModals} backdropClassName="custom-backdrop">
				<CustomModalHeader
					close={
						<CloseIconWrapper>
							<ThemeIcon src={close} variant="normal" mr={0} onClick={toggleModals} />
						</CloseIconWrapper>
					}
				>
					<DateHeader>
						<BodyText variant="big" fontWeight="semiBold" m={0}>
							Calendar
						</BodyText>
					</DateHeader>
				</CustomModalHeader>

				<ModalBody>
					<DateRange
						editableDateInputs={true}
						onChange={(item) => setSelectedDateRange([item.selection])}
						moveRangeOnFirstSelection={false}
						ranges={selectedDateRange}
						width={100}
						className="custom-calendar"
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
									setModalShow(!modalShow);
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

export default SearchInput;
