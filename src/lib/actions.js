'use server';
/*
	해당 액션 함수 파일에서, 서버 컴포넌트뿐만 아니라, 클라이언트 컴포넌트에서도 호출하는 함수가 있다면, 
	'use server'; 를 각각의 함수 안쪽에 입력하는 것이 아니라, actions.js 파일 자체의 상단에 한 번에 등록해야 함. (추천하는 방법)

	또는, 클라이언트 컴포넌트에서 호출하는 action 함수 자체를 아예 다른 파일로 분리해야 함. 
*/

import { connectDB } from './connectDB';
import { Post, User } from './Models';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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

//인수로 받은 현재 페이지번호에 따라 다음의 정보를 반환하는 함수
//{전체 데이터갯수, 출력될 포스트 배열, 현재페이지에 보일 데이터 갯수}
export const getPostsPage = async page => {
	const nums = 3;

	try {
		connectDB();
		const total = await Post.find().sort({ _id: -1 }).count();
		const posts = await Post.find()
			.sort({ _id: -1 })
			.limit(nums) //nums갯수만큼 데이터 출력 제한
			.skip(nums * (page - 1)); //현재 페이지 번호에 따라 출력한 데이터 시작순번 지정해서 스킵할 데이터수 지정
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

// npm install bcryptjs (bcrypt 설치 명령어)
// User 관련 actions
export const addUser = async formData => {
	const { username, email, img, password, repassword } = Object.fromEntries(formData);
	if (password !== repassword) return;

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	try {
		connectDB();
		const newUser = new User({ username, email, img, password: hashedPassword });
		await newUser.save();
	} catch (err) {
		console.log(err);
		throw new Error('Fail to save User Data!');
	}

	revalidatePath('/');
	redirect('/');
};
