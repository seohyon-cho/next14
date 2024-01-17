'use client';
import { createContext, useContext, useState } from 'react';
export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
	const [MenuOpen, setMenuOpen] = useState(false);
	const [ImgPanelOpen, setImgPanelOpen] = useState(false);

	return <GlobalContext.Provider value={{ MenuOpen, setMenuOpen, ImgPanelOpen, setImgPanelOpen }}>{children}</GlobalContext.Provider>;
}

export function useGlobalData() {
	const globalData = useContext(GlobalContext);
	return globalData;
}
