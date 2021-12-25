import React, { forwardRef, useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { BodyText } from '../Typography';
import { ThemeIcon } from '../../Elements/Icon';
import { ThemeButton } from '../../Elements/Button';
import close from './../../../assets/icons/close-purple.svg';
import filterIcon from './../../../assets/icons/filter-white.svg';
import { Modal, ModalHeader, ModalBody, FormGroup, Row, Col } from 'reactstrap';
import searchIcon from './../../../assets/icons/search.svg';
import searchClose from './../../../assets/icons/search-clear-icon.svg';
import backIcon from './../../../assets/icons/back.svg';
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

const FilterMobile = forwardRef(({ label, ...rest }, ref) => {
	const { appState, dispatch } = useContext(mainContext);
	const [searchValue, setSearchValue] = useState('');
	const [modalShow, setModalShow] = useState(false);
	const [datePickerModalShow, setDatePickerModalShow] = useState(false);
	const [selectedTotalBiobitOption, setSelectedTotalBiobitOption] = useState({ value: 'All', label: 'All' });
	const [range, setRange] = useState([0, 0]);
	const [selectedDateRange, setSelectedDateRange] = useState([
		{
			startDate: new Date(),
			endDate: null,
			key: 'selection',
		},
	]);

	const [isNearFinish, setIsNearFinish] = useState(true);
	const [isMostConfirmed, setIsMostConfirmed] = useState(false);
	const [isFulfiled, setIsFulfiled] = useState(true);

	const totalBiobitSelectOptions = [
		{ value: 'All', label: 'All' },
		{ value: 'LowToHigh', label: 'Low to High' },
		{ value: 'HighToLow', label: 'High to Low' },
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

			<Modal isOpen={appState.isMobileSearchModalShow} backdropClassName="custom-backdrop" className="search-modal">
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
						<BodyText variant="extraSmall" m={0}></BodyText>
						<BodyText variant="big" fontWeight="semiBold" m={0}>
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
								{...rest}
								placeholder="Start typing ..."
								// value={searchValue}
								onChange={(e) => {
									setSearchValue(e.target.value);
									// const typeDelay = setTimeout(async () => {
									// 	console.log(searchValue);
									// 	await fetchMore({
									// 		variables: {
									// 			title: 'memory',
									// 		},
									// 	});
									// }, 1000);
									// return () => clearTimeout(typeDelay);
								}}
							/>
							{searchValue !== '' && (
								<SearchClear variant="normal" src={searchClose} onClick={() => setSearchValue('')} />
							)}
						</InputWrapper>
					</SearchSection>
				</ModalBody>
			</Modal>

			<Modal isOpen={modalShow} toggle={() => setModalShow(false)} backdropClassName="custom-backdrop">
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
						<BodyText variant="big" fontWeight="semiBold" m={0}>
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
								max={1000}
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

					<DatePickerField
						{...{
							toggleModals,
							setSelectedDateRange,
							isMobile: true,
						}}
					/>

					<FormGroup className="d-flex flex-row w-100 justify-content-between align-items-center">
						<BodyText variant="small" fontWeight="semiBold" m={0}>
							Near finish
						</BodyText>
						<CustomSwitch checked={isNearFinish} onChange={() => setIsNearFinish(!isNearFinish)} />
					</FormGroup>

					<FormGroup className="d-flex flex-row w-100 justify-content-between align-items-center">
						<BodyText variant="small" fontWeight="semiBold" m={0}>
							Most Confirmed
						</BodyText>
						<CustomSwitch checked={isMostConfirmed} onChange={() => setIsMostConfirmed(!isMostConfirmed)} />
					</FormGroup>

					<FormGroup className="d-flex flex-row w-100 justify-content-between align-items-center">
						<BodyText variant="small" fontWeight="semiBold" m={0}>
							Fulfiled
						</BodyText>
						<CustomSwitch checked={isFulfiled} onChange={() => setIsFulfiled(!isFulfiled)} />
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
				<CustomModalHeader
					close={
						<CloseIconWrapper>
							<ThemeIcon src={backIcon} variant="normal" mr={0} onClick={toggleModals} />
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
					<div className="customDatePickerWidth">
						<DateRange
							editableDateInputs={true}
							onChange={(item) => setSelectedDateRange([item.selection])}
							moveRangeOnFirstSelection={false}
							ranges={selectedDateRange}
							dateFormat="dd/MM/yyyy"
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
