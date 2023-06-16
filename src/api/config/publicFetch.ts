import { FetchResponseType } from './api.types';
import { ROOT_API_URL } from './requestUrl';

class PublicFetch {
  static async common<T>(route: string, requestInit?: RequestInit): Promise<FetchResponseType<T>> {
    try {
      const response = await fetch(`${ROOT_API_URL}${route}`, {
        ...(requestInit ?? {}),
      });
      if (response.ok) {
        const jsonValue = await response.json();
        return Promise.resolve({
          data: jsonValue.data as T,
          status: response.status,
          success: jsonValue.success,
        });
      } else {
        return Promise.resolve({ success: false, status: response.status });
      }
    } catch (e) {
      return Promise.resolve({ success: false, status: 500 });
    }
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

export { PublicFetch };
