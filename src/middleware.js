//middleware.js를 설정하는 이유
//Next에서 라우터 이동하기전 미들웨어를 설정하여 특정 조건에 부합되지 못하면 해당 라우터의 이동을 원천적으로 막기 위함 (보안 라우터 설정)
import NextAuth from 'next-auth';
import { authConfig } from './lib/auth.config';

export default NextAuth(authConfig).auth;

export const config = {
	matcher: ['/((?!api|static|.*\\..*|_next).*)']
};

/*
	위에 설정한 matcher 조건 규칙 (아래의 조건을 제외한 모든 외에는 '/'경로로 이동)
  - api (api 라우터 요청)
  - _next/static (static 파일 요청)
  - _next/image (next Image 요청)
  - favicon.ico (favicon 파일 요청)
*/
