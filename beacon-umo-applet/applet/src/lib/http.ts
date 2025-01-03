import { TOKEN_HEADER_NAME } from "@/constants";
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
myAxios.interceptors.response.use(
    response => {
        Taro.hideLoading();
        return response.data;
    }
)

export default myAxios;
export { myAxios }