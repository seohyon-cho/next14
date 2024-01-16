import { connectDB } from './connectDB';
import { Post } from './Models';

export const getPosts = async () => {
	try {
		console.log('클라이언트 요청에 의해 DB 접속 시작');
		connectDB();
	} catch (err) {
		console.log(err);
		throw new Error('Fail to fetch All posts data!!');
	}
};
