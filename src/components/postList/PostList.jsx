import clsx from 'clsx';
import styles from './postList.module.scss';
import Pagination from '../pagination/Pagination';
import Link from 'next/link';
import Image from 'next/image';
import { getPostsPage } from '@/lib/actions';

export default async function PostList({ searchParams }) {
	const page = searchParams?.page || 1;
	const { total, posts, nums } = await getPostsPage(page);

	return (
		<section className={clsx(styles.postList)}>
			<Pagination total={total} nums={nums} />
			<nav>
				<Link href='/post/write'>Write Post</Link>
			</nav>

			{posts.map(post => (
				<article key={post._id}>
					<div className={clsx(styles.pic)}>{post.img && <Image src={post.img} alt={post.title} priority fill />}</div>
					<h2>
						<Link href={`/post/${post._id}`}>{post.title}</Link>
					</h2>
					<p>{post.desc}</p>
				</article>
			))}
		</section>
	);
}
