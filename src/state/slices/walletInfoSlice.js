export const walletInfoSlice = (set, get) => ({
	BBITBalance: null,
	ETHBalance: null,
	setBBITBalance: (BBITBalance) => set({ BBITBalance }),
	setETHBalance: (ETHBalance) => set({ ETHBalance }),
});
