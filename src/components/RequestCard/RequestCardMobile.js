import React from 'react';
import RequestCardWrapper, {
	ProgressTrackerWrapper,
	ProgressTrackerTrack,
	ProgressTrackerProcess,
} from '../Elements/RequestCard/IndexMobile';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import contributorIcon from '../../assets/icons/user-blue.svg';
import documentsIcon from '../../assets/icons/document-blue.svg';
import useBiobit from '../../hooks/useBiobit';
import { Header, BodyText } from './../Elements/Typography';
import { IdLabel } from './../Elements/IdLabel';
import { ThemeIcon } from './../Elements/Icon';
import { ThemeTag } from './../Elements/Tag';
import { ThemeButton } from './../Elements/Button';
import { ThemeDivider } from './../Elements/Divider';
import { Row, Col } from './../Elements/Flex';

const RequestCardMobile = (props) => {
	const getBBIT = useBiobit();

	return (
		<RequestCardWrapper data-tour="request-list-one">
			<Row mb={[3]} alignItems="flex-start" width="100%">
				<Col flex={'0 0 50px'} mr={2}>
					<IdLabel mr={[1]} variant="big" data-tour="request-list-two">
						{props.requestID}
					</IdLabel>
				</Col>
				<Col flex='1'>
					<Header variant="heading5" as="h3" data-tour="request-list-three">
						{props.title.length < 70 ? props.title : props.title.substr(0, 70) + '...'}
					</Header>
					<BodyText variant="timestamp" as="span">
						{props.timestamp}
					</BodyText>
				</Col>
			</Row>
			<Col width="100%" backgroundColor="#eaf1fa" sx={{ borderRadius: '2px 2px 0 0' }} p={3}>
				<BodyText variant="small">
					{props.description.length < 120 ? props.description : props.description.substr(0, 120) + '...'}
				</BodyText>
				<Row>
					{props.categories.split(',').map((item) => {
						return <ThemeTag variant="display" item={item} />;
					})}
				</Row>
			</Col>
			<ProgressTrackerWrapper>
				<ProgressTrackerTrack>
					<ProgressTrackerProcess progress={props.progress} />
				</ProgressTrackerTrack>
			</ProgressTrackerWrapper>
			<Row width="100%" mt={2} flexDirection="row" justifyContent="space-between">
				<Row>
					<Col flexWrap="wrap" justifyContent="center" data-tour="request-list-four">
						<Row>
							<ThemeIcon variant="small" src={biobitIcon} />
							<BodyText variant="hint" fontWeight="medium" pr={0.5}>
								{getBBIT(props.angelTokenPay, props.laboratoryTokenPay)[0]}
							</BodyText>
							<BodyText variant="hint" color="textToken" pr={0.5} active>{`~ $${
								getBBIT(props.angelTokenPay, props.laboratoryTokenPay)[1]
							}`}</BodyText>
						</Row>
					</Col>
					<ThemeDivider variant="vertical" />
					<Row alignSelf="center" width="fit-content" data-tour="request-list-five">
						<ThemeIcon variant="small" src={documentsIcon} />
						<BodyText variant="hint" color="textToken" fontWeight="normal">
							{props.contributors}
						</BodyText>
					</Row>
					<ThemeDivider variant="vertical" />
					<Row alignSelf="center" width="fit-content" data-tour="request-list-six">
						<ThemeIcon variant="small" src={contributorIcon} />
						<BodyText variant="hint" color="textToken" fontWeight="normal">
							{props.totalContributedCount}
						</BodyText>
					</Row>
				</Row>
			</Row>
			<Row justifyContent="flex-end" width="100%">
				<ThemeButton
					data-tour="request-list-seven"
					variant="secondary"
					size="small"
					to={`/request/${props.requestID}`}
				>
					Start
				</ThemeButton>
			</Row>
		</RequestCardWrapper>
	);
};

export default RequestCardMobile;
