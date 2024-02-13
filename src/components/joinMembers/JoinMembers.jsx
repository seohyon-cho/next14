'use client';
import clsx from 'clsx';
import styles from './joinMembers.module.scss';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addUser } from '@/lib/actions';
import { FaArrowRightLong } from 'react-icons/fa6';
import { BiMessageError } from 'react-icons/bi';

export default function JoinMembers() {
	const [state, formAction] = useFormState(addUser, undefined);
	const router = useRouter();

	useEffect(() => {
		state?.success && router.push('/login');
	}, [state?.success, router]);

	return (
		<div className={clsx(styles.joinWrap)}>
			<ul className={clsx(styles.contactInfo)}>
				<li className={clsx(styles.btn)}>
					<span>
						<FaArrowRightLong className={clsx(styles.icon)} />
					</span>
					email Us
				</li>
				<li className={clsx(styles.btn)}>
					<span>
						<FaArrowRightLong className={clsx(styles.icon)} />
					</span>
					Call Us
				</li>
				<li className={clsx(styles.text)}>
					416.3849286
					<br />
					250 Spinmaker Way
					<br />
					Units 2-5
					<br />
					Concard, ON Canada
					<br />
					L4k aP9
				</li>
			</ul>
			<form className={clsx(styles.joinMembers)} action={formAction}>
				<div className={clsx(styles.inputSet)}>
					<label htmlFor='username'>username</label>
					<input type='text' name='username' id='username' />
				</div>
				<div className={clsx(styles.inputSet)}>
					<label htmlFor='email'>email</label>
					<input type='email' name='email' id='email' />
				</div>
				<div className={clsx(styles.inputSet)}>
					<label htmlFor='password'>password</label>
					<input type='password' name='password' id='password' />
				</div>
				<div className={clsx(styles.inputSet)}>
					<label htmlFor='repassword'>repassword</label>
					<input type='password' name='repassword' id='repassword' />
				</div>
				<div className={clsx(styles.inputSet, styles.last)}>
					<label htmlFor='addmessage'>Want to know more? Drop us a line!</label>
					<textarea name='addmessage' cols='30' rows='10' id='addmessage' />
				</div>
				<p className={clsx(styles.errorTxt)}>
					{state?.error} {state?.error && <BiMessageError className={clsx(styles.icon)} />}
				</p>
				<div className={clsx(styles.btnSet)}>
					<input type='reset' value='cancel' />
					<input type='submit' value='register' />
				</div>
			</form>
		</div>
	);
}
