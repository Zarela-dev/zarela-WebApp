import React from 'react';
import styled from 'styled-components';
import { BodyText } from '../../../Elements/Typography';

const HeaderInner = styled.div`
	display: flex;
	width: ${props => props.width};
	justify-content: ${(props) => props.justify};
	align-items: center;
`;

const ModalHeader = (props) => {
	return (
		<HeaderInner justify={props.justify} width={props.width}>
			<BodyText variant="big" fontWeight="semiBold" m={0}>
				{props.title}
			</BodyText>
			{props.clearText && (
				<BodyText variant="extraSmall" m={0} className="cursor-pointer" onClick={props.onClear}>
					{props.clearText}
				</BodyText>
			)}
		</HeaderInner>
	);
};

export default ModalHeader;
