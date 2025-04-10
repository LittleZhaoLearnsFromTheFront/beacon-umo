import { myLocalStorage } from "@/lib";
import { history } from "@umijs/max";

export const dropEmptySegements = (url: string) =>
    url.replace(/(?<!:)\/+/g, '/').replace(/\/$/, '');

export const isGet = (method: string | undefined) =>
    /GET/i.test(method ?? 'get'); // 对于 http 未设置 method 时按惯例看做 get

export const logout = () => {
    myLocalStorage.clear()
    history.replace('/login')
}