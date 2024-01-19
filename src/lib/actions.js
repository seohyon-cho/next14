'use server';
/*
	해당 액션 함수 파일에서, 서버 컴포넌트뿐만 아니라, 클라이언트 컴포넌트에서도 호출하는 함수가 있다면, 
	'use server'; 를 각각의 함수 안쪽에 입력하는 것이 아니라, actions.js 파일 자체의 상단에 한 번에 등록해야 함. (추천하는 방법)

	또는, 클라이언트 컴포넌트에서 호출하는 action 함수 자체를 아예 다른 파일로 분리해야 함. 
*/
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
		else posts = await Post.find().sort({ _id: -1 });
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
export const deletePost = async formData => {
	try {
		connectDB();
		const data = Object.fromEntries(formData);
		//const id = { _id: Object.keys(data)[0] };
		const id = Object.keys(data)[0];
		//findByAndDelete(id); id:삭제할 document의 _id의 value값 전달 (객체전달 아님)
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

//User 관련 actions
export const addUser = async formData => {
	const { username, email, img, password, repassword } = Object.fromEntries(formData);
	if (password !== repassword) return;
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	try {
		connectDB();
		const newUser = new User({ username, email, img, password: hashedPassword });
		await newUser.save();
		revalidatePath('/');
		redirect('/');
		return { success: true };
	} catch (err) {
		console.log(err);
		throw new Error('Fail to save User Data!');
	}
};

export const register = async (previousState, formData) => {
	const { username, email, password, img, repassword } = Object.fromEntries(formData);

	if (password !== repassword) {
		return { error: 'Passwords do not match' };
	}

	try {
		connectDB();

		const user = await User.findOne({ username });

		if (user) {
			return { error: 'Username already exists' };
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			img
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

export const handleLogout = async () => {
	'use server';
	await signOut();
	revalidatePath('/');
	redirect('/');
};
