import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { timeSince, convertToBiobit, CopyableText, getInput } from '../../utils';
import Pagination from '../../components/Pagination';

const Table = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: ${(props) => props.theme.spacing(3)};
	overflow: auto;
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
		flex: 1 0 90px; /* value */
	}
	${CellWrapper}:nth-of-type(7) {
		flex: 0 0 170px; /* fee */
	}
`;

const Cell = styled.div`
	display: flex;
	align-items: center;
	min-height: 48px;
	padding: ${(props) => props.theme.spacing(0.6)} ${(props) => props.theme.spacing(1)};
	font-size: 12px;
	height: 40px;
	width: 100%;
	word-break: break-word;
	font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
	overflow: hidden;
	cursor: ${(props) => (props.copyable ? 'pointer' : 'normal')};
	color: ${(props) => (props.copyable ? '#3A68DE' : props.theme.textPrimary)};

	${CellWrapper}:not(:last-child) & {
		border-right: 1px solid #3c87aa;
	}
`;

const NoTransactions = styled.div`
	width: 100%;
	background: white;
	border-radius: 8px;
	padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(1)};
`;

const Header = styled.div`
	${Cell} {
		font-size: 14px;
	}
`;

const SkeletonCol = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: flex-start;
`;
const skeletonLineHeight = 16;

const useStyles = makeStyles({
	root: {
		background: '#F1F6FC',
	},
});

const WalletTransactions = ({ isLoading, account, data, props, PAGE_SIZE }) => {
	const [currentPage, setCurrentPage] = useState(1);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
		const lastPageIndex = firstPageIndex + PAGE_SIZE;
		return Object.values(data)
			.sort((a, b) => +b.requestID - +a.requestID)
			.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, PAGE_SIZE, data]);

	const classes = useStyles(props);
	if (!account) return 'no accounts found';

	console.log('currentTableData', currentTableData);

	return (
		<>
			<Table>
				<Header>
					<Row>
						<CellWrapper>
							<Cell>
								{isLoading ? (
									<Skeleton
										variant="rect"
										width={55}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								) : (
									'TXN Hash'
								)}
							</Cell>
						</CellWrapper>
						<CellWrapper>
							<Cell>
								{isLoading ? (
									<Skeleton
										variant="rect"
										width={45}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								) : (
									'Date'
								)}
							</Cell>
						</CellWrapper>
						<CellWrapper>
							<Cell>
								{isLoading ? (
									<Skeleton
										variant="rect"
										width={45}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								) : (
									'From'
								)}
							</Cell>
						</CellWrapper>
						<CellWrapper>
							<Cell>
								{isLoading ? (
									<Skeleton
										variant="rect"
										width={30}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								) : (
									'To'
								)}
							</Cell>
						</CellWrapper>
						<CellWrapper>
							<Cell>
								{isLoading ? (
									<Skeleton
										variant="rect"
										width={45}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								) : (
									'Input'
								)}
							</Cell>
						</CellWrapper>
						<CellWrapper>
							<Cell>
								{isLoading ? (
									<Skeleton
										variant="rect"
										width={45}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								) : (
									'Value'
								)}
							</Cell>
						</CellWrapper>
						<CellWrapper>
							<Cell>
								{isLoading ? (
									<Skeleton
										variant="rect"
										width={45}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								) : (
									'TXN fee'
								)}
							</Cell>
						</CellWrapper>
					</Row>
				</Header>
				{isLoading &&
					[1, 2, 3].map((index) => (
						<Row key={index}>
							<CellWrapper>
								<CopyableText>
									<Cell copyable>
										<SkeletonCol>
											<Skeleton
												variant="rect"
												width={'100%'}
												height={skeletonLineHeight}
												className={classes.root}
											/>
											<Skeleton
												variant="rect"
												width={'95%'}
												height={skeletonLineHeight}
												className={classes.root}
											/>
										</SkeletonCol>
									</Cell>
								</CopyableText>
							</CellWrapper>
							<CellWrapper>
								<Cell>
									<Skeleton
										variant="rect"
										width={'55%'}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								</Cell>
							</CellWrapper>
							<CellWrapper>
								<CopyableText>
									<Cell copyable>
										<SkeletonCol>
											<Skeleton
												variant="rect"
												width={'100%'}
												height={skeletonLineHeight}
												className={classes.root}
											/>
											<Skeleton
												variant="rect"
												width={'70%'}
												height={skeletonLineHeight}
												className={classes.root}
											/>
										</SkeletonCol>
									</Cell>
								</CopyableText>
							</CellWrapper>
							<CellWrapper>
								<CopyableText>
									<Cell copyable>
										<SkeletonCol>
											<Skeleton
												variant="rect"
												width={'100%'}
												height={skeletonLineHeight}
												className={classes.root}
											/>
											<Skeleton
												variant="rect"
												width={'75%'}
												height={skeletonLineHeight}
												className={classes.root}
											/>
										</SkeletonCol>
									</Cell>
								</CopyableText>
							</CellWrapper>
							<CellWrapper>
								<Cell>
									<Skeleton
										variant="rect"
										width={'100%'}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								</Cell>
							</CellWrapper>
							<CellWrapper>
								<Cell bold>
									<Skeleton
										variant="rect"
										width={'25%'}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								</Cell>
							</CellWrapper>
							<CellWrapper>
								<Cell>
									<Skeleton
										variant="rect"
										width={'70%'}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								</Cell>
							</CellWrapper>
						</Row>
					))}

				{!isLoading && currentTableData.length ? (
					currentTableData.map((transaction, index) => {
						console.log(
							transaction.input.substr(0, 10),
							convertToBiobit(transaction.value),
							+transaction.value / Math.pow(10, 18)
						);
						return (
							<Row key={index}>
								<CellWrapper>
									<CopyableText textToCopy={transaction.blockHash}>
										<Cell copyable>{transaction.hash}</Cell>
									</CopyableText>
								</CellWrapper>
								<CellWrapper>
									<Cell>{timeSince(transaction.timeStamp)}</Cell>
								</CellWrapper>
								<CellWrapper>
									<CopyableText textToCopy={transaction.from}>
										<Cell copyable>{transaction.from}</Cell>
									</CopyableText>
								</CellWrapper>
								<CellWrapper>
									<CopyableText textToCopy={transaction.to}>
										<Cell copyable>{transaction.to}</Cell>
									</CopyableText>
								</CellWrapper>
								<CellWrapper>
									<Cell>{getInput(transaction.input)}</Cell>
								</CellWrapper>
								<CellWrapper>
									<Cell bold>
										{transaction.input !== '0x'
											? convertToBiobit(transaction.value)
											: +transaction.value / Math.pow(10, 18)}
									</Cell>
								</CellWrapper>
								<CellWrapper>
									<Cell>{(+transaction.gasUsed * +transaction.gasPrice) / Math.pow(10, 18)}</Cell>
								</CellWrapper>
							</Row>
						);
					})
				) : (
					<Row>
						<NoTransactions>You don't have any transactions on this account in Zarela.</NoTransactions>
					</Row>
				)}
			</Table>

			<Pagination
				currentPage={currentPage}
				totalCount={Object.values(data).length}
				pageSize={PAGE_SIZE}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</>
	);
};

export default WalletTransactions;
