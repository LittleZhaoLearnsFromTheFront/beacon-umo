import { TOKEN_HEADER_NAME } from "@/constants";
import { userService } from "@/servicesWrap";
import Taro, { useLoad } from "@tarojs/taro";

const index = () => {

    useLoad(async () => {
        const { code } = await Taro.login()
        const { data: { token, needComplete } } = await userService.apiLoginPost({ code })

        Taro.setStorageSync(TOKEN_HEADER_NAME, token)
        if (needComplete) {
            const { userInfo: { nickName, avatarUrl } } = await Taro.getUserInfo()
            await userService.apiUserCompletePost({ username: nickName, avatar: avatarUrl })
        }
        Taro.navigateTo({ url: '/pages/validate-template/index' })
    })

    return <></>
};
export default index;
