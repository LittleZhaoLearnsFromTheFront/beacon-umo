import { homeService } from "@/servicesWrap";
import { Image, View, Swiper, SwiperItem, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useRequest } from "ahooks";
import { AtGrid } from "taro-ui";
const index = () => {
    const { data } = useRequest(() => homeService.apiHomeGet(), {
        onBefore() {
            Taro.showLoading({
                title: '加载中',
                mask: true
            })
        },
        onFinally() {
            Taro.hideLoading()
        }
    })

    return <View className="flex flex-col gap-6">
        <Swiper
            indicatorDots={true}
            autoplay
            circular
        >
            {
                data?.data.swiper?.map(t => (
                    <SwiperItem>
                        <Image src={t.image} mode="scaleToFill" className="w-full h-full" />
                    </SwiperItem>
                ))
            }
        </Swiper>

        <View className="flex flex-col gap-3 px-2 py-4 rounded shadow">
            <Text className="text-lg font-medium">功能列表</Text>
            {data?.data.gridBar?.length ? <AtGrid
                onClick={(t) => {
                    if (!t.link) {
                        Taro.showToast({
                            title: '暂无此功能，请联系管理员',
                            icon: 'error'
                        })
                        return
                    }
                    Taro.navigateTo({
                        url: t.link
                    })
                }}
                data={data.data.gridBar.map(t => ({ image: t.image, value: t.title, link: t.link }))}
            /> : <View className="flex justify-center text-gray-500 text-sm">暂无功能</View>}
        </View>
    </View>
};
export default index;
