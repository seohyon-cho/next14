import clsx from 'clsx';
import styles from './post.module.scss';
import { getPosts } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';

export default async function Post() {
	const posts = await getPosts();

	return (
		<section className={clsx(styles.post)}>
			<h1>Post</h1>
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
