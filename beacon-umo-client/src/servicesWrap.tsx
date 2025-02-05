import { message, notification } from 'antd';
import { memoizeWith } from 'ramda';
import {
  loginPath,
  TOKEN_HEADER_NAME,
} from './constants';
import { dropEmptySegements, isGet } from '@/utils';
import { myLocalStorage } from '@/lib';
import { BaseAPI, Configuration, UserApi } from '@/services';
import { history } from '@umijs/max';
import { FetchOption } from 'typings';

const isUploadSlice = (url: string) => url.includes('/api/attachment/slice');
async function errorHandler(response: Response) {
  const routerPath = location.pathname;
  if (response.status === 401) {
    if ([loginPath].includes(routerPath))
      return;
    else {
      history.push(loginPath);
    }
  }
  const { url, status, statusText } = response;
  const defaultReason = `${status}(${statusText}) on ${url.match(/\/api.*/)}`;
  try {
    const { error, detail, url: jumpUrl } = await response.clone().json();
    if (Object.keys(detail ?? {}).length) {
      Object.entries(detail)
        .filter(([, v]) => typeof v === 'string')
        .map(([k, v]) =>
          notification.error({
            message: k,
            description: v as string,
            duration: 9,
          }),
        );
    } else {
      message.error(
        <>
          {error ?? defaultReason}
          {jumpUrl && (
            <a href={jumpUrl} target='_blank' className='text-red-600'>
              （点击跳转）
            </a>
          )}
        </>,
        jumpUrl ? 10 : 6,
      );
    }
  } catch {
    message.error(defaultReason);
  }
}

// 作用：当多个组件同时请求一个 api 时，当上一个请求没 resolve 或 reject 时，直接复用
const cacheMap: Map<string, Promise<Response>> = new Map();

export const myFetch = async (
  url: string,
  option?: FetchOption,
  download: boolean = false,
) => {
  const _isGet = isGet(option?.method);
  const { notLoading } = option || {}
  const isLoading = !notLoading;
  const hide =
    _isGet || isUploadSlice(url) || isLoading
      ? undefined
      : message?.loading('Loading...');
  const promiseCache = _isGet ? cacheMap.get(url) : undefined;
  const headers = new Headers(option?.headers);
  const token = myLocalStorage.getItem(TOKEN_HEADER_NAME);
  if (token) headers.set(TOKEN_HEADER_NAME, token);
  const promise = promiseCache
    ? promiseCache
    : fetch(dropEmptySegements(url), { ...option, headers });
  if (_isGet) cacheMap.set(url, promise); // 写缓存
  const response = await promise;
  if (_isGet) cacheMap.delete(url); // 删缓存
  hide?.();
  if (!response.ok) errorHandler(response);
  if (option?.blob === true) {
    return response.clone();
  }

  const contentDisposition = response.headers.get('Content-Disposition');

  // 文件处理逻辑
  if (contentDisposition) {
    const blobUrl = URL.createObjectURL(await response.clone().blob());

    let filename = decodeURI(
      contentDisposition.match('(?<=filename=).*[^;]')?.[0] || '无文件名',
    );
    filename = filename.replaceAll('"', '');
    if (contentDisposition.split(/;\s*/).includes('attachment') || download) {
      // 下载如 .xlsx 等不支持预览的格式
      const a = document.createElement('a');
      a.download = filename;
      a.href = blobUrl;
      a.click();
    } else {
      // 预览如 .pdf 等支持预览的格式
      const newTab = open(blobUrl);
      if (newTab) newTab.document.title = filename;
    }

    return new Response('[]', response.clone());
  }
  if (!response.headers.get('Content-Type')?.includes('application/json')) {
    return response.clone();
  }
  return (await response.clone().text())
    ? response.clone()
    : new Response('[]', response.clone());
};

const config = new Configuration({
  basePath: window.location.origin,
  fetchApi: myFetch,
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

const userService = bindSelf(new UserApi(config));

export const getBlobUrl = async (res: Response) =>
  URL.createObjectURL(await res.blob());

export const downloadAjax = async (
  url: string | undefined,
  download = false,
) => {
  if (!url) {
    message.error('下载地址为空');
    return;
  }
  try {
    const href = new URL(window.location.href);
    await myFetch(
      href.protocol === 'https:' ? url.replace(/^http:/, 'https:') : url,
      {},
      download,
    );
  } catch (e) {
    message.error(String(e));
    console.error(e);
  }
};

export const getStreamUrl = async (url: string) => {
  try {
    const href = new URL(window.location.href);
    const newUrl =
      href.protocol === 'https:' ? url.replace(/^http:/, 'https:') : url;
    const res = await myFetch(newUrl, { blob: true });
    const blob = await res.blob();
    const needUrl = URL.createObjectURL(blob);
    return needUrl;
  } catch {
    return '';
  }
};
