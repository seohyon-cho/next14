import clsx from 'clsx';
import styles from './footer.module.scss';
import { FaTwitter, FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { handleLogout } from '@/lib/actions';

export default async function Footer() {
	const session = await auth();
	return (
		<footer className={clsx(styles.footer)}>
			<h1 className={clsx(styles.footerTitle)}>Blog.</h1>
			<ul className={clsx(styles.menu)}>
				<li>
					<Link href={`/`}>HOME</Link>
				</li>
				<li>
					<Link href={`/about`}>ABOUT</Link>
				</li>
				<li>
					<Link href={`/youtube`}>YOUTUBE</Link>
				</li>
				{!session ? (
					<li>
						<Link href={`/join`}>JOIN</Link>
					</li>
				) : (
					<li>
						<Link href={`/post`}>POST</Link>
					</li>
				)}
				{!session ? (
					<li>
						<Link href={`/login`}>LOGIN</Link>
					</li>
				) : (
					<li>
						<form action={handleLogout}>
							<button className={clsx(styles.btn, styles.btnLogout)}>LOGOUT</button>
						</form>
					</li>
				)}
			</ul>
			<ul className={clsx(styles.mediaIcons)}>
				<li>
					<a href='https://twitter.com/' target='_blank' rel='noopener noreferrer'>
						<FaTwitter />
					</a>
				</li>
				<li>
					<a href='https://https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
						<FaFacebookSquare />
					</a>
				</li>
				<li>
					<a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
						<FaInstagram />
					</a>
				</li>
			</ul>
			<p>Copyright &copy;2024 All rights reserved | This Website is made with Next14</p>
		</footer>
	);
}
