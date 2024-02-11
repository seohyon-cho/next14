import clsx from 'clsx';
import styles from './userInfo.module.scss';
import { getUser } from '@/lib/actions';
import Image from 'next/image';

export default async function UserInfo({ email }) {
	//console.log('UserInfo', email);
	const user = await getUser(email);
	return (
		<article className={clsx(styles.userInfo)}>
			<p>{user?.email}</p>
			<div className={styles.pic}>
				<Image
					src={
						user?.img
							? user?.img
							: 'https://emojiisland.com/cdn/shop/products/Nerd_with_Glasses_Emoji_2a8485bc-f136-4156-9af6-297d8522d8d1_large.png?v=1571606036'
					}
					width={50}
					height={50}
					alt={user?.email}
				/>
			</div>
		</article>
	);
}
