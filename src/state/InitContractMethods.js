import { formatUnits } from '@ethersproject/units';
import { useEffect } from 'react';
import { convertToBiobit } from '../utils';
import { useStore } from './store';

const InitContractMethods = () => {
	const { contract, account, contractPermission, setBiobitBalance, setEthBalance, connectorHooks } = useStore();
	const { useProvider } = connectorHooks;
	const provider = useProvider();

	useEffect(() => {
		if (contract !== null && account !== null) {
			if (contractPermission === 'wr') {
				contract
					.balanceOf(account)
					.then((balance) => {
						setBiobitBalance(convertToBiobit(balance.toNumber()));
					})
					.catch((error) => {
						console.error(error.message);
					});

				provider
					.getBalance()
					.then((balance) => {
						setEthBalance(formatUnits(balance.toNumber(), 'ether'));
					})
					.catch((error) => {
						console.error(error.message);
					});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contract, account]);

	return null;
};

export default InitContractMethods;
