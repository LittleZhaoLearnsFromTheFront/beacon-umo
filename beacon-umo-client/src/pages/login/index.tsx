import { Button, Form, Input } from "antd";

const page = () => {

    return <div className="w-[100vw] h-[100vh] flex items-center justify-center">
        <div className="w-[500px] min-h-[300px] p-4 shadow rounded border border-solid border-gray-200">
            <div className="text-xl font-medium">欢迎登录小仙女工坊</div>
            <Form colon={false}>
                <Form.Item name="email" rules={[{ required: true }]}>
                    <Input placeholder="请输入邮箱" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true }]}>
                    <Input.Password placeholder="请输入密码" />
                </Form.Item>
            </Form>
        </div>
    </div>
};
export default page;
