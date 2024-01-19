import clsx from 'clsx';
import styles from './login.module.scss';
import LoginForm from '@/components/loginForm/LoginForm';
import { handleGitHubLogin, handleGoogleLogin } from '@/lib/actions';

export default function Login() {
	return (
		<section className={clsx(styles.login)}>
			<form action={handleGitHubLogin}>
				<button>Github Login</button>
			</form>
			<form action={handleGoogleLogin}>
				<button>Google Login</button>
			</form>
			<LoginForm />
		</section>
	);
}
