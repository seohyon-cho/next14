'use client';
import clsx from 'clsx';
import styles from './navbar.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCustomText } from '@/hooks/useText';

export default function Navbar({ textArr }) {
	const setCapitalize = useCustomText('capitalize');
	const pathName = usePathname();
	return (
		<nav className={clsx(styles.navbar)}>
			{textArr.map(txt => (
				<Link key={txt} href={`/${txt}`} className={clsx(pathName === '/' + txt ? styles.on : '')}>
					{setCapitalize(txt)}
				</Link>
			))}
		</nav>
	);
}
