import React from 'react';
import BigNumber from 'bignumber.js';
import { Box } from 'rebass';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ThemeButton } from '../../components/Elements/Button';

const Confirm = ({ data, stage, setStage }) => {
	return (
		<Box>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Address</TableCell>
						<TableCell align="right">Amount</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row) => (
						<TableRow key={row.address} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell component="th" scope="row">
								{row.address}
							</TableCell>
							<TableCell align="right">{row.amount}</TableCell>
						</TableRow>
					))}
					<TableRow>
						<TableCell component="th" scope="row">
							Total Recipients: {data.length}
						</TableCell>
						<TableCell align="right">
							{`${data
								.map((x) => x.amount)
								.reduce((a, b) => a.plus(new BigNumber(b)), new BigNumber(0))
								.toNumber()} BBIT`}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<Box mt={4} display="flex">
				<ThemeButton
					variant={'secondary'}
					size="large"
					onClick={() => {
						if (stage === 'confirm') {
							setStage('prepare');
						}
					}}
				>
					Back
				</ThemeButton>
				<Box flex="1" />
				<ThemeButton
					variant={'primary'}
					size="large"
					onClick={() => {
						if (stage === 'confirm') {
							setStage('send');
						}
					}}
				>
					Next
				</ThemeButton>
			</Box>
		</Box>
	);
};

export default Confirm;
