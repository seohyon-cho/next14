import clsx from 'clsx';
import styles from './edit.module.scss';
import { getPosts, updatePost } from '@/lib/actions';

export default async function Edit({ params }) {
	const { id } = params;
	const data = await getPosts(id);
	return (
		<section className={clsx(styles.edit)}>
			<h1>edit</h1>
			<form action={updatePost}>
				<input type='hidden' name='id' value={id} />
				<input type='text' name='title' defaultValue={data.title} />
				<input type='text' name='img' defaultValue={data.img || ''} />
				<textarea name='desc' cols='30' rows='3' defaultValue={data.desc}></textarea>

				<nav>
					<input type='reset' value='cancel' />
					<input type='submit' value='update' />
				</nav>
			</form>
		</section>
	);
}
