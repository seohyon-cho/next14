import clsx from 'clsx';
import styles from './postDetail.module.scss';
import { getPosts } from '@/lib/actions';
import Image from 'next/image';

export default async function PostDetail({ params }) {
	const { id } = params;
	const post = await getPosts(id);
	console.log(post);

	return (
		<section className={clsx(styles.postDetail)}>
			<h1>PostDetail</h1>

			<article>
				<div className={clsx(styles.pic)}>{post.img && <Image src={post.img} alt={post.title} priority fill />}</div>
				<div className={clsx(styles.txt)}>
					<h2>{post.title}</h2>
					<p>{post.desc}</p>
					<span>{post.createdAt}</span>
				</div>
			</article>
		</section>
	);
}
