import clsx from 'clsx';
import styles from './header.module.scss';
import Link from 'next/link';
import Navbar from '../navbar/Navbar';
import dynamic from 'next/dynamic';

/*
	기존 client 방식의 컴포넌트를 import 시, {ssr: false} 를 통해 서버 쪽에서 pre-build 자체가 되지 않도록 설정
	(그러나 아예 pre-build 자체를 막게 되면, 데이터를 많이 가져오는 무거운 작업이 담겨있는 경우 될 때까지 사용자에게는 빈 화면이 뜨므로 추천하지는 않는 방식)
*/

const NoSsrNavbar = dynamic(() => import('@/components/navbar/Navbar'), { ssr: false });

export default function Header() {
	return (
		<header className={clsx(styles.header)}>
			<h1>
				<Link href='/'>DCODELAB</Link>
			</h1>
			<NoSsrNavbar textArr={['about', 'youtube', 'post']} />
		</header>
	);
}
