'use client';

/*
	client 방식으로 컴포넌트를 설정해도 ('use client';), 일단 초기의 최초 한 번은 서버 쪽에서 렌더링된 다음에 넘어오게 됨. 

	hydration : 정적인 데이터로 우선 기능 없이 서버 쪽에서 preRender 해서 빠르게 화면 상에만 출력한 다음, client 컴포넌트의 기능이 동작할 준비가 되면, 그때 client 컴포넌트의 기능을 활용할 수 있는 동적인 컴포넌트로 자연스럽게 변경 처리. 

	(hydration에서의 주의점 : 서버쪽에서 렌더링된 결과값과, 초기 client 컴포넌트에서 동작되는 결과값이 동일해야 함.)
			해결방법 (1) : useEffect를 이용해서 컴포넌트가 마운트될 때에만 특정 state 값을 활성화 시키고, 해당 값이 활성화 될 때에만 클라이언트에서 활용할 값을 호출하는 방법 
*/

import clsx from 'clsx';
import styles from './navbar.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar({ textArr }) {
	const time = new Date().getTime();
	const [Client, setClient] = useState(false);

	useEffect(() => {
		setClient(true);
	}, []);

	const pathName = usePathname();
	return (
		<nav className={clsx(styles.navbar)}>
			<h2>{Client && time}</h2>
			{textArr.map(txt => (
				<Link key={txt} href={`/${txt}`} className={clsx(pathName === '/' + txt ? styles.on : '')}>
					{txt.charAt(0).toUpperCase() + txt.slice(1)}
				</Link>
			))}
		</nav>
	);
}
