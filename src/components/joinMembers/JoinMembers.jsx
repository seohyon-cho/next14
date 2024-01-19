'use client';
import clsx from 'clsx';
import styles from './joinMembers.module.scss';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addUser } from '@/lib/actions';

export default function JoinMembers() {
	const [state, formAction] = useFormState(addUser, undefined);
	const router = useRouter();

	useEffect(() => {
		state?.success && router.push('/login');
	}, [state?.success, router]);

	return (
		<form className={clsx(styles.joinMembers)} action={formAction}>
			<input type='text' name='username' placeholder='user name' />
			<input type='email' name='email' placeholder='email' />
			<input type='password' name='password' placeholder='password' />
			<input type='password' name='repassword' placeholder='re-password' />

			<input type='reset' value='cancel' />
			<input type='submit' value='register' />
			{state?.error}
		</form>
	);
}
