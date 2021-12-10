import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { Header as Heading } from './../Elements/Typography';
import { ThemeIcon } from './Icon';
import searchIcon from './../../assets/icons/search.svg';
import searchClose from './../../assets/icons/search-clear-icon.svg';
import { Box } from 'rebass';

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
	width: 100%;
	border: none;
`;

const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
`;

const Label = styled.label`
	display: flex;
	width: 100%;
	justify-content: space-between;
	margin-bottom: ${(props) => props.theme.spacing(1.5)};
`;

const SearchIcon = styled(ThemeIcon)`
	position: absolute;
	top: 10px;
	left: 8px;
	cursor: pointer;
`;

const SearchClear = styled(ThemeIcon)`
	position: absolute;
	top: 10px;
	right: 8px;
	cursor: pointer;
`;

const SearchSection = styled(Box)`
	position: relative;
	padding: 2px 35px;
	width: 100%;
	border: 1px solid #e8e8e8;
	border-radius: 4px;
	min-height: 48px;
	display: flex;
	align-items: center;
`;

const SearchInput = forwardRef(
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
					<Heading as="h4" variant="heading4">
						{label}
					</Heading>
				</Label>
				<SearchSection>
					<InputWrapper>
						<SearchIcon variant="big" src={searchIcon} />
						<Input hasAdornment={!!adornment} error={error} ref={ref} {...rest} placeholder="Start typing ..." />
						<SearchClear variant="big" src={searchClose} />
					</InputWrapper>
				</SearchSection>
			</Wrapper>
		);
	}
);

export default SearchInput;
