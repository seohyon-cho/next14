import clsx from 'clsx';
import styles from './postDetail.module.scss';
import { getPosts } from '@/lib/actions';

export default async function PostDetail({ params }) {
	const { id } = params;
	const post = await getPosts(id);
	console.log(post);

	return (
		<section className={clsx(styles.postDetail)}>
			<h1>PostDetail</h1>
		</section>
	);
}
