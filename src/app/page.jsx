import clsx from 'clsx';
import styles from './main.module.scss';
import { FaGithub } from 'react-icons/fa';

export default function Home() {
	return (
		<main className={clsx(styles.main)}>
			<div className={clsx(styles.center)}>
				<h1>
					Titans of the
					<br />
					Mavericks
					<br />
					waves
				</h1>
			</div>
			<div className={clsx(styles.bottom)}>
				<div className={clsx(styles.left)}>
					<h3>2024</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi delectus placeat voluptatem fugit! Optio, ipsa placeat rerum distinctio
						mollitia blanditiis corporis recusandae sed saepe minima! Distinctio, enim corrupti. Eum, provident!
					</p>
				</div>
				<div className={clsx(styles.right)}>
					<div className={clsx(styles.text)}>
						<h3>Seohyon, Cho</h3>
						<p>Front-end Project</p>
					</div>
					<FaGithub className={clsx(styles.icon)} />
				</div>
			</div>
		</main>
	);
}
