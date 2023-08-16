import { AtomEffect } from 'recoil';

export const localstorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      const parsedValue = JSON.parse(savedValue) as T;

      setSelf(parsedValue);
    }
    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const getLocalStorageItem = <T>(key: string) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue !== null) {
    const parsedValue = JSON.parse(savedValue) as T;
    return parsedValue;
  }
  return null;
};
