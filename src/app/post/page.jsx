import clsx from 'clsx';
import styles from './post.module.scss';

export default function Post() {
	return (
		<section className={clsx(styles.post)}>
			<h1>Post</h1>
		</section>
	);
}
