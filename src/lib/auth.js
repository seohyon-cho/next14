import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { connectDB } from './connectDB';
import { User } from './Models';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

const checkUserDB = async credentials => {
	try {
		connectDB();
		const user = await User.findOne({ username: credentials.username });
		if (!user) throw new Error('there is no username yout input in DB!!');

		const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
		if (!isPasswordCorrect) throw new Error('now matched password from DB!');
		return user;
	} catch (err) {
		console.log(err);
		throw new Error('Failed to login!');
	}
};

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
					const user = await checkUserDB(credentials);
					return user;
				} catch (err) {
					return null;
				}
			}
		}),
		Github({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
		})
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			if (account.provider === 'github') {
				connectDB();
				try {
					const user = await User.findOne({ username: profile.login });

					if (!user) {
						let tempUser = {
							username: profile.login,
							email: profile.email,
							img: profile.avatar_url
						};

						if (profile.email === 'flanique@naver.com') {
							tempUser = { ...tempUser, owner: true };
						}
						const newUser = new User(tempUser);

						await newUser.save();
					}
				} catch (err) {
					console.log(err);
					return false;
				}
			}
			if (account.provider === 'google') {
				connectDB();

				try {
					const user = await User.findOne({ email: profile.email });

					if (!user) {
						const newUser = new User({
							username: profile.name,
							email: profile.email,
							img: profile.picture
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

/*
	NextAuth()메서드 호출시의 전달되는 인수값
	pages: 로그인 요청이 시작되는 라우터등록 (auth.config)
	providers: credentials, github, google등 vender정보 기입
	callbacks: 로그인인증 결과후 동기적으로 실행될 함수들
	---signIn() : 로그인이 성공했을때 실행될 함수, 로그인정보 추출 및 DB저장
	---jwt() : siginIn함수에서 추출한 정보값을 token에 옮겨담음
	---session() : 넘겨받은 token값을 전역 session에 등록
	---authorized() : 최종 로그인인증 결과에 따라 true, false값을 반환 (auth.config)

	------------------------------------------------------------
	middleware.js : NextAuth에서 authorized()가 반환하는 true, false값에 따라 강제 라우터 이동처리 (auth.config에 등록된 pages, authorized값 필요)
*/
