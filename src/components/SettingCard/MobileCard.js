import React from 'react';
import styled from 'styled-components';
import deleteIcon from '../../assets/icons/actionIcons/delete.svg';
import edit from '../../assets/icons/actionIcons/edit.svg';
import block from '../../assets/icons/actionIcons/block.svg';
import editwhite from '../../assets/icons/actionIcons/editPenWhite.svg';
import unBlockPink from '../../assets/icons/actionIcons/unBlockPink.svg';
import { StatusIcon } from '../LogCards/Elements';

const Wrapper = styled.div`
	border: 1px solid #c4c4c4;
	border-radius: 3px;
	margin-bottom: 15px;
`;
const Title = styled.div`
	font-size: 10px;
	line-height: 13px;
	white-space: nowrap;
	padding-right: 10px;
`;
const ContentValue = styled.div`
	font-size: 12px;
	line-height: 16px;
	font-weight: ${(props) => (props.bold ? 'bold' : 'unset')};
	text-overflow: ellipsis;
	max-width: 215px;
	overflow: hidden;
`;

const ContentRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
`;

const ButtonRow = styled(ContentRow)`
	padding: 0px;
	width: 100.1%;
`;
const ButtonItem = styled.button`
	background: ${(props) => (props.active ? '#fff' : '#7246D0')};
	border: 2px solid #7246d0;
	width: 31%;
	white-space: nowrap;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 31px;
	border-radius: ${(props) =>
		props.position === 'left'
			? '0 3px 0 3px'
			: props.position === 'right'
			? '3px 0 3px 0'
			: props.position === 'center'
			? '3px 3px 0 0'
			: 'unset'};
`;
const ButtonIcon = styled.img`
	width: 14px;
	height: 14px;
	margin-right: 10px;
`;
const ButtonContent = styled.span`
	font-size: 12px;
	line-height: 10px;
	color: ${(props) =>
		props.active
			? props.theme.colors.primary
			: props.color === 'secondary'
			? props.theme.colors.secondary
			: props.theme.colors.bgWhite};
`;

const UnBlockButton = styled(ButtonItem)`
	width: 100%;
	border: none;
	background: ${props => props.theme.colors.bgWhite};
`;

const MobileCard = ({ type }) => {
	return (
		<Wrapper>
			<ContentRow>
				<Title>Name</Title>
				<ContentValue bold>Hub- Dr.Mohebi</ContentValue>
				<StatusIcon src={edit} />
			</ContentRow>
			<ContentRow>
				<Title>Public key</Title>
				<ContentValue>OXKMMSISIDNVIOISDUNVDUISUIAISOASNNFDUI</ContentValue>
			</ContentRow>
			{type === 'contact' ? (
				<ButtonRow>
					<ButtonItem active={true} position="left">
						<ButtonIcon src={block} />
						<ButtonContent active={true}>Block</ButtonContent>
					</ButtonItem>
					<ButtonItem active={true} position="center">
						<ButtonIcon src={deleteIcon} />
						<ButtonContent active={true}>Delete</ButtonContent>
					</ButtonItem>
					<ButtonItem active={false} position="right">
						<ButtonIcon src={editwhite} />
						<ButtonContent active={false}>Rename</ButtonContent>
					</ButtonItem>
				</ButtonRow>
			) : type === 'block' ? (
				<ButtonRow>
					<UnBlockButton>
						<ButtonIcon src={unBlockPink} />
						<ButtonContent color="secondary">Unblock</ButtonContent>
					</UnBlockButton>
				</ButtonRow>
			) : null}
		</Wrapper>
	);
};

export default MobileCard;
