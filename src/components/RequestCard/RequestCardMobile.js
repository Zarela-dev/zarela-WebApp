import React from 'react';
import RequestCardWrapper, {
	HeaderLayout,
	Spacer,
	Description,
	ProgressTrackerWrapper,
	ProgressTrackerTrack,
	ProgressTrackerProcess,
} from '../Elements/RequestCard/IndexMobile';
import { TagsWrapper, TagItem } from '../Elements/RequestCard';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import contributorIcon from '../../assets/icons/user-black.svg';
import documentsIcon from '../../assets/icons/document-black.svg';
import useBiobit from '../../hooks/useBiobit';
import { Header, BodyText } from './../Elements/Typography';
import { IdLabel } from './../Elements/IdLabel';
import { ThemeIcon } from './../Elements/Icon';
import { ThemeTag } from './../Elements/Tag';
import { ThemeButton } from './../Elements/Button';
import { Flex } from 'reflexbox';
import { ThemeDivider } from './../Elements/Divider';

const RequestCardMobile = (props) => {
	const getBBIT = useBiobit();

	return (
		<RequestCardWrapper data-tour='request-list-one'>
			<HeaderLayout>
				<IdLabel variant='big' data-tour='request-list-two'>
					{props.requestID}
				</IdLabel>
				<Header variant='heading3' as='h3' data-tour='request-list-three'>
					{props.title.length < 70
						? props.title
						: props.title.substr(0, 70) + '...'}
				</Header>
				<Spacer />
			</HeaderLayout>
			<BodyText variant='timestamp' as='span' ml={53} mb={0}>
				{props.timestamp}
			</BodyText>
			<Description>
				<BodyText variant='small'>
					{props.description.length < 120
						? props.description
						: props.description.substr(0, 120) + '...'}
				</BodyText>
				<TagsWrapper>
					{props.categories.split(',').map((item) => {
						return <ThemeTag variant='display' item={item} />;
					})}
				</TagsWrapper>
			</Description>
			<ProgressTrackerWrapper>
				<ProgressTrackerTrack>
					<ProgressTrackerProcess progress={props.progress} />
				</ProgressTrackerTrack>
			</ProgressTrackerWrapper>
			<Flex
				width='100%'
				mt={2}
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
			>
				<Flex>
					<Flex
						flexWrap='wrap'
						flexDirection='column'
						justifyContent='center'
						data-tour='request-list-four'
					>
						<Flex alignItems='center'>
							<ThemeIcon variant='small' src={biobitIcon} />
							<BodyText variant='hint' fontWeight='bold' pr={0.5}>
								{getBBIT(props.angelTokenPay, props.laboratoryTokenPay)[0]}
							</BodyText>
						</Flex>
						<Flex alignItems='center'>
							<BodyText variant='hint' color='textToken' pr={0.5} active>{`~ $${
								getBBIT(props.angelTokenPay, props.laboratoryTokenPay)[1]
							}`}</BodyText>
						</Flex>
					</Flex>

					<ThemeDivider variant='vertical' />

					<Flex
						alignSelf='center'
						width='fit-content'
						data-tour='request-list-five'
					>
						<ThemeIcon variant='small' src={documentsIcon} />
						<BodyText variant='hint' fontWeight='bold'>
							{props.contributors}
						</BodyText>
					</Flex>
					<ThemeDivider variant='vertical' />
					<Flex
						alignSelf='center'
						width='fit-content'
						data-tour='request-list-six'
					>
						<ThemeIcon variant='small' src={contributorIcon} />
						<BodyText variant='hint' fontWeight='bold'>
							{props.totalContributedCount}
						</BodyText>
					</Flex>
				</Flex>
				<ThemeButton
					data-tour='request-list-seven'
					variant='secondary'
					size='small'
					to={`/request/${props.requestID}`}
				>
					Start
				</ThemeButton>
			</Flex>
		</RequestCardWrapper>
	);
};

export default RequestCardMobile;
