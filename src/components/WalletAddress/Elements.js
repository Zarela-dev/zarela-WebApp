import styled from 'styled-components';
import MuiTooltip from '@material-ui/core/Tooltip';

export const Action = styled.button`
	border: none;
	background: none;
	width: 24px;
	padding: 0;
	margin-left: ${(props) => props.theme.spacing(1.6)};
	opacity: ${(props) => (props.disabled ? '0.3' : '1')};
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

export const Tooltip = styled((props) => {
	return <MuiTooltip classes={{ popper: props.className }} {...props} />;
})`
	& .MuiTooltip-tooltip {
		background: white;
		box-shadow: 0px 0px 20px rgba(81, 197, 234, 0.32);
		border-radius: 4px;
		width: 250px;
	}
`;
export const AddToContactFrom = styled.form`
	display: flex;
	flex-wrap: nowrap;
`;

export const TextField = styled.input`
	flex: 1 0 auto;
	color: ${(props) => props.theme.colors.secondary};
	font-size: 12px;
	border: none;
	background: none;
`;

export const SubmitButton = styled.button`
	border: none;
	background: none;
`;
export const Icon = styled.img``;

export const Address = styled.p``;

export const ActionsWrapper = styled.div`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
`;

export const AddressWrapper = styled.div`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
`;

export const Wrapper = styled.div`
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
`;

export const PublicKeyIcon = styled.img`
	flex: 0 0 40px;
	height: 40px;
	margin-right: ${(props) => props.theme.spacing(1)};
`;
