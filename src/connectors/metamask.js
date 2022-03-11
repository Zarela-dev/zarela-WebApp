import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';

export const [MMConnector, MMHooks, MMStore] = initializeConnector((actions) => new MetaMask(actions));
