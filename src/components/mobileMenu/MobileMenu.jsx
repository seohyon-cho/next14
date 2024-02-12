'use client';
import clsx from 'clsx';
import styles from './mobileMenu.module.scss';
import { useGlobalData } from '@/hooks/useGlobalData';
import { useEffect, useState } from 'react';
import { useThrottle } from '@/hooks/useThrottle';
import { FaCaretRight } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import UserInfo from '../userInfo/UserInfo';

export default function MobileMenu({ session }) {
	const textArr = session?.user ? ['about', 'youtube', 'post'] : ['about', 'youtube', 'join'];
	const { MenuOpen, setMenuOpen } = useGlobalData();
	// useThrottle 커스텀 훅으로부터 throttling 적용 함수를 반환 받아 setThrottle 로 재정의.
	const setThrottle = useThrottle();
	console.log(session);

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
			<AnimatePresence>
				{MenuOpen && (
					<motion.aside
						initial={{ x: '-100%' }}
						animate={{ x: 0 }}
						exit={{ x: '-100%' }}
						transition={{ duration: 0.6 }}
						className={clsx(styles.mobileMenu)}
						onClick={() => setMenuOpen(false)}>
						<h1>Blog.</h1>
						<IoCloseOutline onClick={() => setMenuOpen(false)} className={clsx(styles.close)} />
						{/* <div className={clsx(styles.profile)}>
							{Session ? (
								<UserInfo email={Session?.user.email} />
							) : (
								<>
									<div className={clsx(styles.img)}></div>
									<p>Annonymous</p>
								</>
							)}
						</div> */}

						<ul>
							{textArr.map((data, idx) => (
								<li key={data + idx}>
									<Link href={`/${data}`}>
										{data}
										<FaCaretRight className={clsx(styles.arrow)} />
									</Link>
								</li>
							))}
						</ul>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	);
}
