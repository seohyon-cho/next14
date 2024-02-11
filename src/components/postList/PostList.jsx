import clsx from 'clsx';
import styles from './postList.module.scss';
import Pagination from '../pagination/Pagination';
import Link from 'next/link';
import Image from 'next/image';
import { getPostsPage, getUser } from '@/lib/actions';
import UserInfo from '@/components/userInfo/UserInfo';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { auth } from '@/lib/auth';
import { TfiWrite } from 'react-icons/tfi';

export default async function PostList({ searchParams }) {
	const page = searchParams?.page || 1;
	const { total, posts, nums } = await getPostsPage(page);
	const session = await auth();

	return (
		<section className={clsx(styles.postList)}>
			<article className={clsx(styles.profile)}>
				<div className={clsx(styles.inner)}>
					<UserInfo email={session?.user.email} />
					<nav className={clsx(styles.writeBtn)}>
						<Link href='/post/write'>
							Click here to Write
							<TfiWrite className={clsx(styles.writeIcon)} />
						</Link>
					</nav>
				</div>
			</article>
			<article className={clsx(styles.posting)}>
				{posts.map(post => (
					<article key={post._id}>
						<div className={clsx(styles.pic)}>{post.img && <Image src={post.img} alt={post.title} priority fill />}</div>
						<div className={clsx(styles.txt)}>
							<h2>
								<Link href={`/post/${post._id}`}>{post.title}</Link>
							</h2>
							<UserInfo email={post.email} />
							<p>{post.desc}</p>
							<Link href={`/post/${post._id}`}>
								<div className={clsx(styles.btnDetail)}>
									<span>
										<FaArrowRightLong className={clsx(styles.icon)} />
										<IoSearch className={clsx(styles.icon2)} />
									</span>
									<p>Learn more</p>
								</div>
							</Link>
						</div>
					</article>
				))}
			</article>
			<Pagination total={total} nums={nums} className={clsx(styles.pagination)} />
		</section>
	);
}
