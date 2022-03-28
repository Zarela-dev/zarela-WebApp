export const utilsSlice = (set, get) => ({
	isMobile: null,
	isMobileSearchModalShow: null,
	guideIsOpen: null,
	notificationCount: null,
	createRequestFormData: null,
	biobitBalance: null,

	setBiobitBalance: (biobitBalance) => set({ biobitBalance }),
	setCreateRequestFormData: (data) => set({ createRequestFormData: data }),
	setIsMobile: (isMobile) => set({ isMobile }),
	setIsMobileSearchModalShow: (isMobileSearchModalShow) => set((state) => ({ ...state, isMobileSearchModalShow })),
	setGuideIsOpen: (guideIsOpen) => set((state) => ({ ...state, guideIsOpen })),
	setNotificationCount: (notificationCount) => set((state) => ({ ...state, notificationCount })),
});
