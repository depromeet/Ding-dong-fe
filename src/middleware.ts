import { NextRequest, NextResponse } from 'next/server';

import publicApi from '~/api/config/publicApi';
import { AUTH_COOKIE_KEYS, AuthResponse } from '~/types/auth';

import { generateCookiesKeyValues, getAccessToken } from './utils/auth/tokenHandlers';

export const ACCESS_TOKEN_EXPIRE_MARGIN_SECOND = 60;

// Authorization이 필요한 페이지 경로를 저장합니다.
const PRIVATE_ROUTES = ['/accounts'];

const isLogin = async (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers);
  const accessToken = request.cookies.get(AUTH_COOKIE_KEYS.accessToken)?.value;
  const accessTokenExpireDate = Number(
    request.cookies.get(AUTH_COOKIE_KEYS.accessTokenExpireDate)?.value,
  );
  return await getAccessToken({ accessToken, accessTokenExpireDate });
};

const middleware = async (request: NextRequest) => {
  // if (request.nextUrl.pathname.startsWith('/invitation')) {
  //   privateApi.get('/like/you');

  //   // 초대 코드 검사
  //   // const { planetId } = getInvitationCodeIsValid(1)
  //   console.log('invitation');
  //   const planetId = 1;
  //   if (planetId) {
  //     // 로그인 여부 확인하고 userId 값을 알아옴

  //     // post api를 이용해 행성 가입
  //     // postPlanetJoin({userId: 1, planetId: 1})

  //     // 캐릭터 생성 여부 api로 알아내기
  //     return NextResponse.redirect(new URL(`/planet/${planetId}`, request.url));
  //   } else {
  //     // 에러에서 처리할지, 아니면 여기서 처리할지 이야기해야 함
  //     // middleware에서 발생하는 에러에 대한 에러페이지는 어떻게 보여주지..?
  //     return NextResponse.redirect(new URL('/auth/signin', request.url));
  //   }
  // }

  if (request.nextUrl.pathname.startsWith('/auth/callback/kakao')) {
    const authCode = request.nextUrl.searchParams.get('code');

    if (!authCode) {
      // TODO: 에러 메시지 고도화: 카카오 인증 실패
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    try {
      const origin = window.location.origin;
      const authData = await publicApi.post<AuthResponse>('/auth/login/kakao', {
        authCode,
        redirectUri: `${origin}/auth/callback/kakao`,
      });

      // TODO: error처리 고도화: response status혹은 메시지에 따라 if문 수정하기
      if (!authData.data) {
        // TODO: 에러 메시지 고도화: 로그인 실패
        return NextResponse.redirect(new URL('/auth/signin', request.url));
      }

      const response = NextResponse.redirect(new URL('/', request.url));
      for (const cookie of generateCookiesKeyValues(authData.data as AuthResponse)) {
        const cookieKey = cookie[0];
        const cookieValue = cookie[1] as string | number;
        response.cookies.set(cookieKey, cookieValue.toString());
      }
      return response;
    } catch (e) {
      // server-side 로그인 실패
      //TODO: server-side fetch CORS 에러 핸들링
      console.log('middleware error', e);
    }
  }

  // 인증이 필요한 페이지
  const currentPrivateRoute = PRIVATE_ROUTES.find(route =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (currentPrivateRoute) {
    const requestHeaders = new Headers(request.headers);
    const accessToken = request.cookies.get(AUTH_COOKIE_KEYS.accessToken)?.value;
    const accessTokenExpireDate = Number(
      request.cookies.get(AUTH_COOKIE_KEYS.accessTokenExpireDate)?.value,
    );
    const validAccessToken = await getAccessToken({ accessToken, accessTokenExpireDate });
    if (validAccessToken) {
      requestHeaders.set('Authorization', `Bearer ${accessToken}`);
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      return response;
    }
    // server-side 로그아웃 처리
    for (const cookieKey of Object.values(AUTH_COOKIE_KEYS)) {
      request.cookies.delete(cookieKey);
    }
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
};

const config = {
  // middleware가 적용될 페이지를 설정해 두어야 SC에서의 api 요청이 정상적으로 작동합니다.
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/auth/callback/kakao/(.*)',  ...PRIVATE_ROUTES],
};
export { config, middleware };
