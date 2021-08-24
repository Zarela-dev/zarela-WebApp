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
	font-weight: 500;
	font-size: 14px;
	line-height: 22px;
`;

const NoMobileSupportMessage = ({ message }) => {
	return (
		<Wrapper>
			<ZarelaDesktopIcon src={zarelaDesktopImage} />
			<Message>
				{message ||
					'Because encryption/decryption is only available on the desktop version of Metamask. Please connect with Metamask desktop version'}
			</Message>
		</Wrapper>
	);
};

export default NoMobileSupportMessage;
