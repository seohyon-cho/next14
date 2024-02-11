import clsx from 'clsx';
import styles from './postDetail.module.scss';
import { deletePost, getPosts } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import UserInfo from '@/components/userInfo/UserInfo';
import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { LuFileEdit } from 'react-icons/lu';
import { RiDeleteBin6Line, RiArrowGoBackFill } from 'react-icons/ri';

export default async function PostDetail({ params }) {
	const { id } = params;
	const post = await getPosts(id);
	const session = await auth();
	console.log(JSON.stringify(post.createdAt));

	return (
		<>
			<Link href={`/post`}>
				<div className={clsx(styles.backBtn)}>
					<RiArrowGoBackFill />
				</div>
			</Link>
			<section className={clsx(styles.postDetail)}>
				<article>
					<div className={clsx(styles.pic)}>{post.img && <Image src={post.img} alt={post.title} priority fill />}</div>
					<div className={clsx(styles.txt)}>
						<h2>{post.title}</h2>
						<div className={clsx(styles.date)}>
							<p className={clsx(styles.writeDate)}>Creation date: {new Date(post.createdAt).toLocaleString()} </p>
							<p className={clsx(styles.editDate)}>Modification date: {new Date(post.updatedAt).toLocaleString()} </p>
						</div>
						{post && (
							<Suspense fallback={<p>Loading...</p>}>
								<UserInfo email={post.email} />
							</Suspense>
						)}
						<p className={clsx(styles.desc)}>{post.desc}</p>

						{(session?.user.email === post.email || session?.user.owner === true) && (
							<nav>
								<Link href={`/post/edit/${id}`}>
									<LuFileEdit />
								</Link>
								<form action={deletePost}>
									<nav>
										<input type='hidden' name={id} />
										<button>
											<RiDeleteBin6Line />
										</button>
									</nav>
								</form>
							</nav>
						)}
					</div>
				</article>
			</section>
		</>
	);
}
