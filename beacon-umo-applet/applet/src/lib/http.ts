import { loginPath, TOKEN_HEADER_NAME } from "@/constants";
import { isGet } from "@/utils";
import Taro from "@tarojs/taro";
import axios, { InternalAxiosRequestConfig } from "axios";

const myAxios = axios.create({
    timeout: 10000
})

interface ExtraConfig extends InternalAxiosRequestConfig {
    noLoading?: boolean;
}

myAxios.interceptors.request.use(
    (config: ExtraConfig) => {
        const { method, noLoading } = config
        if (!isGet(method) || noLoading) {
            Taro.showLoading({
                title: '加载中...',
                mask: true
            })
        }

        const token = Taro.getStorageSync(TOKEN_HEADER_NAME)
        if (token) {
            config.headers[TOKEN_HEADER_NAME] = token;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
)

const responseInterceptors = (response) => {
    Taro.hideLoading();
    if (response.status === 401) {
        Taro.showToast({
            title: '登录过期，请重新登录',
            icon: 'none'
        })
        Taro.redirectTo({
            url: loginPath
        })
        return
    }
    if (!response.data.success) {
        const defaultReason = response.data.error ? response.data.error : `${response.status}(${response.statusText}) on ${response.config.url?.match(/\/api.*/)}`;
        Taro.showToast({
            title: defaultReason,
            icon: 'none'
        })
    }

    return response.data;
}

myAxios.interceptors.response.use(
    responseInterceptors,
    e => {
        responseInterceptors(e.response)
    }
)

export default myAxios;
export { myAxios }