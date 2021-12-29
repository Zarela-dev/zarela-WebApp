import React from 'react';
import styled from 'styled-components';
import { Modal, ModalBody } from 'reactstrap';
import { ModalHeader as ReactModalHeader } from 'reactstrap';
import { ThemeIcon } from '../../../Elements/Icon';
import close from './../../../../assets/icons/close-purple.svg';
import backIcon from './../../../../assets/icons/modal-back.svg';

const CustomModalHeader = styled(ReactModalHeader)`
	flex-direction: row-reverse;
`;

const CloseIconWrapper = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CustomModal = styled(Modal)`
	width: ${(props) => props.width};
`;

const DynamicModal = (props) => {
	return (
		<CustomModal
			width={props.width}
			isOpen={props.modalShow}
			toggle={props.toggle}
			backdropClassName="custom-backdrop"
			className={props.className}
			modalTransition={{ timeout: props.hasTransition ? 200 : 0 }}
			backdropTransition={{ timeout: props.hasTransition ? 200 : 0 }}
			fade={props.fade ?? props.hasTransition}
		>
			<CustomModalHeader
				close={
					<CloseIconWrapper>
						<ThemeIcon src={props.type === 'calendar' ? backIcon : close} mr={0} onClick={props.onClose} />
					</CloseIconWrapper>
				}
			>
				{props.header}
			</CustomModalHeader>
			<ModalBody>{props.body}</ModalBody>
		</CustomModal>
	);
};

export default DynamicModal;
