import { ROOT_API_URL } from '../config/requestUrl';

class PublicFetch {
  async common<T>(route: string, requestInit?: RequestInit): Promise<{ data: T }> {
    const response = await fetch(`${ROOT_API_URL}${route}`, {
      ...requestInit,
      mode: 'no-cors',
      credentials: 'include',
      headers: new Headers({
        'content-type': 'application/json',
        ...requestInit?.headers,
      }),
    });
    if (response.ok) return await response.json();
    throw Error(response.status + '');
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
