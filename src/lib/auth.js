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
						const newUser = new User({
							username: profile.login,
							email: profile.email,
							img: profile.avatar_url
						});

						await newUser.save();
					}
				} catch (err) {
					console.log(err);
					return false;
				}
			}
			if (account.provider === 'google') {
				console.log('google', account);
				console.log('google profile', profile);
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
	NextAuth() 메서드 호출 시 전달되는 인수 값 종류 및 의미 

	- pages : 로그인 요청이 시작 되는 라우터 등록 (auth.config)
	- providers : credentials, github, google등 vender 정보를 기입
	- callbacks : 로그인 인증 결과 후, 동기적으로 실행될 함수들
			- signIn() : 로그인이 성공했을 때 실행될 함수, 로그인 정보 추출 및 DB 저장
			- jwt() : signIn 함수에서 추출한 정보 값을 token에 옮겨담은 뒤 내보냄. 
			- session() : 넘겨 받은 token 값을 전역 session에 등록함. 
			- authorized() : 최종 로그인 인증 결과에 따라 true, false 값을 반환 (auth.config)

	------------------------

	- middleware.js : NextAuth에서 authorized()가 반환하는 true, false 값에 따라 강제 라우터 이동 처리 (auth.config에 등록된 pages, authorized값 필요)
			(	authorized, pages의 정보값을 필요로 하므로 이 둘에서 정보를 추출해서 미들웨어에서 활용. )

	로그인이 되어있으면 -> 강제로 메인 페이지로 이동
	로그인이 실패하면 -> 다시 로그인 페이지로 이동 


*/
