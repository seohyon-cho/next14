import clsx from 'clsx';
import styles from './post.module.scss';
import PostList from '@/components/postList/PostList';
import { Suspense } from 'react';
import { CgSearchLoading } from 'react-icons/cg';

export default async function Post({ searchParams }) {
	return (
		<section className={clsx(styles.post)}>
			<Suspense
				fallback={
					<article style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', width: '100%', height: '100vh' }}>
						<h1 style={{ fontSize: '1.6rem' }}>Loading for Post Page ...</h1>
						<span>
							<CgSearchLoading style={{ fontSize: '2.8rem' }} />
						</span>
					</article>
				}>
				<h1>
					Express
					<br /> your thoughts.
				</h1>
				<PostList />
			</Suspense>
		</section>
	);
}
