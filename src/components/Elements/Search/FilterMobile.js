import React, { forwardRef, useState, useContext, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { BodyText } from '../Typography';
import { ThemeIcon } from '../../Elements/Icon';
import { ThemeButton } from '../../Elements/Button';
import close from './../../../assets/icons/close-purple.svg';
import filterIcon from './../../../assets/icons/filter-white.svg';
import { Modal, ModalHeader, ModalBody, FormGroup, Row, Col } from 'reactstrap';
import { space, layout, color, compose, fontWeight } from 'styled-system';
import searchIcon from './../../../assets/icons/search.svg';
import searchClose from './../../../assets/icons/search-clear-icon.svg';
import backIcon from './../../../assets/icons/back.svg';
import filterClose from './../../../assets/icons/filter-close.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box } from 'rebass/styled-components';
import './modalStyle.css';
import Select from 'react-select';
import Slider from '@material-ui/core/Slider';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import DatePickerField from './DatePickerField';
import { mainContext } from '../../../state';
import { actionTypes } from '../../../state';
import Switch from '@mui/material/Switch';
import BigNumber from 'bignumber.js';

const MobileSearchAndFilterWrapper = styled.div`
	position: fixed;
	width: 48px;
	height: 48px;
	background: #422468;
	right: 18px;
	bottom: 55px;
	border-radius: 24px;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 99;
	cursor: pointer;
`;
const SearchIcon = styled(ThemeIcon)`
	position: absolute;
	top: 10px;
	left: 8px;
	cursor: pointer;
`;
const SearchClear = styled(ThemeIcon)`
	position: absolute;
	top: 12px;
	right: 8px;
	cursor: pointer;
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

const FilterIcon = styled(ThemeIcon)`
	width: fit-content;
	display: flex;
	align-self: center;
	margin: 0;
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

const HeaderInner = styled.div`
	display: flex;
	flex-direction: row-reverse;
	width: 200px;
	justify-content: space-between;
	align-items: center;
`;

const DateHeader = styled.div`
	display: flex;
	width: 52vw;
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
	width: 95%;
`;

const CustomModalHeader = styled(ModalHeader)`
	flex-direction: row-reverse;
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

const FilterMobile = forwardRef(({ requests, applySearch, searchResults }, ref) => {
	const { appState, dispatch } = useContext(mainContext);
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
			startDate: null,
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
			<MobileSearchAndFilterWrapper onClick={() => setModalShow(true)}>
				<FilterIcon variant="normal" src={filterIcon} />
			</MobileSearchAndFilterWrapper>

			<Modal
				isOpen={appState.isMobileSearchModalShow}
				backdropClassName="custom-backdrop"
				className="search-modal search-modal-mobile"
			>
				<CustomModalHeader
					close={
						<CloseIconWrapper>
							<ThemeIcon
								src={close}
								variant="normal"
								mr={0}
								onClick={() =>
									dispatch({
										type: actionTypes.SET_MOBILE_SEARCH_MODAL_SHOW,
										payload: false,
									})
								}
							/>
						</CloseIconWrapper>
					}
				>
					<DateHeader>
						<BodyText variant="normal" fontWeight="semiBold" m={0}>
							Search
						</BodyText>
					</DateHeader>
				</CustomModalHeader>
				<ModalBody>
					<SearchSection>
						<InputWrapper>
							<SearchIcon variant="normal" src={searchIcon} />
							<Input
								ref={ref}
								type="text"
								placeholder="Start typing ..."
								value={searchResults.params.q}
								onChange={(e) => {
									applySearch.q(e.target.value);
								}}
							/>
							{searchResults.params.q !== '' && (
								<SearchClear variant="normal" src={searchClose} onClick={() => applySearch.q('')} />
							)}
						</InputWrapper>
					</SearchSection>

					<FilterWrapper>
						{selectedTotalBiobitOption.value !== 'Default' && (
							<FilterElement as="div" color="filterText" mt={3} mr={2}>
								BBIT {selectedTotalBiobitOption.label}
								<ThemeIcon
									variant="normal"
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
									variant="normal"
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
									variant="normal"
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
									variant="normal"
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
								<ThemeIcon
									variant="normal"
									mr={0}
									ml={2}
									src={filterClose}
									onClick={() => applySearch.nearFinish(false)}
								/>
							</FilterElement>
						)}

						{searchResults.params.fulfilled && (
							<FilterElement as="div" color="filterText" mt={3} ml={2}>
								Fulfiled
								<ThemeIcon
									variant="normal"
									mr={0}
									ml={2}
									src={filterClose}
									onClick={(e) => applySearch.fulfilled(false)}
								/>
							</FilterElement>
						)}
					</FilterWrapper>
				</ModalBody>
			</Modal>

			<Modal
				isOpen={modalShow}
				toggle={() => setModalShow(false)}
				backdropClassName="custom-backdrop "
				className="search-modal search-modal-mobile"
			>
				<CustomModalHeader
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
						<BodyText variant="normal" fontWeight="semiBold" m={0}>
							Filters and Sort
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
							selectedDateRange[0].startDate !== null && selectedDateRange[0].endDate !== null
								? Date.parse(selectedDateRange[0].endDate) === Date.parse(selectedDateRange[0].startDate)
									? timeConverter(Date.parse(selectedDateRange[0].startDate))
									: `${timeConverter(Date.parse(selectedDateRange[0].startDate))} - ${timeConverter(
											Date.parse(selectedDateRange[0].endDate)
									  )}`
								: ''
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
							<ThemeIcon src={backIcon} variant="normal" mr={0} onClick={toggleModals} />
						</CloseIconWrapper>
					}
				>
					<DateHeader>
						<BodyText variant="normal" fontWeight="semiBold" m={0}>
							Calendar
						</BodyText>
					</DateHeader>
				</CustomModalHeader>

				<ModalBody>
					<div className="customDatePickerWidth">
						<DateRange
							editableDateInputs={true}
							onChange={(item) => setSelectedDateRange([item.selection])}
							moveRangeOnFirstSelection={false}
							ranges={selectedDateRange}
							width={100}
							className="custom-calendar"
						/>
					</div>

					<Row class="d-flex align-items-center justify-content-center">
						<Col className="pl-2 d-flex align-items-center">
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
