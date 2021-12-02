import React from 'react';
import infoIcon from '../assets/icons/info.svg';
import { ThemeIcon } from './../components/Elements/Icon';
import { BodyText } from './../components/Elements/Typography';
import { Row, Col } from './../components/Elements/Flex';

const Note = ({ icon, children, title, ...rest }) => {
	return (
		<Col {...rest}>
			<Row>
				<ThemeIcon variant='normal' src={icon || infoIcon} />
				<BodyText variant='small' fontWeight='bold'>
					{title}
				</BodyText>
			</Row>
			<BodyText variant='extraSmall'>{children}</BodyText>
		</Col>
	);
};

export default Note;
