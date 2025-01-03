import { TOKEN_HEADER_NAME } from "@/constants";
import { userService } from "@/servicesWrap";
import Taro, { useLoad } from "@tarojs/taro";

const index = () => {

    useLoad(async () => {
        const { code } = await Taro.login()
        const { data: { token } } = await userService.apiLoginPost({ code })

        Taro.setStorageSync(TOKEN_HEADER_NAME, token)
        Taro.navigateTo({ url: '/pages/home/index' })
    })

    return <></>
};
export default index;
