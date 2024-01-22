export const authConfig = {
	pages: { signIn: '/login' },
	providers: [],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.owner = token.email === 'flanique@naver.com' ? true : false;
				//console.log('auth', token);
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id;
				session.user.owner = token.owner;
			}
			return session;
		},
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
