import { userService } from "@/servicesWrap";
import { useBoolean } from "ahooks";
import { Button, Form, Input, Modal } from "antd";

const Register = () => {
    const [visible, { setTrue: show, setFalse: hide }] = useBoolean()
    const [formRef] = Form.useForm();

    return <>
        <Button className="p-0" type="link" size="small" onClick={show}>
            立即注册
        </Button>
        <Modal
            title="注册"
            open={visible}
            onCancel={hide}
            onOk={async () => {
                await formRef.validateFields();
                const { email, password } = formRef.getFieldsValue()
                await userService.apiClientRegisterPost({
                    email,
                    password
                })
                hide()
            }}
            destroyOnClose
        >
            <Form colon={false} preserve={false} form={formRef} labelCol={{ span: 5 }}>
                <Form.Item name='email' label='邮箱' rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name='password' label='密码' rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    dependencies={['password']}
                    name='confirmPassword'
                    label='确认密码'
                    rules={[
                        { required: true },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次密码不一致!'));
                            },
                        })

                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    </>
};
export default Register;
