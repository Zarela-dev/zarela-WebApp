import React from 'react';
import { Box } from 'rebass';
import { BodyText } from '../../components/Elements/Typography';

const Success = ({ txHash }) => {
	return (
		<Box>
			<BodyText
				variant="big"
				as="a"
				target="_blank"
				href={
					process.env.REACT_APP_IS_TEST_NET
						? `https://ropsten.etherscan.io/tx/${txHash}`
						: `https://etherscan.io/tx/${txHash}`
				}
			>
				View on Etherscan
			</BodyText>
		</Box>
	);
};

export default Success;
