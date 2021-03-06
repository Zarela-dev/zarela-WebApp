import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { BodyText } from './../../components/Elements/Typography';

const InputStyles = css`
	font-family: Krub;
	background: ${(props) => props.theme.colors.bgWhite};
	border: 1px solid rgba(144, 144, 144, 0.3);
	border-radius: 4px;
	padding: ${(props) => props.theme.spacing(1)};
	${(props) => props.hasAdornment && 'padding-right: 80px'};
	box-sizing: border-box;
	font-weight: 500;
	font-size: 12px;
	color: ${(props) => props.theme.colors.textPrimary};
	width: 100%;
`;
const InputWrapper = styled.div`
	width: 100%;
`;

const Input = styled.input`
	${InputStyles}
	${(props) => (props.error ? `border-bottom: 2px solid ${props.theme.colors.error};` : null)};
`;

const TextArea = styled.textarea`
	${InputStyles}
	${(props) => (props.error ? `border-bottom: 2px solid ${props.theme.colors.error};` : null)};
`;

const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: ${(props) => props.theme.spacing(2)};
	margin-top: ${(props) => (props.hasTopMargin ? props.theme.spacing(2) : 0)};
`;

const Label = styled.label`
	display: flex;
	width: 100%;
	justify-content: space-between;
	margin-bottom: ${(props) => props.theme.spacing(0.5)};
`;

const Hint = styled.div`
	font-weight: normal;
	font-size: 13px;
	line-height: 16px;
`;

export const Error = styled.label`
	font-weight: 500;
	font-size: 10px;
	line-height: 20px;
	color: ${({ theme }) => theme.colors.error};
`;

const Adornment = styled.div`
	font-weight: 600;
	font-size: 12px;
	line-height: 23px;
	color: ${({ colored, theme }) => (colored ? theme.colors.primary : theme.colors.textPrimary)};
`;

const ActionsContainer = styled.div`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	position: absolute;
	right: ${(props) => (props.isActionTypeIcon ? '7px' : '19px')};
	top: ${(props) => (props.shrink ? '7px' : '31px')};
	z-index: 3;
`;

const HelperText = styled.div`
	font-weight: normal;
	font-size: 10px;
	line-height: 13px;
	color: ${(props) => props.theme.colors.textPrimary};
	margin-top: ${(props) => props.theme.spacing(0.7)};
`;

const InputAction = styled.button.attrs({ type: 'button' })`
	border: none;
	color: ${({ colored, theme }) => (colored ? theme.colors.primary : theme.colors.textPrimary)};
	background: transparent;
	font-weight: 600;
	font-size: 12px;
	width: 24px;
	margin-left: ${(props) => props.theme.spacing(1)};
`;

const TextField = forwardRef(
	(
		{
			coloredAdornment,
			multiline,
			className,
			label,
			error,
			helperText,
			hint,
			hasTopMargin,
			actions,
			isActionTypeIcon,
			adornment,
			adornmentOnClick,
			...rest
		},
		ref
	) => {
		return (
			<Wrapper className={className} hasTopMargin={true}>
				<Label>
					<BodyText variant="extraSmall" color="timestamp">
						{label}
					</BodyText>
					{hint ? <Hint>{hint}</Hint> : null}
				</Label>
				<InputWrapper>
					{multiline ? (
						<TextArea hasAdornment={!!adornment} error={error} ref={ref} row={5} {...rest} />
					) : (
						<Input hasAdornment={!!adornment} error={error} ref={ref} {...rest} />
					)}
				</InputWrapper>
				<ActionsContainer shrink={!label ? true : false} isActionTypeIcon={isActionTypeIcon}>
					{adornment ? (
						<Adornment colored={coloredAdornment} onClick={adornmentOnClick}>
							{adornment}
						</Adornment>
					) : null}
					{actions
						? actions.map((action, index) => {
								return (
									<InputAction key={index} colored={coloredAdornment} onClick={action.onClick}>
										{action.content}
									</InputAction>
								);
						  })
						: null}
				</ActionsContainer>
				{helperText ? <HelperText>{helperText}</HelperText> : null}
				{error ? (
					<BodyText variant="extraSmall" color="error">
						{error}
					</BodyText>
				) : null}
			</Wrapper>
		);
	}
);

export default TextField;
