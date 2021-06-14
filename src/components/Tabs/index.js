import React from 'react';
import styled from 'styled-components';
import { Tab, Tabs as RaTabs, TabList, TabPanel } from 'react-tabs';
import maxWidthWRapper from '../Elements/MaxWidth';

const TabsWrapper = styled(RaTabs)`
	${maxWidthWRapper};
`;

const TabsHeader = styled(TabList)`
	display: flex;
	margin-bottom: ${props => props.theme.spacing(3)};
`;

const TabsHeaderItem = styled(Tab)`
	position: relative;
	min-width: 180px;
	height: 50px;
	font-size: 20px;
	opacity: 0.5;
	line-height: 26px;
	padding: ${props => props.theme.spacing(1)} ${props => props.theme.spacing(0.5)};
	margin-right: ${props => props.theme.spacing(2)};
	
	&.is-active {
		opacity: 1;

		&::after {
			height: 3px;
		}
	}

	&::after {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		height: 1px;
		background: #7246D0;
		border-radius: 3px;
		width: 100%;
	}
`;

const TabsBody = styled(TabPanel)`
`;

export const Tabs = () => {
	return (
		<TabsWrapper
			selectedTabClassName='is-active'
			selectedTabPanelClassName='is-active'
		>
			<TabsHeader>
				<TabsHeaderItem>
					Withdraw
				</TabsHeaderItem>
				<TabsHeaderItem>
					Deposit
				</TabsHeaderItem>
				<TabsHeaderItem>
					Transactions
				</TabsHeaderItem>
			</TabsHeader>
			<TabsBody>
				foo
			</TabsBody>
			<TabsBody>
				bar
			</TabsBody>
			<TabsBody>
				baz
			</TabsBody>
		</TabsWrapper>
	);
};
