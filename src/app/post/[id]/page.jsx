import clsx from 'clsx';
import styles from './postDetail.module.scss';

export default function PostDetail({ params }) {
	const [id] = params;
	return (
		<section className={clsx(styles.postDetail)}>
			<h1>PostDetail</h1>
		</section>
	);
}
