import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import copyImage from '../../assets/icons/copy.svg';
import { timeSince, convertToBiobit, getInput, CopyableText } from '../../utils';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '../../components/Pagination';

const Wrapper = styled.div`
	width: 100%;
	padding: 0;
	background: #fff;
`;

const TransactionCard = styled.div`
	border: 1px solid #c4c4c4;
	border-left: 4px solid ${(props) => props.status};
	padding: 16px 14px;
	margin: ${(props) => props.theme.spacing(2)} 0;
	border-radius: 3px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const TransactionRow = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	margin-bottom: ${(props) => props.theme.spacing(2)};
	align-items: center;
`;

const TitleCol = styled.div`
	font-size: 10px;
	line-height: 13px;
	min-width: 40px;
`;

const HashCol = styled.div`
	flex-grow: 1;
	font-size: 12px;
	line-height: 14px;
	color: #3a68de;
	overflow-wrap: anywhere;
	padding: 0 15px;
`;
const TextCol = styled(HashCol)`
	color: #121213;
	max-width: ${(props) => (props.title ? '165px' : 'unset')};
	height: ${(props) => (props.title ? '100%' : 'unset')};
	white-space: ${(props) => (props.title ? 'nowrap' : 'unset')};
	overflow: ${(props) => (props.title ? 'hidden' : 'unset')};
	font-size: ${(props) => (props.title ? '16px' : '')};
	line-height: ${(props) => (props.title ? '20.8px' : '')};
	font-weight: ${(props) => (props.title ? '400' : '')};
`;

const ValueCol = styled(HashCol)`
	font-weight: 600;
	font-size: 18px;
	line-height: 20px;
	color: #121213;
`;

const IconCol = styled.img`
	width: 25px;
	height: 25px;
`;

const SkeletonCol = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: flex-start;
`;
const skeletonLineHeight = 12;

const useStyles = makeStyles({
	root: {
		background: '#F1F6FC',
	},
});

const WalletTransactionsMobile = ({ isLoading, account, data, props, PAGE_SIZE }) => {
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
		<Wrapper>
			{isLoading &&
				[1, 2, 3].map((index) => {
					return (
						<TransactionCard>
							<TransactionRow>
								<TitleCol>
									<SkeletonCol>
										<Skeleton
											variant="rect"
											width={'80%'}
											height={skeletonLineHeight}
											className={classes.root}
										/>
										<Skeleton
											variant="rect"
											width={'60%'}
											height={skeletonLineHeight}
											className={classes.root}
										/>
									</SkeletonCol>
								</TitleCol>
								<HashCol>
									<SkeletonCol>
										<Skeleton
											variant="rect"
											width={'100%'}
											height={skeletonLineHeight}
											className={classes.root}
										/>
										<Skeleton
											variant="rect"
											width={'100%'}
											height={skeletonLineHeight}
											className={classes.root}
										/>
										<Skeleton
											variant="rect"
											width={'80%'}
											height={skeletonLineHeight}
											className={classes.root}
										/>
									</SkeletonCol>
								</HashCol>

								<CopyableText>
									<Skeleton
										variant="rect"
										width={24}
										height={skeletonLineHeight + 12}
										className={classes.root}
									/>
								</CopyableText>
							</TransactionRow>

							<TransactionRow>
								<TitleCol>
									<Skeleton
										variant="rect"
										width={'65%'}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								</TitleCol>
								<TextCol>
									<Skeleton
										variant="rect"
										width={'45%'}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								</TextCol>
							</TransactionRow>
							<TransactionRow>
								<TitleCol>
									<Skeleton
										variant="rect"
										width={'70%'}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								</TitleCol>
								<HashCol>
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
								</HashCol>
								<CopyableText>
									<Skeleton
										variant="rect"
										width={24}
										height={skeletonLineHeight + 12}
										className={classes.root}
									/>
								</CopyableText>
							</TransactionRow>
							<TransactionRow>
								<TitleCol>
									<Skeleton
										variant="rect"
										width={'70%'}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								</TitleCol>
								<TextCol>
									<Skeleton
										variant="rect"
										width={'75%'}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								</TextCol>
							</TransactionRow>
							<TransactionRow>
								<TitleCol>
									<Skeleton
										variant="rect"
										width={'40%'}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								</TitleCol>
								<HashCol>
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
								</HashCol>
								<CopyableText>
									<Skeleton
										variant="rect"
										width={24}
										height={skeletonLineHeight + 12}
										className={classes.root}
									/>
								</CopyableText>
							</TransactionRow>
							<TransactionRow>
								<TitleCol>
									<Skeleton
										variant="rect"
										width={'70%'}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								</TitleCol>
								<ValueCol>
									<Skeleton
										variant="rect"
										width={'100%'}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								</ValueCol>
							</TransactionRow>
							<TransactionRow>
								<TitleCol>
									<Skeleton
										variant="rect"
										width={'70%'}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								</TitleCol>
								<ValueCol>
									<Skeleton
										variant="rect"
										width={'20%'}
										height={skeletonLineHeight}
										className={classes.root}
									/>
								</ValueCol>
							</TransactionRow>
						</TransactionCard>
					);
				})}

			{!isLoading &&
				currentTableData.map((transaction, index) => (
					<TransactionCard key={index} status="#F62D76">
						<TransactionRow>
							<TitleCol></TitleCol>
							<TextCol title>{getInput(transaction.input)}</TextCol>
						</TransactionRow>
						<TransactionRow>
							<TitleCol>TXN Hash</TitleCol>
							<HashCol>{transaction.blockHash}</HashCol>
							<CopyableText textToCopy={transaction.blockHash}>
								<IconCol src={copyImage} />
							</CopyableText>
						</TransactionRow>
						<TransactionRow>
							<TitleCol>Date</TitleCol>
							<TextCol>{timeSince(transaction.timeStamp)}</TextCol>
						</TransactionRow>
						<TransactionRow>
							<TitleCol>From</TitleCol>
							<HashCol>{transaction.from}</HashCol>
							<CopyableText textToCopy={transaction.from}>
								<IconCol src={copyImage} />
							</CopyableText>
						</TransactionRow>
						<TransactionRow>
							<TitleCol>TXN fee</TitleCol>
							<TextCol>{(+transaction.gasUsed * +transaction.gasPrice) / Math.pow(10, 18)}</TextCol>
						</TransactionRow>
						<TransactionRow>
							<TitleCol>To</TitleCol>
							<HashCol>{transaction.to}</HashCol>
							<CopyableText textToCopy={transaction.to}>
								<IconCol src={copyImage} />
							</CopyableText>
						</TransactionRow>
						<TransactionRow>
							<TitleCol>Value</TitleCol>
							<ValueCol>
								{transaction.input !== '0x'
									? convertToBiobit(transaction.value)
									: +transaction.value / Math.pow(10, 18)}
							</ValueCol>
						</TransactionRow>
					</TransactionCard>
				))}
			<Pagination
				currentPage={currentPage}
				totalCount={Object.values(data).length}
				pageSize={PAGE_SIZE}
				onPageChange={(page) => setCurrentPage(page)}
				isMobile={true}
			/>
		</Wrapper>
	);
};

export default WalletTransactionsMobile;
