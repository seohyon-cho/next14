import clsx from 'clsx';
import styles from './join.module.scss';
import JoinMembers from '@/components/joinMembers/JoinMembers';

export default function Join() {
	return (
		<section className={clsx(styles.join)}>
			<h1>Join</h1>
			<JoinMembers />
		</section>
	);
}
