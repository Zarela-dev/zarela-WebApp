import React from 'react';
import styled from 'styled-components';
import fallbackImg from '../../../assets/loader/fallback.png';
import { BodyText, Header } from './../../Elements/Typography';

const FallbackWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const FallbackImage = () => {
	return (
		<FallbackWrapper>
			<img src={fallbackImg} alt="no result" />
			<Header variant="heading5" mb={3} mt={3}>
				Results not found
			</Header>
			<BodyText variant="normal">You can change your search, sort, or filter and try again</BodyText>
		</FallbackWrapper>
	);
};

export default FallbackImage;
