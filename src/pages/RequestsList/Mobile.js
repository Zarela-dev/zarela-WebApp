import React from 'react';
import RequestCardMobile from '../../components/RequestCard/RequestCardMobile';
import styled from 'styled-components';
import Pagination from '../../components/Pagination';
import maxWidthWrapper from '../../components/Elements/MaxWidth';
import { timeSince, convertToBiobit } from '../../utils';
import homepageBg from '../../assets/home-bg.jpg';
import { Button } from '../../components/Elements/Button';
import { Link } from 'react-router-dom';

const RequestsListWrapper = styled.div`
	position: relative;
	width: 100%;
`;

const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: -1;

	&::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 80vh;

		background-image: url(${homepageBg}), linear-gradient(0deg,rgb(255 255 255),rgb(255 255 255 / 0%));
		background-size: 100%, 400px;
		background-position: 0 -30px;
		z-index: -3;
	}
	
	&::after {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		height: 80vh;
		left: 0;
		width: 100%;
		z-index: -2;
		background: linear-gradient(0deg,rgb(255 255 255) 50%,rgb(255 255 255 / 0%));
	}
`;

const RequestsListLayout = styled.section`
	display: flex;
	flex-direction: row-reverse;
	flex-wrap: nowrap;
	width: 100%;
	padding-top: ${props => props.theme.spacing(4)};
	${maxWidthWrapper};
`;

const RequestsListContentWrapper = styled.section`
	flex: 1 0;
	padding: 0 ${props => props.theme.spacing(1.8)};
`;

const TitleSection = styled.div`
  display:flex;
  height: 83px;
  width: 100%;
  padding: 0 18px;
  justify-content: space-between;
  align-items: center;
  background-color: #F4F8FE;
  flex-wrap: wrap;
`;
const Title = styled.h1`
  color: #000;
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
  margin-left: 0px;
`;

const SubmitRequestButton = styled(Link)`
	${Button};
  white-space: nowrap;
  margin-right: 0;
  height: 35px;
  font-size: 14px;
  padding: 10px 24px; 
`;


const App = ({ requests }) => {
  return (
    <>
      <TitleSection>
        <Title>
          Recent requests
        </Title>
        <SubmitRequestButton>
          New Request
        </SubmitRequestButton>
      </TitleSection>
      <RequestsListWrapper>
        <Background />
        <RequestsListLayout>
          <RequestsListContentWrapper>
            {
              Object.values(requests).sort((a, b) => +b.requestID - +a.requestID).map(item => {
                return (
                  <RequestCardMobile
                    key={item.requestID}
                    requestID={item.requestID}
                    title={item.title}
                    description={item.description}
                    tokenPay={item.tokenPay}
                    timestamp={timeSince(item.timestamp)}
                    progress={+item.totalContributed / +item.totalContributors * 100}
                    contributors={`${item.totalContributed}/${item.totalContributors}`}
                    totalContributedCount={item.totalContributedCount}
                  />
                );
              })
            }
          </RequestsListContentWrapper>
        </RequestsListLayout>
        <Pagination />
      </RequestsListWrapper>
    </>
  )
}

export default App;