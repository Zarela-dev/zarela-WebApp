export const utilsSlice = (set, get) => ({
	isMobile: null,
	isMobileSearchModalShow: null,
	guideIsOpen: null,
	notificationCount: null,
	// zarelaCurrentDay: null,

	setIsMobile: (isMobile) => set(state => ({ ...state, isMobile })),
	setIsMobileSearchModalShow: (isMobileSearchModalShow) => set(state => ({ ...state, isMobileSearchModalShow })),
	setGuideIsOpen: (guideIsOpen) => set(state => ({ ...state, guideIsOpen })),
	setNotificationCount: (notificationCount) => set(state => ({ ...state, notificationCount })),
	// setZarelaCurrentDay: (zarelaCurrentDay) => set(state => ({ ...state, zarelaCurrentDay })),
});
