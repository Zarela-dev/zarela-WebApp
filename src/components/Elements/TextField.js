import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';


const InputStyles = css`
	font-family: Krub;
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
	${props => props.error ? 'border-bottom: 2px solid #F62D76;' : null};
`;

const TextArea = styled.textarea`
	${InputStyles}
	${props => props.error ? 'border-bottom: 2px solid #F62D76;' : null};
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

export const Error = styled.label`
	font-weight: 500;
	font-size: 10px;
	line-height: 20px;
	color: #F62D76;
	/* border-top: 2px solid #F62D76; */
`;

const TextField = forwardRef(({ multiline, label, error, ...rest }, ref) => {
	return (
		<Wrapper>
			<Label>
				{label}
			</Label>
			{
				multiline ?
					<TextArea error={error} ref={ref} row={5} {...rest} /> :
					<Input error={error} ref={ref} {...rest} />
			}
			{
				error ?
					<Error>
						{error}
					</Error>
					: null
			}
		</Wrapper>
	);
});

export default TextField;
