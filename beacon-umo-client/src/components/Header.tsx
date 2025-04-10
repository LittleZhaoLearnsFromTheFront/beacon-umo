import { logout } from "@/utils";
import { UserOutlined } from "@ant-design/icons";
import { useModel } from "@umijs/max";
import { useBoolean, useClickAway } from "ahooks";
import { Avatar, Button } from "antd";
import { useRef } from "react";

const Header = () => {

    const { initialState } = useModel('@@initialState');
    const [visible, { setFalse: hide, toggle }] = useBoolean()
    const ref = useRef<HTMLDivElement>(null)
    useClickAway(() => {
        hide()
    }, ref)

    return <div className="flex justify-between items-center px-8 h-full">
        <div className="text-white text-lg font-medium ">
            小仙女工坊
        </div>
        <div className="relative" ref={ref}>
            <Avatar icon={<UserOutlined />} className="cursor-pointer" onClick={toggle} />
            {visible ? <div className="absolute top-10 right-0 bg-white shadow-xl rounded-lg p-4 border border-gray-200 border-solid">
                <h3>{initialState?.username}</h3>
                <Button type="dashed" className="w-full " onClick={() => {
                    hide()
                    logout()
                }}>退出登陆</Button>
            </div> : null}
        </div>

    </div>
};
export default Header;