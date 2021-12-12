import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { Header as Heading, BodyText } from '../Typography';
import { ThemeIcon } from '../../Elements/Icon';
import searchIcon from './../../../assets/icons/search.svg';
import searchClose from './../../../assets/icons/search-clear-icon.svg';
import filterClose from './../../../assets/icons/filter-close.svg';
import close from './../../../assets/icons/close-purple.svg';
import { Box } from 'rebass/styled-components';
import { space, layout, color, compose, fontWeight } from 'styled-system';
import filterIcon from './../../../assets/icons/filter.svg';
import { Modal, ModalHeader, ModalBody, Row, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modalStyle.css';
import Select from 'react-select';
import Slider from '@material-ui/core/Slider';

const InputStyles = css`
	font-family: Krub;
	background: ${(props) => props.theme.colors.bgWhite};
	border: 1px solid rgba(144, 144, 144, 0.3);
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

const FilterWrapper = styled.div`
	width: 100%;
	display: flex;
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
const CloseIconWrapper = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SearchInput = forwardRef(({ label, ...rest }, ref) => {
	const [modalShow, setModalShow] = useState(false);
	const [selectedTotalBiobitOption, setSelectedTotalBiobitOption] = useState({ value: 'All', label: 'All' });
	const [selectedNearFinishOption, setSelectedNearFinishOption] = useState({ value: 'All', label: 'All' });
	const [selectedFulfilledOption, setSelectedFulfilledOption] = useState({ value: 'All', label: 'All' });
	const [range, setRange] = useState([0, 0]);

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

	const handleChangeRange = (event, newValue) => {
		setRange(newValue);
	};

	return (
		<Wrapper hasTopMargin={true}>
			<Label>
				<Heading as="h4" variant="heading4">
					{label}
				</Heading>
			</Label>
			<SearchSection>
				<InputWrapper>
					<SearchIcon variant="big" src={searchIcon} />
					<Input ref={ref} {...rest} placeholder="Start typing ..." />
					<SearchClear variant="big" src={searchClose} />
				</InputWrapper>
			</SearchSection>

			<FilterWrapper>
				<FilterButton as="div" color="filterText" mt={3} onClick={() => setModalShow(!modalShow)}>
					<ThemeIcon variant="big" src={filterIcon} />
					Filters and Sort
				</FilterButton>

				{selectedTotalBiobitOption.value !== 'All' && (
					<FilterElement as="div" color="filterText" mt={3} ml={2} onClick={() => setModalShow(!modalShow)}>
						BBIT {selectedTotalBiobitOption.label}
						<ThemeIcon variant="big" mr={0} ml={2} src={filterClose} />
					</FilterElement>
				)}

				{(range[0] !== 0 || range[1] !== 0) && (
					<FilterElement as="div" color="filterText" mt={3} ml={2} onClick={() => setModalShow(!modalShow)}>
						BBIT {range[0]} - {range[1]}
						<ThemeIcon variant="big" mr={0} ml={2} src={filterClose} />
					</FilterElement>
				)}

				{selectedFulfilledOption.value !== 'All' && (
					<FilterElement as="div" color="filterText" mt={3} ml={2} onClick={() => setModalShow(!modalShow)}>
						{selectedFulfilledOption.value}
						<ThemeIcon variant="big" mr={0} ml={2} src={filterClose} />
					</FilterElement>
				)}
			</FilterWrapper>

			<Modal isOpen={modalShow} toggle={() => setModalShow(false)} backdropClassName="custom-backdrop">
				<ModalHeader
					close={
						<CloseIconWrapper>
							<ThemeIcon src={close} variant="normal" mr={0} onClick={() => setModalShow(false)} />
						</CloseIconWrapper>
					}
				>
					<HeaderInner>
						<BodyText variant="extraSmall" m={0}>
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
						<Slider
							value={range}
							onChange={handleChangeRange}
							valueLabelDisplay="auto"
							aria-labelledby="continuous-slider"
						/>
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
				</ModalBody>
			</Modal>
		</Wrapper>
	);
});

export default SearchInput;
