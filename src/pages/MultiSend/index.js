import React, { useContext, useState } from 'react';
import { mainContext } from '../../state';
import { useWeb3React } from '@web3-react/core';
import { Card, Box } from 'rebass';
import { BodyText } from '../../components/Elements/Typography';

import Prepare from './Prepare';
import Confirm from './Confirm';
import Send from './Send';
import ConnectDialog from '../../components/Dialog/ConnectDialog';

const MultiSendPage = () => {
	const DECIMALS = 1000000000;
	const [data, setData] = useState([]);
	const [fileNames, setFileNames] = useState([]);
	const [manualInput, setManualInput] = useState('');

	const [stage, setStage] = useState('prepare');
	const { appState } = useContext(mainContext);
	const { account } = useWeb3React();

	const [errors, setErrors] = useState({});
	const [txHash, setTxHash] = useState(null);

	return (
		<Box sx={{ width: '720px', margin: '-80px auto 0' }}>
			<Box display={'flex'} mb={4} justifyContent={'center'}>
				<BodyText variant="big" fontWeight={stage === 'prepare' ? 'bold' : 'regular'}>
					Prepare
				</BodyText>
				<Box mx={2} width={160} sx={{ borderBottom: '1px dashed #EAEAEA', position: 'relative', top: '-10px' }} />
				<BodyText variant="big" fontWeight={stage === 'confirm' ? 'bold' : 'regular'}>
					Confirm
				</BodyText>
				<Box mx={2} width={160} sx={{ borderBottom: '1px dashed #EAEAEA', position: 'relative', top: '-10px' }} />
				<BodyText variant="big" fontWeight={stage === 'send' ? 'bold' : 'regular'}>
					Send
				</BodyText>
			</Box>
			<Card
				p={4}
				sx={{
					background: '#FFFFFF',
					boxShadow: '0px 4px 20px rgba(52, 52, 52, 0.15)',
					borderRadius: '16px',
				}}
			>
				{!account ? <ConnectDialog isOpen={true} /> : null}
				{stage === 'prepare' ? (
					<Prepare
						{...{
							data,
							setData,
							fileNames,
							appState,
							setFileNames,
							manualInput,
							setManualInput,
							stage,
							setStage,
							errors,
							setErrors,
						}}
					/>
				) : stage === 'confirm' ? (
					<Confirm
						{...{
							stage,
							setStage,
							data,
						}}
					/>
				) : stage === 'send' ? (
					<Send
						{...{
							stage,
							setStage,
							appState,
							data,
							DECIMALS,
							account,
							txHash,
							setTxHash,
						}}
					/>
				) : null}
			</Card>
		</Box>
	);
};

export default MultiSendPage;
