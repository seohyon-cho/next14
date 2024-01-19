import clsx from 'clsx';
import styles from './header.module.scss';
import Link from 'next/link';
import Navbar from '../navbar/Navbar';
import BtnLogin from '../btnLogin/BtnLogin';
import BtnMenuToggle from '../btnMenuToggle/BtnMenuToggle';
import { auth } from '@/lib/auth';

export default async function Header() {
	const session = await auth();

	return (
		<header className={clsx(styles.header)}>
			<h1>
				<Link href='/'>DCODELAB</Link>
			</h1>

			<Navbar textArr={['about', 'youtube', 'post', 'join']} session={session} />
			<BtnLogin session={false} />
			<BtnMenuToggle />
		</header>
	);
}
