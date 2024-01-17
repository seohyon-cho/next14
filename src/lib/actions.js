import { connectDB } from './connectDB';
import { Post } from './Models';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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

export const deletePost = async formData => {
	'use server';

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
	'use server';

	//수정페이지에서 입력한 input항목들을 받아서 객체로 비구조화할당
	const { id, title, img, desc } = Object.fromEntries(formData);
	//전달받은 각각의 값들을 새로운 객체로 wrapping 처리
	// { title:title, img:img, desc:desc}
	const updateObject = { title, img, desc };

	try {
		connectDB();
		//모델명.findByIdAndUpdate('ObjectId.value', {수정할 document의 key: 수정할value, ...})
		await Post.findByIdAndUpdate(id, updateObject);
	} catch (err) {
		console.log(err);
		throw new Error('Fail to Update Post!!');
	}

	revalidatePath('/post');
	redirect('/post');
};
