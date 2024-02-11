import clsx from 'clsx';
import styles from './edit.module.scss';
import { getPosts, updatePost } from '@/lib/actions';
import InputImage from '@/components/inputImage/InputImage';

export default async function Edit({ params }) {
	const { id } = params;
	const data = await getPosts(id);

	return (
		<section className={clsx(styles.edit)}>
			<h1>Edit Your Post!</h1>
			<div className={clsx(styles.inner)}>
				<form action={updatePost}>
					<input type='hidden' name='id' value={id} />
					<div>
						<label htmlFor='title'>
							<span>Title</span>
						</label>
						<input type='text' id='title' name='title' defaultValue={data.title} />
					</div>
					<div>
						<label htmlFor='img'>
							<span>Image</span>
						</label>
						<InputImage data={data} />
					</div>
					<div>
						<label htmlFor='detail'>
							<span>Detail</span>
						</label>
						<textarea name='desc' cols='30' rows='10' id='detail' defaultValue={data.desc}></textarea>
					</div>

					<nav>
						<input type='reset' value='cancel' />
						<input type='submit' value='update' />
					</nav>
				</form>
			</div>
		</section>
	);
}
