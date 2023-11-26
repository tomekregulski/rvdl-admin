import { Table as AntdTable } from 'antd';
// import type { ColumnsType } from 'antd/es/table';

interface BaseData {
  id: number;
}

interface Data extends BaseData {}

interface TableProps {
  data: Data[];
}

export function Table(props: TableProps) {
  const { data } = props;
  const keys = data ? Object.keys(data[0]) : [];
  const newColumns = keys
    ? keys.map((k) => ({
        title: k,
        dataIndex: k,
        key: k,
      }))
    : [];
  const newRows = data?.map((item) => ({
    key: item.id,
    ...item,
  }));

  const columns = [
    ...newColumns,
    {
      title: 'edit',
      key: 'edit',
      render: (_: unknown, record: Data) => (
        <button type="button" onClick={() => console.log(record)}>
          Edit
        </button>
      ),
    },
  ];

  return <AntdTable dataSource={newRows} columns={columns} />;
}
