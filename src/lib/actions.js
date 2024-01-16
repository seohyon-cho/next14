import { connectDB } from './connectDB';
import { Post } from './Models';

export const getPosts = async id => {
	try {
		console.log('클라이언트 요청에 의해 DB 접속 시작');
		connectDB();
		let posts = null;
		if (id) {
			posts = await Post.findById(id);
		} else {
			posts = await Post.find();
		}

		return posts;
	} catch (err) {
		console.log(err);
		throw new Error('Fail to fetch All posts data!!');
	}
};
