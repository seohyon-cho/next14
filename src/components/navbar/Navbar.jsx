'use client';
import clsx from 'clsx';
import styles from './navbar.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ textArr }) {
	const pathName = usePathname();
	return (
		<nav className={clsx(styles.navbar)}>
			{textArr.map(txt => (
				<Link key={txt} href={`/${txt}`} className={clsx(pathName === '/' + txt ? styles.on : '')}>
					{txt.charAt(0).toUpperCase() + txt.slice(1)}
				</Link>
			))}
		</nav>
	);
}
