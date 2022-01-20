import React from 'react';
import { Flex, Text } from 'rebass';

const Footer = () => {
	return (
		<Flex maxWidth={1255} width={'100%'} height={48} mt={80} justifyContent={'center'} alignItems={'center'} mx={'auto'}>
			<Text fontSize="14px" color={'#494949'}>
				&#169; 2022 Created by Zarela.io
			</Text>
		</Flex>
	);
};

export default Footer;
