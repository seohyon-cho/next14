import clsx from 'clsx';
import styles from './header.module.scss';
import Link from 'next/link';
import Navbar from '../navbar/Navbar';
import BtnLogin from '../btnLogin/BtnLogin';
import BtnMenuToggle from '../btnMenuToggle/BtnMenuToggle';

export default async function Header({ session }) {
	return (
		<header className={clsx(styles.header)}>
			<h1>
				<Link href='/'>Blog.</Link>
			</h1>

			<Navbar textArr={session?.user ? ['about', 'youtube', 'post'] : ['about', 'youtube', 'join']} session={session} />
			<div className={clsx(styles.btnSet)}>
				<BtnLogin session={session} />
				<BtnMenuToggle />
			</div>
		</header>
	);
}
