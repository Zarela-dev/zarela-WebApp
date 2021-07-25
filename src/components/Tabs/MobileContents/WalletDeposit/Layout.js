import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 19px;
`;

export const Content = styled.div`
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	flex-direction: column;
`;

export const Row = styled.div`
	display: flex;
	justify-content: space-evenly;
	flex: 1;
	width: 100%;
	padding: 0 18%;
	align-items: flex-end;
    padding-bottom: 50px;
`;

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	align-items: ${props => props.center ? 'center' : 'flex-start'};
	width: 100%;
	margin-bottom: 40px;
`;
