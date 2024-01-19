'use client';
import clsx from 'clsx';
import styles from './btnLogin.module.scss';

export default function BtnLogin({ session }) {
	const test = async () => {
		await fetch('/api/auth');
	};
	return (
		<button onClick={test} className={clsx(styles.btn, session ? styles.btnLogout : styles.btnLogin)}>
			{session ? 'Logout' : 'Login'}
		</button>
	);
}
