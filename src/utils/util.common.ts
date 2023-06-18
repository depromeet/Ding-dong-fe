export const isProd = (env: string): boolean => env === 'production';

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export const getEntries = <T extends object>(obj: T) => Object.entries(obj) as Entries<T>;
