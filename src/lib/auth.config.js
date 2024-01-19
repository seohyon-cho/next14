//굳이  auth.config파일을 따로 분리한 이유
//해당 파일은 middleware.js에서 authConfig객체의 결과값만 따로 활용하기 위함

export const authConfig = {
	pages: {
		//signIn함수가 실행될때 기본으로 redirect되는 path지정
		signIn: '/login'
	},
	//auth에 spread로 합쳐질때 기존 provider가 override할것이므로 빈배열지정
	providers: [],
	//해당 callback은 추후 따로 기존 auth를 아래쪽에서 override처리 예정
	callbacks: {
		//전달 받은 user정보를 빈 token객체에 옮겨담아서 리턴
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		//토큰값을 다시 전역 session에 넘겨서 리턴
		async session({ session, token }) {
			if (token) session.user.id = token.id;
			return session;
		},
		//인증처리시 redirect될 path를 조건지정
		//false 리턴시 위에 page로 지정한 /login으로 redirect
		//true 리턴시 middleware에 설정된 규칙에 의해 강제로 메인페이지 이동
		authorized({ auth, request }) {
			const user = auth?.user;
			const isPostPage = request.nextUrl?.pathname.startsWith('/post');
			const isLoginPage = request.nextUrl?.pathname.startsWith('/login');

			if (isPostPage && !user) return false;
			if (isLoginPage && user) return Response.redirect(new URL('/', request.nextUrl));
			return true;
		}
	}
};
