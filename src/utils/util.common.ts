export const isProd = (env: string): boolean => env === 'production';

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export const getEntries = <T extends object>(obj: T) => Object.entries(obj) as Entries<T>;

export const isEqual = (obj1: any, obj2: any): boolean => {
  // 값이 같으면 true 반환
  if (obj1 === obj2) {
    return true;
  }

  // 객체 혹은 배열인 경우
  if (typeof obj1 === 'object' && typeof obj2 === 'object' && obj1 !== null && obj2 !== null) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // 속성 개수가 다른 경우 false 반환
    if (keys1.length !== keys2.length) {
      return false;
    }

    // 모든 속성에 대해 재귀적으로 비교
    for (const key of keys1) {
      if (!isEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  // 나머지 경우는 값이 다르므로 false 반환
  return false;
};
