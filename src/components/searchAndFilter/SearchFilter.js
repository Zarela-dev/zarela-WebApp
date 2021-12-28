import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { Header as Heading } from '../Elements/Typography';
import { ThemeIcon } from '../Elements/Icon';
import searchIcon from './../../assets/icons/search.svg';
import searchClose from './../../assets/icons/search-clear-icon.svg';
import FilterForm from './Elements/FilterForm';
import { Box } from 'rebass/styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modalStyle.css';
import BigNumber from 'bignumber.js';
import FilterLabelContainer from './Elements/FilterLabelContainer';
import FormModal from './Elements/Modals/DynamicModal';
import ModalHeader from './Elements/Modals/ModalHeader';
import CalendarForm from './Elements/FilterForm/CalendarForm';
import MobileModalTrigger from './Elements/Modals/MobileModalTrigger';
import { mainContext, actionTypes } from '../../state';

export const RequestCardWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	background: white;
	border: 1px solid #c4c4c4;
	border-radius: 8px;
	padding: ${({ theme }) => theme.space[5]}px;
	margin-bottom: ${({ theme }) => theme.space[4]}px;
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

const SearchFilter = ({ requests, applySearch, searchResults }) => {
	const { appState, dispatch } = useContext(mainContext);
	const [hasTransition, setHasTransition] = useState(true);
	const [modalShow, setModalShow] = useState(false);
	const [datePickerModalShow, setDatePickerModalShow] = useState(false);
	const [selectedTotalBiobitOption, setSelectedTotalBiobitOption] = useState({ value: 'Default', label: 'Default' });
	const [selectedFulfilledOption, setSelectedFulfilledOption] = useState({ value: 'All', label: 'All' });
	const [badgeCount, setBadgeCount] = useState(0);
	const [search, setSearch] = useState('');

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
		handleClose();
	}, [maxPrice]);

	const [selectedDateRange, setSelectedDateRange] = useState([
		{
			startDate: null,
			endDate: new Date(''),
			key: 'selection',
		},
	]);

	useEffect(() => {
		if (selectedDateRange[0].startDate) {
			const startDate = Date.parse(selectedDateRange[0].startDate) / 1000;
			const endDate = Date.parse(selectedDateRange[0].endDate) / 1000;
			applySearch.dateFilter([startDate, endDate]);
		}
	}, [selectedDateRange]);

	const totalBiobitSelectOptions = [
		{ value: 'Default', label: 'Default' },
		{ value: 'LowToHigh', label: 'Low to High' },
		{ value: 'HighToLow', label: 'High to Low' },
	];

	const fulfilledSelectOptions = [
		{ value: 'All', label: 'All' },
		{ value: 'Fulfilled', label: 'Fulfilled' },
		{ value: 'Avalible', label: 'Available' },
	];

	const handleChangeRange = (event, newValue) => {
		setRange(newValue);
	};

	const toggleModals = () => {
		setModalShow(!modalShow);
		setDatePickerModalShow(!datePickerModalShow);
		setHasTransition(false);
	};

	const FilterCounterBadge = () => {
		let count = 0;
		if (searchResults.params.q !== '') {
			count = count + 1;
		}
		if (selectedTotalBiobitOption.value !== 'Default') {
			count = count + 1;
		}
		if (range[0] !== 0 || range[1] !== maxPrice) {
			count = count + 1;
		}
		if (selectedDateRange[0].startDate) {
			count = count + 1;
		}
		if (selectedFulfilledOption.value !== 'All') {
			count = count + 1;
		}
		if (searchResults.params.nearFinish) {
			count = count + 1;
		}
		if (searchResults.params.mostConfirmed) {
			count = count + 1;
		}
		setBadgeCount(count);
	};

	useEffect(() => {
		FilterCounterBadge();
	}, [searchResults, maxPrice]);

	const handleClose = () => {
		setHasTransition(true);
		setSelectedTotalBiobitOption({ value: 'Default', label: 'Default' });
		setSelectedFulfilledOption({ value: 'All', label: 'All' });
		applySearch.clear();
		setRange([0, maxPrice]);
		setSelectedDateRange([
			{
				startDate: null,
				endDate: new Date(''),
				key: 'selection',
			},
		]);
		setModalShow(false);
	};

	const handleClearAll = () => {
		setHasTransition(true);
		FilterCounterBadge();
		setSelectedTotalBiobitOption({ value: 'Default', label: 'Default' });
		setSelectedFulfilledOption({ value: 'All', label: 'All' });
		applySearch.clear();
		setRange([0, maxPrice]);
		setSelectedDateRange([
			{
				startDate: null,
				endDate: new Date(''),
				key: 'selection',
			},
		]);
	};

	const handleCalendarClear = () => {
		setSelectedDateRange([
			{
				startDate: null,
				endDate: new Date(''),
				key: 'selection',
			},
		]);
		applySearch.dateFilter([]);
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => applySearch.q(search), 1000);
		return () => clearTimeout(timeoutId);
	}, [search]);

	useEffect(() => {
		const timeoutId = setTimeout(() => applySearch.bbitFilter(range), 1000);
		return () => clearTimeout(timeoutId);
	}, [range]);

	return (
		<>
			{appState.isMobile && <MobileModalTrigger onClick={() => setModalShow(true)} count={badgeCount} />}
			{!appState.isMobile && (
				<RequestCardWrapper>
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
									type="text"
									placeholder="Start typing ..."
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
								{searchResults.params.q !== '' && (
									<SearchClear
										variant="big"
										src={searchClose}
										onClick={() => {
											applySearch.q('');
											setSearch('');
										}}
									/>
								)}
							</InputWrapper>
						</SearchSection>

						<FilterLabelContainer
							{...{
								modalShow,
								setModalShow,
								selectedTotalBiobitOption,
								setSelectedTotalBiobitOption,
								selectedFulfilledOption,
								setSelectedFulfilledOption,
								applySearch,
								range,
								setRange,
								maxPrice,
								selectedDateRange,
								setSelectedDateRange,
								searchResults,
							}}
						/>
					</Wrapper>
				</RequestCardWrapper>
			)}

			{appState.isMobile && (
				<FormModal
					modalShow={appState.isMobileSearchModalShow}
					onClose={() => {
						dispatch({
							type: actionTypes.SET_MOBILE_SEARCH_MODAL_SHOW,
							payload: false,
						});
					}}
					type="form"
					className="search-modal search-modal-mobile"
					header={<ModalHeader title="Search" width="180px" />}
					body={
						<>
							<SearchSection>
								<InputWrapper>
									<SearchIcon variant="normal" src={searchIcon} />
									<Input
										type="text"
										placeholder="Start typing ..."
										value={search}
										onChange={(e) => setSearch(e.target.value)}
									/>
									{searchResults.params.q !== '' && (
										<SearchClear
											variant="normal"
											src={searchClose}
											onClick={() => {
												applySearch.q('');
												setSearch('');
											}}
										/>
									)}
								</InputWrapper>
							</SearchSection>
							<FilterLabelContainer
								{...{
									modalShow,
									setModalShow,
									selectedTotalBiobitOption,
									setSelectedTotalBiobitOption,
									selectedFulfilledOption,
									setSelectedFulfilledOption,
									applySearch,
									range,
									setRange,
									maxPrice,
									selectedDateRange,
									setSelectedDateRange,
									searchResults,
								}}
							/>
						</>
					}
				/>
			)}
			{/* filter form modal */}
			<FormModal
				modalShow={modalShow}
				toggle={() => setModalShow(false)}
				onClose={handleClose}
				hasTransition={hasTransition}
				type="form"
				className={appState.isMobile && 'search-modal search-modal-mobile'}
				header={
					<ModalHeader
						title="Filters and Sort"
						clearText="Clear All"
						justify="space-between"
						width={appState.isMobile ? '210px' : '300px'}
						onClear={handleClearAll}
					/>
				}
				body={
					<FilterForm
						{...{
							totalBiobitSelectOptions,
							fulfilledSelectOptions,
							selectedFulfilledOption,
							setSelectedFulfilledOption,
							selectedTotalBiobitOption,
							setSelectedTotalBiobitOption,
							range,
							maxPrice,
							handleChangeRange,
							selectedDateRange,
							toggleModals,
							setModalShow,
							applySearch,
							searchResults,
						}}
					/>
				}
			/>
			{/* calender modal */}
			<FormModal
				modalShow={datePickerModalShow}
				hasTransition={hasTransition}
				fade={false}
				toggle={handleCalendarClear}
				onClose={() => {
					handleCalendarClear();
					toggleModals();
				}}
				type="calendar"
				width={appState.isMobile ? '100%' : 'fit-content'}
				className={appState.isMobile && 'search-modal search-modal-mobile'}
				header={<ModalHeader title="Calendar" width="180px" />}
				body={
					<CalendarForm
						onChange={(item) => setSelectedDateRange([item.selection])}
						ranges={selectedDateRange}
						onClear={handleCalendarClear}
						onSubmit={toggleModals}
					/>
				}
			/>
		</>
	);
};

export default SearchFilter;
