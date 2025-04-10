import { Input, Table } from "antd";
import { FC } from "react";

type SwiperItem = {
    title: string;
    image: string;
}

const FormSwiper: FC<{
    value?: SwiperItem[],
    onChange?: (value?: SwiperItem[]) => void;
}> = ({ value, onChange }) => {


    const update = () => {
        onChange?.(value);
    }

    return <Table
        dataSource={value}
        pagination={false}
        size="small"
        columns={[
            {
                title: '标题', render: (_, t) => <Input value={t.title} onChange={(e) => {
                    t.title = e.target.value;
                    update()
                }} />
            },
            {
                title: '图片',
                render: () => <></>
            }
        ]}
    />
};
export default FormSwiper;
