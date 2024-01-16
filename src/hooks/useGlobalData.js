'use client';
import { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext();
export function GlobalProvider({ children }) {
	const [MenuOpen, setMenuOpen] = useState(false);
	return <GlobalContext.Provider value={{ MenuOpen, setMenuOpen }}>{children}</GlobalContext.Provider>;
}

export function useGlobalData() {
	const globalData = useContext(GlobalContext);
	return globalData;
}