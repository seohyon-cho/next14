import clsx from 'clsx';
import styles from './post.module.scss';
import { getPosts } from '@/lib/actions';

export default async function Post() {
	await getPosts();
	return (
		<section className={clsx(styles.post)}>
			<h1>Post</h1>
		</section>
	);
}
