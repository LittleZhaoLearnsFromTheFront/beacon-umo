import { PageHeader } from "@ant-design/pro-components";
import { Input, Table } from "antd";
import CreateUpdateTemplate from "./CreateUpdateTemplate";
import { usePagination } from "ahooks";
import { templateService } from "@/servicesWrap";

const index = () => {

    const { data, loading, pagination } = usePagination(({ current, pageSize }) => templateService.apiClientTemplateGet(pageSize, current))

    const filterEl = (
        <div className="flex items-center gap-4">
            <Input.Search placeholder="请输入模版名称" enterButton='搜索' />
            <CreateUpdateTemplate />
        </div>
    )
    const tableEl = (
        <Table
            rowKey='id'
            loading={loading}
            pagination={pagination}
            dataSource={data?.list || []}
            columns={[
                {
                    title: 'ID',
                    dataIndex: 'id'
                },
                {
                    title: '模版名称',
                    dataIndex: 'title'
                },
                {
                    title: '操作',
                    render: () => <></>
                }
            ]}
        />
    )

    return <PageHeader title='模版列表'>
        <div className="flex flex-col gap-4">
            {filterEl}
            {tableEl}
        </div>
    </PageHeader>;
};
export default index;
