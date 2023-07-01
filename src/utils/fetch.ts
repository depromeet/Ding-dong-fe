import { ROOT_API_URL } from '~/api/config/requestUrl';

export const getFetch = async (path: string, headers?: RequestInit['headers']) => {
  const url = `${ROOT_API_URL}${path}`;
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
  };
  const res = await fetch(url, options);
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
};
