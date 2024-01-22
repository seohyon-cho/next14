import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { connectDB } from './connectDB';
import { User } from './Models';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

//로그인정보 DB정보에서 찾아서 인증 함수
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

//NextAuth의 리턴값을 바로 비구조화할당해서 export로 내보냄
export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut
} = NextAuth({
	...authConfig,
	providers: [
		//기본 아이디 인증 Provider설정
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
		//github 인증 Provider설정
		Github({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		}),
		//google 인증 Provider설정
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
		})
	],
	//인증이 성공완료된 자동 실행될 callback함수(외부 autoConfig에서 가져옴)
	callbacks: {
		async signIn({ user, account, profile }) {
			if (account.provider === 'github') {
				connectDB();
				try {
					const user = await User.findOne({ email: profile.email });

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
				// console.log('googleProfile', profile); (google 계정에서 어떤 property로 정보값을 가져올 수 있는지 확인 가능)
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
		//기존 auth.config에 있는 callbacks는 override되면 안되기에 아래쪽에서 재 override처리
		...authConfig.callbacks
	}
});
