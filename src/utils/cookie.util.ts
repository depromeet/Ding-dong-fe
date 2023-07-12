// Ref : https://ko.javascript.info/cookie

export const getCookie = (name: string) => {
  const matches =
    typeof window !== 'undefined' &&
    document.cookie.match(
      // eslint-disable-next-line no-useless-escape
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
    );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setCookie = (name: string, value: any, options?: any) => {
  const cookieOptions = {
    path: '/',
    ...options,
  };

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (const optionKey in cookieOptions) {
    updatedCookie += '; ' + optionKey;
    const optionValue = cookieOptions[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }
  document.cookie = updatedCookie;
};

export const deleteCookie = (name: string) => {
  setCookie(name, '', {
    'max-age': -1,
  });
};
