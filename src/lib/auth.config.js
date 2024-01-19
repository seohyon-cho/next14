export const authConfig = {
	pages: {
		signIn: '/login'
	},
	providers: [],
	callbacks: {
		// 인증 완료후 실행할 콜백함수
		//jwt방식으로 인증정보 토큰에 옮겨담는 함수
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		//토큰값을 전달받아 전역 session 객체로 반환함수
		async session({ session, token }) {
			if (token) session.user.id = token.id;
			return session;
		},
		//인증처리시에만 접근가능한 URL 설정
		authorized({ auth, request }) {
			const user = auth?.user;
			const isPostPage = request.nextUrl?.pathname.startsWith('/post');

			const isLoginPage = request.nextUrl?.pathname.startsWith('/login');

			if (isPostPage && !user) return Response.redirect(new URL('/', request.nextUrl));
			else if (isLoginPage && user) return Response.redirect(new URL('/', request.nextUrl));
			return true;
		}
	}
};
