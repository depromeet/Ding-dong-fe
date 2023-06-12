import { cookies } from 'next/headers';

import { FetchResponseType } from '@/lib/api/config/api.types';
import { AUTH_COOKIE_KEYS } from '@/types/auth';
import { getAccessToken } from '@/utils/auth/tokenHandlers';

import { PublicFetch } from './publicFetch';

class PrivateFetch {
  static async common<T>(route: string, requestInit?: RequestInit): Promise<FetchResponseType<T>> {
    const cookieStore = cookies();
    const accessToken = cookieStore.get(AUTH_COOKIE_KEYS.accessToken)?.value;
    const accessTokenExpireDate = Number(
      cookieStore.get(AUTH_COOKIE_KEYS.accessTokenExpireDate)?.value,
    );
    const validAccessToken = await getAccessToken({ accessToken, accessTokenExpireDate });
    return PublicFetch.common<T>(route, {
      ...(requestInit ?? {}),
      headers: { Authorization: `Bearer ${validAccessToken}` },
    });
  }
  static async get<T>(route: string, requestInit?: RequestInit): Promise<FetchResponseType<T>> {
    return this.common<T>(route, {
      method: 'GET',
      ...(requestInit ?? {}),
    });
  }
  static async post<T>(route: string, requestInit?: RequestInit): Promise<FetchResponseType<T>> {
    return this.common<T>(route, {
      method: 'POST',
      ...(requestInit ?? {}),
    });
  }
  static async put<T>(route: string, requestInit?: RequestInit): Promise<FetchResponseType<T>> {
    return this.common<T>(route, {
      method: 'PUT',
      ...(requestInit ?? {}),
    });
  }
  static async delete<T>(route: string, requestInit?: RequestInit): Promise<FetchResponseType<T>> {
    return this.common<T>(route, {
      method: 'DELETE',
      ...(requestInit ?? {}),
    });
  }
}

export { PrivateFetch };
