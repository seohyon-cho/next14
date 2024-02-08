import clsx from 'clsx';
import styles from './join.module.scss';
import JoinMembers from '@/components/joinMembers/JoinMembers';

export default function Join() {
	return (
		<section className={clsx(styles.join)}>
			<h1 className={clsx(styles.title)}>Join Us</h1>
			<JoinMembers />
		</section>
	);
}
