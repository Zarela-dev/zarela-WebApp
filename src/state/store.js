import create from 'zustand';
import { connectorSlice, utilsSlice, walletInfoSlice } from './slices';

export const useStore = create((set, get) => ({
	...connectorSlice(set, get),
	...utilsSlice(set, get),
	...walletInfoSlice(set, get),
}));
