import { userService } from "@/servicesWrap";
import Taro, { useLoad } from "@tarojs/taro";

const index = () => {
    
    useLoad(async () => {
        const { code } = await Taro.login()
        userService.apiLoginPost({ code: code })
    })

    return <></>
};
export default index;
