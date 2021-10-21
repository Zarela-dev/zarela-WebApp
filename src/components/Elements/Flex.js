import { Flex } from 'rebass';

export const Row = (props) => {
	return <Flex flexDirection='row' alignItems='center' {...props}></Flex>;
};

export const Col = (props) => {
	return <Flex flexDirection='column' justifyContent='center' {...props}></Flex>;
};
