'use client';
import clsx from 'clsx';
import styles from './mobileMenu.module.scss';
import { useGlobalData } from '@/hooks/useGlobalData';
import { useEffect } from 'react';

export default function MobileMenu() {
	const { MenuOpen, setMenuOpen } = useGlobalData();

	useEffect(() => {
		const closePanel = () => {
			const width = window.innerWidth;
			if (width >= 1000) setMenuOpen(false);
		};

		window.addEventListener('resize', closePanel);
		return () => window.removeEventListener('resize', closePanel);
	}, [setMenuOpen]);

	return (
		<>
			{MenuOpen && (
				<aside className={clsx(styles.mobileMenu)} onClick={() => setMenuOpen(false)}>
					<h1>MobileMenu</h1>
				</aside>
			)}
		</>
	);
}
