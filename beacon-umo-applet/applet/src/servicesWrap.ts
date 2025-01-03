import { Configuration, UserApi } from '@/services';
import { memoizeWith } from 'ramda';
import { BaseAPI } from './services/base';
import {myAxios} from './lib';

const config = new Configuration({
  basePath: 'http://localhost:3000',
});

const bindSelf = <T extends BaseAPI>(obj: T): T =>
  new Proxy(obj, {
    get: memoizeWith(
      (_target, key) => key as string,
      (target, key) => {
        const value: unknown = target[key as keyof T];
        if (typeof value !== 'function') return value;
        return value.bind(target);
      },
    ),
  });

export const userService = bindSelf(new UserApi(config, undefined, myAxios));

