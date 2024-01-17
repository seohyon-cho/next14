import { connectDB } from './connectDB';
import { Post } from './Models';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const getPosts = async id => {
	try {
		connectDB();
		let posts = null;
		if (id) posts = await Post.findById(id);
		else posts = await Post.find();

		return posts;
	} catch (err) {
		console.log(err);
		throw new Error('Fail to fetch All posts data!!');
	}
};

export const addPost = async formData => {
	'use server';

	const { title, img, desc } = Object.fromEntries(formData);

	try {
		connectDB();
		const newPost = new Post({ title, img, desc });
		await newPost.save();
	} catch (err) {
		console.log(err);
		throw new Error('Fail to save Post!');
	}

	revalidatePath('/post');
	redirect('/post');
};
