'use client';
import clsx from 'clsx';
import styles from './btnLogin.module.scss';
import Link from 'next/link';

export default function BtnLogin({ session }) {
	return (
		<>
			{!session ? (
				<Link href='/login' className={clsx(styles.btn, styles.btnLogin)}>
					Login
				</Link>
			) : (
				<button className={clsx(styles.btn, styles.btnLogout)}>Logout</button>
			)}
		</>
	);
}
