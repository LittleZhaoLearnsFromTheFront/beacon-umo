import { userService } from "@/servicesWrap";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useRequest } from "ahooks";

const index = () => {
    const { data } = useRequest(userService.apiUserValidateTemplateGet, {
        onSuccess: (data) => {
            if (!data.data.hasTemplate) return
            Taro.redirectTo({
                url: '/pages/home/index'
            })

        }
    })

    if (!data?.data.hasTemplate) {
        return <View>您所登录的用户暂时没有相关模版，请联系管理员</View>
    }
    return <></>
};
export default index;
