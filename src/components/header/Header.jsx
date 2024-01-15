'use client';
import clsx from 'clsx';
import styles from './header.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
	const pathName = usePathname();
	console.log(pathName);
	return (
		<header className={clsx(styles.header)}>
			<h1>
				<Link href='/'>DCODELAB</Link>
			</h1>

			<nav>
				<Link href='/about' className={clsx(pathName === '/about' ? styles.on : '')}>
					About
				</Link>
				<Link href='/youtube' className={clsx(pathName === '/youtube' ? styles.on : '')}>
					Youtube
				</Link>
				<Link href='/post' className={clsx(pathName === '/post' ? styles.on : '')}>
					Post
				</Link>
			</nav>
		</header>
	);
}
