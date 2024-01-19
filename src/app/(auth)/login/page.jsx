import clsx from 'clsx';

import styles from './login.module.scss';

import LoginForm from '@/components/loginForm/LoginForm';

export default function Login() {
	return (
		<section className={clsx(styles.login)}>
			<LoginForm />
		</section>
	);
}
