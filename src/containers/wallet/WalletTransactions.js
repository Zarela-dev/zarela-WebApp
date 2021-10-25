import React, { useState, useMemo, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { isValidInput } from '../../utils/helpers';
import { getStatusColor } from '../../utils/transactionInput';
import { timeSince, convertToBiobit, CopyableText, getInput } from '../../utils';
import Pagination from '../../components/Pagination';
import { BodyText } from './../../components/Elements/Typography';

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

const getStatus = (props) => {
	if (props.isError && props.isError !== '0')
		return css`
			color: ${props.theme.colors.error} !important;
		`;
	else if (props.status !== null)
		return css`
			color: ${props.status} !important;
		`;
	else return props.theme.textPrimary;
};

const InputCellWrapper = styled(CellWrapper)`
	& * {
		${(props) => getStatus(props)};
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
	background: ${props => props.theme.colors.bgWhite};
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
						return (
							<Row key={index}>
								<CellWrapper>
									<CopyableText textToCopy={transaction.hash}>
										<Cell copyable>
											<BodyText variant="hash">{transaction.hash}</BodyText>
										</Cell>
									</CopyableText>
								</CellWrapper>
								<CellWrapper>
									<Cell>
										<BodyText variant="extraSmall">{timeSince(transaction.timeStamp)}</BodyText>
									</Cell>
								</CellWrapper>
								<CellWrapper>
									<CopyableText textToCopy={transaction.from}>
										<Cell copyable>
											<BodyText variant="hash">{transaction.from}</BodyText>
										</Cell>
									</CopyableText>
								</CellWrapper>
								<CellWrapper>
									<CopyableText textToCopy={transaction.to}>
										<Cell copyable>
											<BodyText variant="hash">{transaction.to}</BodyText>
										</Cell>
									</CopyableText>
								</CellWrapper>
								<InputCellWrapper
									isError={transaction.isError}
									status={getStatusColor(getInput(transaction.input))}
								>
									{isValidInput(transaction.input) || transaction.input === 'BBit transfer' ? (
										<Cell>
											{`${getInput(transaction.input)} ${
												transaction.isError && transaction.isError !== '0' ? '(failed)' : ''
											}`}
										</Cell>
									) : (
										<CopyableText textToCopy={transaction.input}>
											<Cell copyable>
												{`${transaction.input.substr(0, 10)} ${
													transaction.isError && transaction.isError !== '0' ? '(failed)' : ''
												}`}
											</Cell>
										</CopyableText>
									)}
								</InputCellWrapper>
								<CellWrapper>
									<Cell bold>
										<BodyText variant="extraSmall" fontWeight="bold">
											{transaction.input !== '0x'
												? convertToBiobit(transaction.value)
												: +transaction.value / Math.pow(10, 18)}
										</BodyText>
									</Cell>
								</CellWrapper>
								<CellWrapper>
									<Cell>
										<BodyText variant="extraSmall">
											{(+transaction.gasUsed * +transaction.gasPrice) / Math.pow(10, 18)}
										</BodyText>
									</Cell>
								</CellWrapper>
							</Row>
						);
					})
				) : (
					<Row width="100%">
						<BodyText variant="small" width="100%" bg="white" p={3}>
							You don't have any transactions on this account in Zarela.
						</BodyText>
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
