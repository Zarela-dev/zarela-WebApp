import React from 'react';
import styled from 'styled-components';
import { Tab, Tabs as RaTabs, TabList, TabPanel } from 'react-tabs';
import maxWidthWRapper from '../Elements/MaxWidth';
import { Route, useHistory } from 'react-router-dom';

const TabsWrapper = styled(RaTabs)`
	${maxWidthWRapper};
  padding: 0 18px;
`;

const TabsHeader = styled(TabList)`
	display: flex;
	margin-bottom: ${props => props.theme.spacing(2)};
`;

const TabsHeaderItem = styled(Tab)`
	position: relative;
	min-width: 100px;
	height: 35px;
	font-size: 13.5px;
	opacity: 0.5;
	line-height: 17px;
	padding: ${props => props.theme.spacing(1)} ${props => props.theme.spacing(0.5)};
	margin-right: ${props => props.theme.spacing(2)};
	cursor: pointer;

  @media ( max-width: 500px ) {
    min-width: calc((100% - 36px) / 3);
  }
	
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

export const MobileTabs = ({ data }) => {
	const history = useHistory();
	const activeTab = history.location.pathname.split('/').reverse()[0];

	return (
		<TabsWrapper
			selectedTabClassName='is-active'
			selectedTabPanelClassName='is-active'
			selectedIndex={data.findIndex(item => item.label.toLowerCase() === activeTab)}
			onSelect={(index, lastIndex) => {
				history.push(`/wallet/${data[index].label?.toLowerCase()}`);
				return false;
			}}
		>
			<TabsHeader>
				{
					data.map((tab, tabIndex) => (
						<TabsHeaderItem tabIndex={tab.label} key={tabIndex}>
							{tab.label}
						</TabsHeaderItem>
					))
				}
			</TabsHeader>
			{
				data.map(({ component, label }, index) => (
					<TabsBody tabIndex={label} key={index}>
						<Route path={`/wallet/${label.toLowerCase()}`} exact render={() => component} />
					</TabsBody>
				))
			}
		</TabsWrapper>
	);
};
