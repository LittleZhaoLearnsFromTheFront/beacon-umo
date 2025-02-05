import { useLocalStorageState, useSessionStorageState } from 'ahooks';

const prefix = 'beacon-umo::';

const myStorageBuilder = (
  storage: Storage,
): Pick<Storage, 'getItem' | 'setItem' | 'clear' | 'removeItem'> => ({
  getItem: (k) => storage.getItem(prefix + k),
  setItem: (k, v) => storage.setItem(prefix + k, v),
  removeItem: (k) => storage.removeItem(prefix + k),
  clear: () =>
    Object.keys(storage)
      .filter((k) => k.startsWith(prefix))
      .forEach((k) => storage.removeItem(k)),
});

/** local storage 替代品 */
export const myLocalStorage = myStorageBuilder(localStorage);

/** session storage 替代品 */
export const mySessionStorage = myStorageBuilder(sessionStorage);

/** local storage hook 替代品 */
export const useMyLocalStorage: typeof useLocalStorageState = (k, init) =>
  useLocalStorageState(prefix + k, init);

/** session storage hook 替代品 */
export const useMySessionStorage: typeof useSessionStorageState = (k, init) =>
  useSessionStorageState(prefix + k, init);
