import React from 'react';
import { useStore } from '../state/store';
import Dialog from './Dialog';

const ConnectorModal = () => {
	const store = useStore((store) => ({ status: store.status }));

	return <Dialog isOpen={true} title={'connect to wallet'} content={store.status} />;
};

export default ConnectorModal;
