import { toast as originalToast } from 'react-toastify';
import styled from 'styled-components';

const Content = styled.div`
  
`;

export const toast = ({variant, copyable, textToCopy}) => {
	console.log(originalToast.POSITION.BOTTOM_CENTER)
	return toast('foo', {
		position: toast.POSITION.BOTTOM_CENTER,
		pauseOnHover: true,
		pauseOnFocusLoss: true,
		closeOnClick: false,
		draggable: true,
	});
};