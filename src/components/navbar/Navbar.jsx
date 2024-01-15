'use client';
import clsx from 'clsx';
import styles from './navbar.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCustomText } from '@/hooks/useText';

export default function Navbar({ textArr }) {
	// 커스텀 훅은 클라이언트 기반 컴포넌트에서만 쓸 수 있음.
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
