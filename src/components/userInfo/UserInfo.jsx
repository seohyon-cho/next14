import clsx from 'clsx';
import styles from './userInfo.module.scss';
import { getUser } from '@/lib/actions';
import Image from 'next/image';

export default async function UserInfo({ username }) {
	const user = await getUser(username);
	console.log('userInfo', user);
	return (
		<article className={clsx(styles.userInfo)}>
			<h1>{user.username}</h1>
			<p>{user.email}</p>
			<div className={styles.pic}>
				<Image src={user.img} width={50} height={50} alt={user.username} />
			</div>
		</article>
	);
}
