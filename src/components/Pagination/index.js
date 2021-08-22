import React from 'react';
import styled from 'styled-components';
import nextIcon from '../../assets/icons/next.svg';
import prevIcon from '../../assets/icons/prev.svg';
import { usePagination, DOTS } from './../../hooks/usePagination';

const Icon = styled.img`
	width: ${(props) => (props.isMobile ? '7px' : '8px')};
`;

const ArrowButtonNext = styled.button`
	margin-left: ${(props) => (props.isMobile ? props.theme.spacing(0.8) : props.theme.spacing(5))};
	background: transparent;
	border: none;
`;

const ArrowButtonPrev = styled.button`
	margin-right: ${(props) => (props.isMobile ? props.theme.spacing(2) : props.theme.spacing(6))};
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
	width: ${(props) => (props.isMobile ? '30px' : '45px')};
	height: ${(props) => (props.isMobile ? '30px' : '45px')};
	background: ${(props) =>
		props.active
			? 'linear-gradient(220.57deg, rgba(107, 230, 238, 0.15) -15.95%, rgba(64, 76, 189, 0.15) 107.46%)'
			: 'white'};
	box-shadow: 0px 4px 12px #dfecff;
	border-radius: 8px;
	padding: ${(props) =>
		props.isMobile
			? `${props.theme.spacing(1)} ${props.theme.spacing(1.1)}`
			: `${props.theme.spacing(1)} ${props.theme.spacing(1.5)}`};
	color: #7246d0;
	font-weight: bold;
	font-size: ${(props) => (props.isMobile ? '14px' : '18px')};
	line-height: ${(props) => (props.isMobile ? '10px' : '18px')};
	border: none;
	margin-right: ${(props) => props.theme.spacing(1.2)};
`;

const scrollToTop = () => {
	const c = document.documentElement.scrollTop;
	if (c > 0) {
		window.requestAnimationFrame(scrollToTop);
		window.scrollTo(0, c - c / 5);
	}
};

const Pagination = (props) => {
	const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

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
			<ArrowButtonPrev
				disabled={currentPage === 1}
				onClick={(e) => {
					scrollToTop();
					onPrevious(e);
				}}
				isMobile={props.isMobile}
			>
				<Icon isMobile={props.isMobile} src={prevIcon} />
			</ArrowButtonPrev>
			{paginationRange.map((pageNumber, index) => {
				if (pageNumber === DOTS) {
					return <Button>&#8230;</Button>;
				}
				return (
					<Button
						active={pageNumber === currentPage && true}
						onClick={(e) => {
							scrollToTop();
							onPageChange(pageNumber);
						}}
						key={index}
						isMobile={props.isMobile}
					>
						{pageNumber}
					</Button>
				);
			})}
			<ArrowButtonNext
				disabled={currentPage === lastPage}
				onClick={(e) => {
					scrollToTop();
					onNext(e);
				}}
				isMobile={props.isMobile}
			>
				<Icon isMobile={props.isMobile} src={nextIcon} />
			</ArrowButtonNext>
		</Wrapper>
	);
};

export default Pagination;
