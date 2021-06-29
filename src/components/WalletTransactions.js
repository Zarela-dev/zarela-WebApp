import React from 'react';
import styled from 'styled-components';
import { timeSince, convertToBiobit, CopyableText } from '../utils';

const Table = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: ${props => props.theme.spacing(3)};
`;

const CellWrapper = styled.div`
	flex: 1;
	padding: 5px 0;
	background: white;

	&:first-child {
		border-radius: 8px 0 0 8px;
	}
	&:last-child {
		border-radius: 0 8px 8px 0;
	}
`;

const Row = styled.section`
	display: flex;
	margin-bottom: 4px;

	${CellWrapper}:first-of-type {
		flex: 0 0 240px; /* blockHash */
	}
	${CellWrapper}:nth-of-type(2) {
		flex: 0 0 210px; /* timestamp */
	}
	${CellWrapper}:nth-of-type(3) {
		flex: 0 0 180px; /* from  */
	}
	${CellWrapper}:nth-of-type(4) {
		flex: 0 0 180px; /* to */
	}
	${CellWrapper}:nth-of-type(5) {
		flex: 0 0 105px; /* status */
	}
	${CellWrapper}:nth-of-type(6) {
		flex: 1 0 auto; /* value */
	}
	${CellWrapper}:nth-of-type(7) {
		flex: 0 0 170px; /* fee */
	}
`;

const Cell = styled.div`
	display: flex;
	align-items: center;
	min-height: 48px;
	padding: ${props => props.theme.spacing(0.6)} ${props => props.theme.spacing(1)};
	font-size: 12px;
	height: 40px;
	width: 100%;
	word-break: break-word;
	font-weight: ${props => props.bold ? 'bold' : 'normal'};

	cursor: ${props => props.copyable ? 'pointer' : 'normal'};
	color: ${props => props.copyable ? '#3A68DE' : props.theme.textPrimary};

	${CellWrapper}:not(:last-child) & {
		border-right: 1px solid #3C87AA;
	}
`;

const Header = styled.div`
	${Cell} {
		font-size: 14px;	
	}
`;

const WalletTransactions = ({ isLoading, accounts, data }) => {
	if (accounts === undefined || isLoading === true)
		return 'loading';
	if (accounts.length === 0)
		return 'no accounts found';

	function getInput(input) {
		const inputInitials = input.substr(0, 10);

		switch (inputInitials) {
			case '0xd9f64981':
				return 'Contribute';
			case '0x827e6fd9':
				return 'Create order';
			case '0xa9059cbb':
				return 'BBit transfer';
			case '0x5743b65d':
				return 'Transaction Failed';
			case '0xae615e8f':
				return 'Confirmation';
			case '0x':
				return 'ETH transfer';
			default:
				return input;
		}
	}

	return (
		<Table>
			<Header>
				<Row>

					<CellWrapper>
						<Cell>
							TX Hash
						</Cell>
					</CellWrapper>
					<CellWrapper>
						<Cell>
							Date
						</Cell>
					</CellWrapper>
					<CellWrapper>
						<Cell>
							From
						</Cell>
					</CellWrapper>
					<CellWrapper>
						<Cell>
							To
						</Cell>
					</CellWrapper>
					<CellWrapper>
						<Cell>
							Input
						</Cell>
					</CellWrapper>
					<CellWrapper>
						<Cell>
							Value
						</Cell>
					</CellWrapper>
					<CellWrapper>
						<Cell>
							TX fee
						</Cell>
					</CellWrapper>
				</Row>
			</Header>
			{
				data.map((transaction, index) => (
					<Row key={index}>
						<CellWrapper>
							<CopyableText textToCopy={transaction.blockHash}>
								<Cell copyable>
									{transaction.hash}
								</Cell>
							</CopyableText>
						</CellWrapper>
						<CellWrapper>
							<Cell>
								{timeSince(transaction.timeStamp)}
							</Cell>
						</CellWrapper>
						<CellWrapper>
							<CopyableText textToCopy={transaction.from}>
								<Cell copyable>
									{transaction.from}
								</Cell>
							</CopyableText>
						</CellWrapper>
						<CellWrapper>
							<CopyableText textToCopy={transaction.to}>
								<Cell copyable>
									{transaction.to}
								</Cell>
							</CopyableText>
						</CellWrapper>
						<CellWrapper>
							<Cell>
								{getInput(transaction.input)}
							</Cell>
						</CellWrapper>
						<CellWrapper>
							<Cell bold>
								{transaction.input !== '0x' ? convertToBiobit(transaction.value) : +transaction.value / Math.pow(10, 18)}
							</Cell>
						</CellWrapper>
						<CellWrapper>
							<Cell>
								{(+transaction.gasUsed * +transaction.gasPrice) / Math.pow(10, 18)}
							</Cell>
						</CellWrapper>
					</Row>
				))
			}
		</Table>
	);
};

export default WalletTransactions;
