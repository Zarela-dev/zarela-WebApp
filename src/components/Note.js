import React from 'react';
import styled from 'styled-components';
import infoIcon from '../assets/icons/info.svg';

const NoteWrapper = styled.div``;

const NoteHeader = styled.div`
	display: flex;
	margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const NoteIcon = styled.img`
	width: 23px;
	margin-right: ${(props) => props.theme.spacing(0.7)};
`;

const NoteTitle = styled.div`
	font-weight: bold;
	font-size: 14px;
	line-height: 20px;
	color: ${(props) => props.theme.textPrimary};
`;

const NoteContent = styled.div`
	line-height: 1.4;
	font-size: 12px;
	text-align: justify;
	word-break: break-word;
`;

const Note = ({ icon, children, title, ...rest }) => {
	return (
		<NoteWrapper {...rest}>
			<NoteHeader>
				<NoteIcon src={icon || infoIcon} />
				<NoteTitle>{title}</NoteTitle>
			</NoteHeader>
			<NoteContent>{children}</NoteContent>
		</NoteWrapper>
	);
};

export default Note;
