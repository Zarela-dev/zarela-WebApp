import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import nextIcon from '../../assets/icons/next.svg';
import prevIcon from '../../assets/icons/prev.svg';

const Icon = styled.img`
	width: 8px;
`;

const ArrowButtonNext = styled(Link)`
	margin-left: ${props => props.theme.spacing(7)};
`;

const ArrowButtonPrev = styled(Link)`
	margin-right: ${props => props.theme.spacing(7)};
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
    align-items: center;
	margin: ${props => props.theme.spacing(3)};
`;

const Button = styled.button`
	width: 45px;
	height: 45px;
  	background: ${props => props.active ? 'linear-gradient(220.57deg, rgba(107, 230, 238, 0.15) -15.95%, rgba(64, 76, 189, 0.15) 107.46%)' : 'white'};
	box-shadow: 0px 4px 12px #DFECFF;
	border-radius: 8px;
	padding: ${props => props.theme.spacing(1)} ${props => props.theme.spacing(1.5)};
	color: #4B7284;
	font-weight: bold;
	font-size: 18px;
	border: none;
	margin-right: ${props => props.theme.spacing(1.2)};
`;

const Pagination = () => {
	return null;
	return (
		<Wrapper>
			<ArrowButtonPrev to='/'>
				<Icon src={prevIcon} />
			</ArrowButtonPrev>
			<Button active>
				1
			</Button>
			<Button>
				2
			</Button>
			<Button>
				3
			</Button>
			<Button>
				...
			</Button>
			<ArrowButtonNext to='/'>
				<Icon src={nextIcon} />
			</ArrowButtonNext>
		</Wrapper>
	);
};

export default Pagination;
