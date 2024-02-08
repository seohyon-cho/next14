'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from './connectDB';
import { Post, User } from './Models';
import { redirect } from 'next/navigation';
import { signIn, signOut } from './auth';
import bcrypt from 'bcryptjs';

export const getPosts = async id => {
	try {
		connectDB();
		let posts = null;
		if (id) posts = await Post.findById(id);
		return posts;
	} catch (err) {
		console.log(err);
		throw new Error('Fail to fetch All posts data!!');
	}
};

export const getPostsPage = async page => {
	const nums = 6;

	try {
		connectDB();
		const total = await Post.find().sort({ _id: -1 }).count();
		const posts = await Post.find()
			.sort({ _id: -1 })
			.limit(nums)
			.skip(nums * (page - 1));
		return { total, posts, nums };
	} catch (err) {
		console.log(err);
		throw new Error('Fail to fetch All posts data!!');
	}
};

export const addPost = async formData => {
	const result = Object.fromEntries(formData);
	const { title, img, desc, email } = result;

	try {
		connectDB();
		const newPost = new Post({ title, img, desc, email: email });
		console.log('newPost', newPost);
		await newPost.save();
	} catch (err) {
		console.log(err);
		throw new Error('Fail to save Post!');
	}

	revalidatePath('/post');
	redirect('/post');
};

export const deletePost = async formData => {
	try {
		connectDB();
		const data = Object.fromEntries(formData);

		const id = Object.keys(data)[0];

		await Post.findByIdAndDelete(id);
	} catch (err) {
		console.log(err);
		throw new Error('Fail to delete Post');
	}

	revalidatePath('/post');
	redirect('/post');
};

export const updatePost = async formData => {
	const { id, title, img, desc } = Object.fromEntries(formData);
	const updateObject = { title, img, desc };

	try {
		connectDB();
		await Post.findByIdAndUpdate(id, updateObject);
	} catch (err) {
		console.log(err);
		throw new Error('Fail to Update Post!!');
	}

	revalidatePath('/post');
	redirect('/post');
};

export const getUser = async email => {
	try {
		connectDB();
		const user = await User.findOne({ email: email });

		return user;
	} catch (err) {
		console.log(err);
		throw new Error('Fail to fetch User Info!');
	}
};

export const addUser = async (previousState, formData) => {
	const { username, email, password, img, repassword, addmessage } = Object.fromEntries(formData);

	if (password !== repassword) return { error: 'Passwords do not match' };

	try {
		connectDB();

		const user = await User.findOne({ username });

		if (user) return { error: 'Username already exists' };

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			img,
			addmessage
		});

		await newUser.save();
		console.log('saved to db');

		return { success: true };
	} catch (err) {
		console.log(err);
		return { error: 'Something went wrong!' };
	}
};

export const handleLogin = async (prevState, formData) => {
	console.log('handleLogin');
	const { username, password } = Object.fromEntries(formData);
	console.log('인증값', username, password);

	try {
		await signIn('credentials', { username, password });
		revalidatePath('/');
		redirect('/');
	} catch (err) {
		console.log('인증에러');
		console.log(err);

		if (err.message.includes('CredentialsSignin')) {
			return { error: 'Invalid username or password' };
		}
		throw err;
	}
};

export const handleGitHubLogin = async () => {
	await signIn('github');
};

export const handleGoogleLogin = async () => {
	await signIn('google');
};

export const handleLogout = async () => {
	'use server';
	await signOut();
	revalidatePath('/');
	redirect('/');
};
