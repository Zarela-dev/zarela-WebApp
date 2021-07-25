import styled from 'styled-components';

export const Wrapper = styled.div`
  
`;

export const Content = styled.div`
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
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
	flex: ${props => props.fixed ? '0 0 320px' : '1 0 auto'};
	align-items: ${props => props.center ? 'center' : 'flex-start'};
`;
