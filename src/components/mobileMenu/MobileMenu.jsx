'use client';
import clsx from 'clsx';
import styles from './mobileMenu.module.scss';
import { useGlobalData } from '@/hooks/useGlobalData';
import { useEffect } from 'react';
import { useThrottle } from '@/hooks/useThrottle';
import Navbar from '../navbar/Navbar';
import BtnLogin from '../btnLogin/BtnLogin';

export default function MobileMenu({ session }) {
	const { MenuOpen, setMenuOpen } = useGlobalData();
	// useThrottle 커스텀 훅으로부터 throttling 적용 함수를 반환 받아 setThrottle 로 재정의.
	const setThrottle = useThrottle();

	useEffect(() => {
		const closePanel = () => {
			const width = window.innerWidth;
			if (width >= 1000) setMenuOpen(false);
		};

		// closePanel 함수에 throttling 적용
		const throttledClosePanel = setThrottle(closePanel);

		window.addEventListener('resize', throttledClosePanel);
		return () => window.removeEventListener('resize', throttledClosePanel);
	}, [setMenuOpen, setThrottle]);

	return (
		<>
			{MenuOpen && (
				<aside className={clsx(styles.mobileMenu)} onClick={() => setMenuOpen(false)}>
					<h1>MobileMenu</h1>
					<Navbar textArr={session?.user ? ['about', 'youtube', 'post'] : ['about', 'youtube', 'join']} session={session} />
					<BtnLogin session={session} />
				</aside>
			)}
		</>
	);
}
