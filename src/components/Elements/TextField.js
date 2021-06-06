import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components'


const InputStyles = css`
	background: #FFFFFF;
	border: 1px solid rgba(144, 144, 144, 0.3);
	border-radius: 4px;
	padding: ${props => props.theme.spacing(1)};
	font-weight: 500;
	font-size: 12px;
	color: ${props => props.theme.textPrimary};
	max-width: 510px;
	width: 100%;
`;

const Input = styled.input`
	${InputStyles}
`;

const TextArea = styled.textarea`
	${InputStyles}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: ${props => props.theme.spacing(2)};
`;

const Label = styled.label`
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	color: #6C6C6C;
`;

const TextField = forwardRef(({ multiline, label, ...rest }, ref) => {
	return (
		<Wrapper>
			<Label>
				{label}
			</Label>
			{
				multiline ?
				<TextArea ref={ref} row={5} {...rest} />:
				<Input ref={ref} {...rest} />
			}
		</Wrapper>
	);
});

export default TextField;
