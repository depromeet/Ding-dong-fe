import { ROOT_API_URL } from '~/api/config/requestUrl';

export const getFetch = async (path: string, accessToken: string, requestConfig?: RequestInit) => {
  const url = `${ROOT_API_URL}${path}`;
  const options: RequestInit = {
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    }),
    mode: 'no-cors',
    credentials: 'include',
    ...requestConfig,
  };
  const res = await fetch(url, options);
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postFetch = async (
  path: string,
  accessToken: string,
  body?: Record<string, any>,
  requestConfig?: RequestInit,
) => {
  const url = `${ROOT_API_URL}${path}`;
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: new Headers({
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    }),
    mode: 'no-cors',
    credentials: 'include',
    ...requestConfig,
  };
  const res = await fetch(url, options);
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    //TODO: middleware 로 error code 처리를 옮겨야 합니다
    if (data.statusCode === 300) {
      return data;
    }
    throw Error(data);
  }
};
