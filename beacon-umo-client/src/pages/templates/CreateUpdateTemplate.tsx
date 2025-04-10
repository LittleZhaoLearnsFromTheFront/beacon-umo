import { useBoolean } from "ahooks";
import { Button, Form, Modal } from "antd";
import { FC } from "react";

const CreateUpdateTemplate: FC<{

}> = ({ }) => {

    const [visible, { setTrue: show, setFalse: hide }] = useBoolean()
    const [formRef] = Form.useForm()

    return <>
        <Button
            type="primary"
            onClick={show}
        >
            新增模版
        </Button>
        <Modal
            title="模版配置"
            open={visible}
            width={800}
            destroyOnClose
            onCancel={hide}
        >
            <Form colon={false} preserve={false} form={formRef} layout="vertical">
                <Form.Item label='轮播图' name='swiper'>

                </Form.Item>
                <Form.Item label='轮播图' name='gridBar'>
                    
                </Form.Item>
            </Form>
        </Modal>
    </>
};
export default CreateUpdateTemplate;
