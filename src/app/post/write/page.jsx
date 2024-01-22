import clsx from 'clsx';
import styles from './write.module.scss';
import { addPost } from '@/lib/actions';
import InputImage from '@/components/inputImage/InputImage';
import { auth } from '@/lib/auth';

export default async function Write() {
	const session = await auth();
	console.log('write', session.user.email);
	return (
		<>
			<section className={clsx(styles.write)}>
				<h1>Write Post</h1>

				<form action={addPost}>
					<input type='hidden' name='email' defaultValue={session.user.email} />
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

/*
	포스트저장시 글작성자 정보 같이 저장하는 로직 흐름
	1. app/post/write -> auth객체에서 로그인된 사용자정보인 session을 가져와서 email값을 input에 hidden숨겨서 addPost 서버액션함수로 전달
	2. lib/actions.js (addPost) -> 파라미터로 email값을 받아서 email값 추가해서 모델 인스턴스 생성후 DB에 저장
	3. app/post/[id] -> 상세페이지 접속시 getPosts 서버액션 함수로 상세포스트 정보 가져옴
	4. <UserInfo /> -> 상세페이지 안쪽의 해당 컴포넌트의 email값을 props로 전달 (동기화를 위해 Suspense활용)
	5. components > userInfo (getUser) -> getUser서버 액션함수가 email값을 전달받아서 해당 유저정보객체 반환
	6. 반환된 유저정보를 userInfo컴포넌트에 원하는 형태로 출력
*/
