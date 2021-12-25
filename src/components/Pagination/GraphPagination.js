import React from 'react';
import styled from 'styled-components';
import nextIcon from '../../assets/icons/next.svg';
import prevIcon from '../../assets/icons/prev.svg';

const Icon = styled.img`
	width: ${(props) => (props.isMobile ? '7px' : '8px')};
`;

const ArrowButtonNext = styled.button`
	margin-left: ${(props) => (props.isMobile ? props.theme.spacing(0.8) : props.theme.spacing(5))};
	width: ${(props) => (props.isMobile ? '30px' : '45px')};
	height: ${(props) => (props.isMobile ? '30px' : '45px')};
	background: transparent;
	border: none;
	cursor: pointer;
	box-shadow: 0px 4px 12px #dfecff;
	border-radius: 8px;
	padding: ${(props) =>
		props.isMobile
			? `${props.theme.spacing(1)} ${props.theme.spacing(1.1)}`
			: `${props.theme.spacing(1)} ${props.theme.spacing(1.5)}`};
`;

const ArrowButtonPrev = styled.button`
	margin-right: ${(props) => (props.isMobile ? props.theme.spacing(2) : props.theme.spacing(6))};
	width: ${(props) => (props.isMobile ? '30px' : '45px')};
	height: ${(props) => (props.isMobile ? '30px' : '45px')};
	background: transparent;
	border: none;
	cursor: pointer;
	box-shadow: 0px 4px 12px #dfecff;
	border-radius: 8px;
	padding: ${(props) =>
		props.isMobile
			? `${props.theme.spacing(1)} ${props.theme.spacing(1.1)}`
			: `${props.theme.spacing(1)} ${props.theme.spacing(1.5)}`};
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: ${(props) => props.theme.spacing(3)};

	@media only screen and (max-width: ${(props) => props.theme.desktop_sm_breakpoint}) {
		width: 90%;
	}
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
	color: ${(props) => props.theme.colors.primary};
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

const GraphPagination = (props) => {
	const { currentPage, setCurrentPage, fetchMore, PER_PAGE } = props;

	const onNext = () => {
		fetchMore({
			variables: {
				skip: (currentPage + 1) * PER_PAGE,
			},
		});
		setCurrentPage(currentPage + 1);
	};

	const onPrevious = () => {
		fetchMore({
			variables: {
				skip: (currentPage - 1) * PER_PAGE,
			},
		});
		setCurrentPage(currentPage - 1);
	};

	return (
		<Wrapper>
			<ArrowButtonPrev
				disabled={currentPage === 0}
				onClick={(e) => {
					onPrevious(e);
				}}
				isMobile={props.isMobile}
			>
				<Icon isMobile={props.isMobile} src={prevIcon} />
			</ArrowButtonPrev>

			{currentPage > 0 && <Button>&#8230;</Button>}

			<Button isMobile={props.isMobile} disabled={true}>
				{currentPage + 1}
			</Button>

			<ArrowButtonNext
				onClick={(e) => {
					onNext(e);
				}}
				isMobile={props.isMobile}
			>
				<Icon isMobile={props.isMobile} src={nextIcon} />
			</ArrowButtonNext>
		</Wrapper>
	);
};

export default GraphPagination;
