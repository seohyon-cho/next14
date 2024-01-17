import clsx from 'clsx';
import styles from './edit.module.scss';

export default function Edit({ params }) {
	const { id } = params;
	return (
		<section className={clsx(styles.edit)}>
			<h1>edit</h1>
			<p>{id}</p>
		</section>
	);
}
