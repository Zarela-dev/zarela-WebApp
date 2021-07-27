import React from 'react';
import styled from 'styled-components';
import zarelaDesktopImage from '../assets/images/zarela-desktop.png';

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	background: white;
	padding: 0 ${(props) => props.theme.spacing(3.4)};
	text-align: center;
`;

const ZarelaDesktopIcon = styled.img`
	width: 203px;
	margin: 0 auto ${(props) => props.theme.spacing(2.6)};
`;

const Message = styled.h3`
	font-weight: bold;
	font-size: 18px;
	line-height: 22px;
`;

const NoMobileSupportMessage = () => {
	return (
		<Wrapper>
			<ZarelaDesktopIcon src={zarelaDesktopImage} />
			<Message>
				You can not create a new request in your phone please open the web again in desktop
				and continue...
			</Message>
		</Wrapper>
	);
};

export default NoMobileSupportMessage;
