import create from 'zustand';
import { connectorSlice, utilsSlice, walletInfoSlice } from './slices';
import { persist } from 'zustand/middleware';

export const useStore = create(
	persist(
		(set, get) => ({
			...connectorSlice(set, get),
			...utilsSlice(set, get),
			...walletInfoSlice(set, get),
		}),
		{
			name: 'app-store',
			partialize: (state) => ({
				connectorStatus: state.connectorStatus,
				activeConnectorType: state.activeConnectorType,
			}),
		}
	)
);
