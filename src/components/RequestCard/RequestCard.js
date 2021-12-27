import React from 'react';
import {
	RequestCardWrapper,
	ProgressTrackerWrapper,
	ProgressTrackerTrack,
	ProgressTrackerProcess,
} from './../Elements/RequestCard';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import contributorIcon from '../../assets/icons/user-blue.svg';
import documentsIcon from '../../assets/icons/document-blue.svg';
import useBiobit from '../../hooks/useBiobit';
import { Header, BodyText } from './../Elements/Typography';
import { ThemeButton } from './../Elements/Button';
import { ThemeDivider } from './../Elements/Divider';
import { IdLabel } from '../Elements/IdLabel';
import { ThemeTag } from '../Elements/Tag';
import { ThemeIcon } from '../Elements/Icon';
import { Row, Col } from '../Elements/Flex';

const RequestCard = (props) => {
	const getBBIT = useBiobit();

	return (
		<RequestCardWrapper data-tour="request-list-one">
			<Row width="100%" alignItems="flex-start">
				<Col flex={'0 0 70px'} mr={[3]}>
					<IdLabel variant="big" data-tour="request-list-two">
						{props.requestID}
					</IdLabel>
				</Col>
				<Col flex={1}>
					<Header variant="heading4" as="h4" data-tour="request-list-three">
						{props.title.length < 85 ? props.title : props.title.substr(0, 85) + '...'}
					</Header>
				</Col>
			</Row>
			<Row width="100%">
				<Col flex={'0 0 70px'} mr={[3]}></Col>
				<Col>
					<BodyText variant="timestamp" as="span" mb={15}>
						{props.timestamp}
					</BodyText>
				</Col>
			</Row>
			<Col width="100%" backgroundColor="#eaf1fa" sx={{ borderRadius: '5px 5px 0 0' }} p={3}>
				<BodyText fontWeight="light" variant="small">
					{props.description.length < 320 ? props.description : props.description.substr(0, 320) + '...'}
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
			<Row width="100%" mt={3} flexDirection="row" justifyContent="space-between">
				<Row>
					<Col flexWrap="wrap" justifyContent="center" data-tour="request-list-four">
						<Row>
							<ThemeIcon variant="normal" src={biobitIcon} />
							<BodyText variant="big" fontWeight="medium" pr={1}>
								{getBBIT(props.angelTokenPay, props.laboratoryTokenPay)[0]}
							</BodyText>
							<BodyText variant="big" fontWeight="medium">
								BBit
							</BodyText>
						</Row>
						<Row>
							<BodyText variant="big" fontWeight="medium" color="textToken" pl={1.5} active>{`~ $${
								getBBIT(props.angelTokenPay, props.laboratoryTokenPay)[1]
							}`}</BodyText>
						</Row>
					</Col>

					<ThemeDivider variant="vertical" />
					<Col flexWrap="wrap" justifyContent="center" data-tour="request-list-five">
						<Row>
							<ThemeIcon variant="brief" src={documentsIcon} />
							<BodyText variant="hint" color="textToken" fontWeight="bold">
								{props.contributors}
							</BodyText>
						</Row>
						<Row>
							<BodyText fontWeight="light" variant="hint" color="textToken">
								No. of accepted responses
							</BodyText>
						</Row>
					</Col>
					<ThemeDivider variant="vertical" />
					<Col flexWrap="wrap" justifyContent="center" data-tour="request-list-six">
						<Row>
							<ThemeIcon variant="brief" src={contributorIcon} />
							<BodyText variant="hint" color="textToken" fontWeight="bold">
								{props.totalContributedCount}
							</BodyText>
						</Row>
						<Row>
							<BodyText fontWeight="light" variant="hint" color="textToken">
								No. of people contributed
							</BodyText>
						</Row>
					</Col>
				</Row>
				<ThemeButton
					data-tour="request-list-seven"
					variant="secondary"
					size="normal"
					to={`/request/${props.requestID}`}
				>
					Start
				</ThemeButton>
			</Row>
		</RequestCardWrapper>
	);
};

export default RequestCard;
