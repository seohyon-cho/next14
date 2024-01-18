import clsx from 'clsx';
import styles from './write.module.scss';
import { addPost } from '@/lib/actions';
import InputImage from '@/components/inputImage/InputImage';

export default function Write() {
	return (
		<>
			<section className={clsx(styles.write)}>
				<h1>Write Post</h1>

				<form action={addPost}>
					<input type='text' placeholder='title' name='title' />
					<InputImage />
					<textarea name='desc' cols='30' rows='3' placeholder='description'></textarea>

					<nav>
						<input type='reset' value='cancel' />
						<input type='submit' value='write' />
					</nav>
				</form>
			</section>
		</>
	);
}
