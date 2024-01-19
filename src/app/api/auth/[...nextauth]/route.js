/*
  만약, 서버에서 모델 데이터 생성을 api 라우터에서 처리할 시, 해당 api route에서 get과 post 요청에 대한 session 응답 처리를 해주는 것이 맞지만, 
  현재 프로젝트 구조에서는 모든 서버데이터를 api 라우터가 아닌, lib 안쪽에 있는 server action.js에서 처리하고 있기 때문에,
  프로젝트의 효율적인 관리를 위해, lib 폴더 안쪽의 auth.js에서 get, post 요청에 대한 서버 응답 함수를 만들어서 export 해준 내용을, 
  /api 라우터에서 import 하자마자 바로 export 처리.  
*/

export { GET, POST } from '@/lib/auth';

/*
  1. next-auth v5설치
  2. .env에 환경변수 등록 (AUTH_SECRET, AUTH_URL)
  3. AUTH_URL에 등록된 주소로 서버인증요청을 보내야함 api/auth/[...nextauth]/route.js 작성
  4. lib> auth.config.js등록 (추후 auth.js에서 활용될 설정코드를 따로 파일로 분리)
  5. 위에서 만든 config내용을 auth.js에서 합침 -> GET, POST응답에 대한 함수를 api>auth -> route.js에 전달
  -----------인증을 위한 모든 설정 완료-----------------
  
*/
