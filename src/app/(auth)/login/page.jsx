import clsx from 'clsx';
import styles from './login.module.scss';
import LoginForm from '@/components/loginForm/LoginForm';
import { handleGitHubLogin, handleGoogleLogin } from '@/lib/actions';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
	return (
		<>
			<section className={clsx(styles.background)}></section>

			<section className={clsx(styles.login)}>
				<h2>Login</h2>
				<LoginForm />
				<div className={clsx(styles.loginTxt)}>
					<p>or Login With</p>
				</div>
				<article className={clsx(styles.loginSet)}>
					<form action={handleGitHubLogin}>
						<button className={clsx(styles.git)}>
							<FaGithub className={clsx(styles.icon)} />
							Github Login
						</button>
					</form>
					<form action={handleGoogleLogin}>
						<button className={clsx(styles.google)}>
							<FcGoogle className={clsx(styles.icon)} />
							Google Login
						</button>
					</form>
				</article>
			</section>
		</>
	);
}
