import { Flex, Box, Image } from 'rebass/styled-components';
import { BodyText } from '../../Elements/Typography';
import { STATUS } from '../../../state/slices/connectorSlice';
import styled from 'styled-components';
import { useStore } from '../../../state/store';
import { detectWallet } from '../../../utils/detectWallet';
import spinner from '../../../assets/loader/rolling.svg';
import { ThemeButton } from '../../Elements/Button';
import { getConnectorHooks } from '../../../utils/getConnectorHooks';
import { addressClipper } from '../../../utils/normalizeAddress';
import { activateConnector } from '../../../utils/activateConnector';

const Card = styled(Box)`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	border-radius: 8px;
	background-color: #F7F7F7;
	border: 1px solid #eaeaea;
	padding: ${({ theme }) => `${theme.space[3]}px`}};
	margin-bottom: ${({ theme }) => `${theme.space[3]}px`}};
	width: 100%;
`;

const Loader = styled.img`
	width: 25px;
`;

const DetailsState = ({ name, walletId, address, deactivate, change }) => {
	return (
		<Card>
			<Flex flexDirection={'column'} alignItems="flex-start">
				<BodyText variant="hint" fontWeight="600">
					Connected with {name}
				</BodyText>
				<BodyText variant="small">{addressClipper(address)}</BodyText>
			</Flex>
			<Box flex="1" />
			<Flex flexDirection={'column'}>
				<ThemeButton
					variant="primary"
					size="small"
					onClick={change}
					sx={{
						minWidth: '90px !important',
						marginBottom: 2,
					}}
				>
					change
				</ThemeButton>
				{walletId === 'WALLETCONNECT' && (
					<ThemeButton
						variant="secondary"
						size="small"
						onClick={deactivate}
						sx={{
							minWidth: '90px !important',
						}}
					>
						disconnect
					</ThemeButton>
				)}
			</Flex>
		</Card>
	);
};

const ActiveState = ({ name, logo, onClick, disabled }) => {
	return (
		<Card
			onClick={disabled ? () => {} : onClick}
			sx={{
				cursor: disabled ? 'not-allowed' : 'pointer',
				opacity: disabled ? 0.5 : 1,
			}}
		>
			<Box
				sx={{
					width: 10,
					height: 10,
					borderRadius: '50%',
					backgroundColor: 'success',
					marginRight: 2,
				}}
			></Box>
			<BodyText variant="small" fontWeight="600">
				{name}
			</BodyText>
			<Box flex="1" />
			<Image
				sx={{
					width: 32,
				}}
				src={logo}
				alt={name}
			/>
		</Card>
	);
};

const InProgressState = ({ logo, name }) => {
	return (
		<Card>
			<Loader src={spinner} />
			<BodyText variant="small" fontWeight="600">
				Initializing ...
			</BodyText>
			<Box flex="1" />
			<Image
				sx={{
					width: 32,
				}}
				src={logo}
				alt={name}
			/>
		</Card>
	);
};

const DefaultState = ({ name, logo, onClick, disabled }) => {
	return (
		<Card
			onClick={disabled ? () => {} : onClick}
			sx={{
				cursor: disabled ? 'not-allowed' : 'pointer',
				opacity: disabled ? 0.5 : 1,
			}}
		>
			<BodyText variant="small" fontWeight="600">
				{name}
			</BodyText>
			<Box flex="1" />
			<Image
				sx={{
					width: 32,
				}}
				src={logo}
				alt={name}
			/>
		</Card>
	);
};

const WalletItem = ({ view, name, logo, changeView, walletId, connector, disabled }) => {
	const { activeConnector, connectorInProgress, connectorStatus, setActiveConnector } = useStore();
	const { useAccount } = getConnectorHooks(activeConnector);
	const account = useAccount();
	const isActive = detectWallet(activeConnector) === walletId;
	const isInProgress = detectWallet(connectorInProgress) === walletId;

	return (
		<Box>
			{view === 'list' ? (
				<Flex>
					{isActive && connectorStatus === STATUS.CONNECTED ? (
						<ActiveState
							name={name}
							logo={logo}
							disabled={disabled}
							onClick={() => {
								changeView(walletId);
							}}
						/>
					) : isInProgress && connectorStatus === STATUS.INIT_CONNECTOR ? (
						<InProgressState logo={logo} name={name} />
					) : (
						<DefaultState
							logo={logo}
							name={name}
							disabled={disabled}
							onClick={async () => {
								if (disabled) return;
								await activateConnector(connector, setActiveConnector);
							}}
						/>
					)}
				</Flex>
			) : (
				<Flex>
					<DetailsState
						name={name}
						logo={logo}
						walletId={walletId}
						address={account}
						change={() => {
							changeView('list');
						}}
						deactivate={async () => {
							await connector.deactivate();
							changeView('list');
						}}
					/>
				</Flex>
			)}
		</Box>
	);
};

export default WalletItem;
