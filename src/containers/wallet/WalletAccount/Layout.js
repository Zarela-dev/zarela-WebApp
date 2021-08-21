import styled from 'styled-components';

export const Wrapper = styled.div``;

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
	/* padding: 0 18%; */
	align-items: flex-end;
	
	&:not(:last-child) {
		padding-bottom: 60px;
	}
`;

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	flex: ${(props) => (props.fixed ? '0 0 370px' : '1 0')};
	align-items: ${(props) => (props.center ? 'center' : 'flex-start')};
`;

export const MobileColumn = styled(Column)`
	margin-top: 10px;
	margin-bottom: 40px;
`;
