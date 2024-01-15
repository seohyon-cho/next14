import clsx from 'clsx';
import styles from './main.module.scss';

export default function Home() {
	return (
		<main className={clsx(styles.main)}>
			<h1>메인 페이지</h1>
		</main>
	);
}
