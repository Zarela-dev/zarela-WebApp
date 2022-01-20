import React from 'react';
import styled from 'styled-components';
import { ThemeIcon } from '../../../Elements/Icon';
import filterIcon from './../../../../assets/icons/filter-white.svg';
import { Badge } from './../../../Elements/Badge';

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
	z-index: 59;
	cursor: pointer;
`;

const FilterIcon = styled(ThemeIcon)`
	width: fit-content;
	display: flex;
	align-self: center;
	margin: 0;
`;

const BadgeWrapper = styled(Badge)`
	position: absolute;
	background: #e63e99;
	width: 14px;
	height: 14px;
	top: -10px;
	left: -1px;
`;

const MobileModalTrigger = (props) => {
	return (
		<MobileSearchAndFilterWrapper onClick={props.onClick}>
			<FilterIcon variant="normal" src={filterIcon} />
			{props.count && props.count !== 0 ? <BadgeWrapper>{props.count}</BadgeWrapper> : null}
		</MobileSearchAndFilterWrapper>
	);
};

export default MobileModalTrigger;
