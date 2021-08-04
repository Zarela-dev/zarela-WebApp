import React from 'react';
import styled from 'styled-components';
import { Tab, Tabs as RaTabs, TabList, TabPanel } from 'react-tabs';
import maxWidthWRapper from '../Elements/MaxWidth';
import { Route, useHistory } from 'react-router-dom';

const TabsWrapper = styled(RaTabs)`
	${maxWidthWRapper};
	padding: ${(props) => props.isMobile && '0 18px'};
`;

const TabsHeader = styled(TabList)`
	display: flex;
	margin-bottom: ${(props) => (props.isMobile ? props.theme.spacing(2) : props.theme.spacing(3))};
`;

const TabsHeaderItem = styled(Tab)`
	white-space: nowrap;
	position: relative;
	min-width: ${(props) => (props.isMobile ? '100px' : '180px')};
	height: ${(props) => (props.isMobile ? '35px' : '50px')};
	font-size: ${(props) => (props.isMobile ? '12.5px' : '20px')};
	opacity: 0.5;
	line-height: ${(props) => (props.isMobile ? '17px' : '26px')};
	padding: ${(props) => props.theme.spacing(0.9)} 0;
	margin-right: ${(props) => props.isMobile ? props.theme.spacing(0.6) : props.theme.spacing(2)};
	cursor: pointer;

	@media (max-width: 768px) {
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
		background: #7246d0;
		border-radius: 3px;
		width: 100%;
	}
`;

const TabsBody = styled(TabPanel)``;

export const Tabs = ({ data, isMobile, route }) => {
	const history = useHistory();
	const activeTab = history.location.pathname.split('/').reverse()[0];
	const formatUrl = (label) => {
		if (label && typeof label === 'string') {
			return label.replace(/ /g, '_').toLowerCase();
		}
		return;
	};

	return (
		<TabsWrapper
			isMobile={isMobile}
			selectedTabClassName="is-active"
			selectedTabPanelClassName="is-active"
			selectedIndex={data.findIndex((item) => formatUrl(item.label) === activeTab)}
			onSelect={(index, lastIndex) => {
				history.push(`/${route}/${formatUrl(data[index].label)}`);
				return false;
			}}
		>
			<TabsHeader isMobile={isMobile}>
				{data.map((tab, tabIndex) => (
					<TabsHeaderItem isMobile={isMobile} tabIndex={tab.label} key={tabIndex}>
						{tab.label}
					</TabsHeaderItem>
				))}
			</TabsHeader>
			{data.map(({ component, label }, index) => (
				<TabsBody tabIndex={label} key={index}>
					<Route path={`/${route}/${formatUrl(label)}`} exact render={() => component} />
				</TabsBody>
			))}
		</TabsWrapper>
	);
};
