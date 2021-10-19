import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Box, Flex, Button } from 'rebass/styled-components';
import {
	variant,
	space,
	border,
	layout,
	color,
	compose,
	fontWeight,
	padding,
} from 'styled-system';

import { Label, Input, Select, Textarea, Radio, Checkbox } from '@rebass/forms';
import { BodyText } from './Typography';

const InputWrapper = styled(Box)(
	compose(color,border),
	{
		background: '#fff',
		borderColor: 'blue',
		borderRadius: '4px',
		border: '2px solid #F62D76',
	},
);

const ThemeInput = styled(Input)(
	compose(color,border),
	{
		fontSize: '24px',
	},
	variant({
    variants: {
			largeInput: {
				fontSize: 1,
				px: 3,
				py: 2,
			},
			input: {
				color: 'red',
			},
			select: {
				borderRadius: 9999,
			},
			textarea: {},
			label: {},
			radio: {},
			checkbox: {
        backgroundColor: 'red'
			},
		},
	})
);

const FormInput = forwardRef(
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
			<Box width={1}>
				<Label htmlFor={label}>
					<BodyText variant='hint' fontWeight='semiBold'>
						{label}
					</BodyText>
				</Label>
				<InputWrapper>
				<ThemeInput fontWeight={['semiBold']} sx={{border: 'none'}} id={label} variant='input' fontSize="small" name={label} type='textBox' error='error' {...rest} />
				</InputWrapper>
			</Box>
		);
	}
);

export default FormInput;
