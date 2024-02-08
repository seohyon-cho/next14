import clsx from 'clsx';
import styles from './post.module.scss';
import PostList from '@/components/postList/PostList';
import { Suspense } from 'react';

export default async function Post({ searchParams }) {
	return (
		<section className={clsx(styles.post)}>
			<h1>Post</h1>
			<Suspense fallback={<p>Loading...</p>}>
				<PostList />
			</Suspense>
		</section>
	);
}
