import clsx from 'clsx';
import styles from './header.module.scss';
import Link from 'next/link';
import Navbar from '../navbar/Navbar';
import BtnLogin from '../btnLogin/BtnLogin';
// npm i react-icons

import BtnMenuToggle from '../btnMenuToggle/BtnMenuToggle';

export default function Header() {
	return (
		<header className={clsx(styles.header)}>
			<h1>
				<Link href='/'>DCODELAB</Link>
			</h1>

			<Navbar textArr={['about', 'youtube', 'post', 'join']} />
			<BtnLogin session={true} />
			<BtnMenuToggle />
		</header>
	);
}
