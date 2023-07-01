import { cookies } from 'next/headers';

import { AUTH_COOKIE_KEYS } from '~/types/auth';
import { getAccessTokenServer } from '~/utils/auth/tokenValidator.server';

import { PublicFetch } from './publicFetch';

class PrivateFetch extends PublicFetch {
  constructor() {
    super();
  }
  async common<T>(route: string, requestInit?: RequestInit) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get(AUTH_COOKIE_KEYS.accessToken)?.value;
    const accessTokenExpireDate = Number(
      cookieStore.get(AUTH_COOKIE_KEYS.accessTokenExpireDate)?.value,
    );
    const refreshToken = cookieStore.get(AUTH_COOKIE_KEYS.refreshToken)?.value;
    const validToken = await getAccessTokenServer({
      accessToken,
      accessTokenExpireDate,
      refreshToken,
    });
    return super.common<T>(route, {
      ...(requestInit ?? {}),
      headers: { Authorization: `Bearer ${validToken?.accessToken}` },
    });
  }
  async get<T>(route: string, requestInit?: RequestInit) {
    return this.common<T>(route, {
      method: 'GET',
      ...(requestInit ?? {}),
    });
  }
  async post<T>(route: string, requestInit?: RequestInit) {
    return this.common<T>(route, {
      method: 'POST',
      ...(requestInit ?? {}),
    });
  }
  async put<T>(route: string, requestInit?: RequestInit) {
    return this.common<T>(route, {
      method: 'PUT',
      ...(requestInit ?? {}),
    });
  }
  async delete<T>(route: string, requestInit?: RequestInit) {
    return this.common<T>(route, {
      method: 'DELETE',
      ...(requestInit ?? {}),
    });
  }
}

const privateFetch = new PrivateFetch();

export { PrivateFetch, privateFetch };
