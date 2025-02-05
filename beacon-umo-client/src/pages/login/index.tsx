import { siderWidth, TOKEN_HEADER_NAME } from "@/constants";
import { myLocalStorage } from "@/lib";
import { userService } from "@/servicesWrap";
import { useModel } from "@umijs/max";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import Register from "./Register";

const page = () => {

    const { initialState } = useModel("@@initialState")
    const [formRef] = Form.useForm()

    useEffect(() => {
        if (!initialState?.isLogin) return
        location.href = "/"
    }, [])

    const login = async () => {
        await formRef.validateFields()
        const { email, password } = formRef.getFieldsValue()
        const { token } = await userService.apiClientLoginPost({ email, password })
        myLocalStorage.setItem(TOKEN_HEADER_NAME, token)
        location.href = "/"
    }

    return <div className="w-[100vw] h-[100vh] flex items-center justify-center" style={{ marginLeft: -siderWidth }}>
        <div className="w-[500px] min-h-[300px] p-4 shadow rounded border border-solid border-gray-200">
            <div className="text-xl font-medium mb-8">欢迎登录小仙女工坊</div>
            <Form colon={false} form={formRef}>
                <Form.Item name="email" rules={[{ required: true }]} label='账号'>
                    <Input placeholder="请输入邮箱" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true }]} label='密码'>
                    <Input.Password placeholder="请输入密码" />
                </Form.Item>
            </Form>
            <Button className="w-full" type="primary" onClick={login}>登录</Button>
            <div className="text-xs text-right mt-2">还没有账号? <Register /></div>
        </div>
    </div>
};
export default page;
