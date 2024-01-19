import clsx from 'clsx';
import styles from './login.module.scss';
import LoginForm from '@/components/loginForm/LoginForm';
import { handleGitHubLogin } from '@/lib/actions';

export default function Login() {
	return (
		<section className={clsx(styles.login)}>
			{/* 서버액션을 연동하려면, 무조건 form 태그로 감싸진 요소에만 서버 액션을 연동해서 보낼 수 있음. */}
			<form action={handleGitHubLogin}>
				<button>GitHub Login</button>
			</form>
			<LoginForm />
		</section>
	);
}
