import { ROOT_API_URL } from '../config/requestUrl';

class PublicFetch {
  async common<T>(route: string, requestInit?: RequestInit): Promise<T | null> {
    const response = await fetch(`${ROOT_API_URL}${route}`, {
      ...requestInit,
      headers: new Headers({
        'content-type': 'application/json',
        ...(requestInit ? requestInit.headers : {}),
      }),
      mode: 'no-cors',
    });
    const data = await response.json();
    if (!!data && typeof data === 'object' && 'data' in data) {
      return data.data;
    }
    return null;
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

const publicFetch = new PublicFetch();

export { PublicFetch, publicFetch };
