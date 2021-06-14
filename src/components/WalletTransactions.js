import React from 'react';
import styled from 'styled-components';
import { Scrollbar } from './Elements/Scrollbar';
import { timeSince } from '../utils';

const Wrapper = styled.div`
	padding: ${props => props.theme.spacing(2.5)} ${props => props.theme.spacing(2)};
	background: #F4F8FE;
	border-radius: 8px;
`;

const Table = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: ${props => props.theme.spacing(3)};
`;

const CellWrapper = styled.div`
	flex: 1;
	padding: 5px;
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
		flex: 0 0 62px;
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

	${CellWrapper}:not(:last-child) & {
		border-right: 1px solid #3C87AA;
	}
`;

const FilesListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${props => props.theme.spacing(1)};
	margin-bottom: ${props => props.theme.spacing(2)};
	height: 100%;
`;

const FilesList = styled.div`
	flex: 1;
	border-left: 1px solid #3C87AA;
    margin-left: -21px;
    padding-left: 20px;
	max-height: 238px;
	min-height: 27px;
    overflow: auto;

	${Scrollbar};
`;

const FileItem = styled.div`
	flex: 1;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	font-size: 12px;
	line-height: 20px;
	color: #121213;
	&:not(:last-child) {
		margin-bottom: ${props => props.theme.spacing(2)};
	}
`;



const WalletTransactions = ({ data }) => {
	console.log(data);
	return (
		<Wrapper>
			<Table>
				<Row>
					<CellWrapper>
						<Cell>
							TXN Hash
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
							Status
						</Cell>
					</CellWrapper>
					<CellWrapper>
						<Cell>
							Value
						</Cell>
					</CellWrapper>
					<CellWrapper>
						<Cell>
							TXN fee
						</Cell>
					</CellWrapper>
				</Row>
				{
					data.map((transaction, index) => (
						<Row key={index}>
							<CellWrapper>
								<Cell>
									{transaction.blockhash}
								</Cell>
							</CellWrapper>
							<CellWrapper>
								<Cell>
									{timeSince(transaction.timeStamp)}
								</Cell>
							</CellWrapper>
							<CellWrapper>
								<Cell>
									{transaction.from}
								</Cell>
							</CellWrapper>
							<CellWrapper>
								<Cell>
									{transaction.to}
								</Cell>
							</CellWrapper>
							<CellWrapper>
								<Cell>
									N/A
								</Cell>
							</CellWrapper>
							<CellWrapper>
								<Cell>
									{transaction.value}
								</Cell>
							</CellWrapper>
							<CellWrapper>
								<Cell>
									{+transaction.gasUsed * +transaction.gasPrice}
								</Cell>
							</CellWrapper>
						</Row>
					))
				}
			</Table>
		</Wrapper>
	);
};

export default WalletTransactions;
