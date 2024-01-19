/*
  Next 에서의 로그인 인증 흐름

  - Session : (쿠키랑 비슷한 개념.) 서버 컴포넌트에서 생성되는 정보값. 
  - Session이 만들어지면 Token 도 같이 만들어지는데, 토큰값을 클라이언트 측에서 그 값을 기반으로 활용하여 인증 절차 처리. 
  - 클라이언트에 전달 받은 Session이 있으면, 로그인 됨. Session이 없으면 비로그인 상태. 

  - NextAuth 를 활용해서 특정 조건 부합 시, Next 프로젝트 전역에 Session 값을 활용할 수 있도록 return 처리. 
  - email, password 입력 방식 
      : DB에 직접 사용자가 입력한 정보를 받아서 저장한 뒤, 로그인 시도를 통해 해당 정보값을 Session에 전달하고, Session이 이 정보값을 분석하고 비교. 

      password 처럼 민감한 정보값은,  암호화처리해서 DB에 저장. 
      session 처리 시에도, 암호화된 값을 가지고 비교해서 인증처리함. 


  - 외부 SNS 계정을 연동한 로그인 처리 시에는, 해당 정보값들이 우리 서버가 아니라 해당 서비스 사(외부 SNS)의 서버에 저장되므로, 그 값을 역으로 가져와서 DB에 저장함. (but, 저장 시에 아이디, 이메일은 제공되지만 비밀번호에 대한 값은 받아볼 수 없으므로, --> user 정보 schema 생성 시, 비밀번호값은 optional (선택사항) 처리 해야 함. )
*/

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { connectDB } from './connectDB';
import { User } from './Models';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

//로그인 인증함수
const login = async credentials => {
	try {
		connectDB();

		const user = await User.findOne({ username: credentials.username });
		if (!user) throw new Error('Wrong credentials!');
		const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

		if (!isPasswordCorrect) throw new Error('Wrong credentials!');
		return user;
	} catch (err) {
		console.log(err);
		throw new Error('Failed to login!');
	}
};

//NextAuth의 리턴값을 바로 비구조화할당해서 export로 내보냄
export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut
} = NextAuth({
	...authConfig,
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				try {
					const user = await login(credentials);
					return user;
				} catch (err) {
					return null;
				}
			}
		})
	],
	//인증이 성공완료된 자동 실행될 callback함수(외부 autoConfig에서 가져옴)
	callbacks: {
		async signIn({ user, account, profile }) {
			if (account.provider === 'github') {
				conncetDB();
				try {
					const user = await User.findOne({ email: profile.email });

					if (!user) {
						const newUser = new User({
							username: profile.login,
							email: profile.email,
							image: profile.avatar_url
						});

						await newUser.save();
					}
				} catch (err) {
					console.log(err);
					return false;
				}
			}
			return true;
		},
		...authConfig.callbacks
	}
});
