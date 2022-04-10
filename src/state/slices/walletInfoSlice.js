export const walletInfoSlice = (set, get) => ({
	bbitBalance: null,
	ethBalance: null,
	setBbitBalance: (bbitBalance) => set({ bbitBalance }),
	setEthBalance: (ethBalance) => set({ ethBalance }),
});
