import React from 'react';
import styled from 'styled-components';
import nextIcon from '../../assets/icons/next.svg';
import prevIcon from '../../assets/icons/prev.svg';
import { usePagination, DOTS } from './../../hooks/usePagination';

const Icon = styled.img`
	width: 8px;
`;

const ArrowButtonNext = styled.button`
	margin-left: ${(props) => props.theme.spacing(7)};
	background: transparent;
	border: none;
`;

const ArrowButtonPrev = styled.button`
	margin-right: ${(props) => props.theme.spacing(7)};
	background: transparent;
	border: none;
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: ${(props) => props.theme.spacing(3)};
`;

const Button = styled.button`
	width: 45px;
	height: 45px;
	background: ${(props) =>
		props.active
			? 'linear-gradient(220.57deg, rgba(107, 230, 238, 0.15) -15.95%, rgba(64, 76, 189, 0.15) 107.46%)'
			: 'white'};
	box-shadow: 0px 4px 12px #dfecff;
	border-radius: 8px;
	padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(1.5)};
	color: #7246d0;
	font-weight: bold;
	font-size: 18px;
	line-height: 18px;
	border: none;
	margin-right: ${(props) => props.theme.spacing(1.2)};
`;

const Pagination = (props) => {
	const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange[paginationRange.length - 1];
	return (
		<Wrapper>
			<ArrowButtonPrev disabled={currentPage === 1} onClick={onPrevious}>
				<Icon src={prevIcon} />
			</ArrowButtonPrev>
			{paginationRange.map((pageNumber, index) => {
				if (pageNumber === DOTS) {
					return <Button>&#8230;</Button>;
				}
				return (
					<Button
						active={pageNumber === currentPage && true}
						onClick={() => onPageChange(pageNumber)}
						key={index}
					>
						{pageNumber}
					</Button>
				);
			})}
			<ArrowButtonNext disabled={currentPage === lastPage} onClick={onNext}>
				<Icon src={nextIcon} />
			</ArrowButtonNext>
		</Wrapper>
	);
};

export default Pagination;
