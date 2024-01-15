import clsx from 'clsx';
import styles from './about.module.scss';

export default function About() {
	// throw new Error('Error in About Page...');
	return (
		<section className={clsx(styles.about)}>
			<h1>About</h1>
		</section>
	);
}
