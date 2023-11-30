import { Input, Modal, Table as AntdTable } from 'antd';
import { useState } from 'react';

import { deleteDataType, editDataType } from '../../../queries/tableQueries';

interface BaseData {
  id: number;
  name?: string;
}

interface Data extends BaseData {}

interface TableProps {
  data: Data[];
}

interface PromptDelete {
  id: number;
}
interface PromptEdit {
  id: number;
  name?: string;
}

export function Table(props: TableProps) {
  const [promptDelete, setPromptDelete] = useState<PromptDelete | null>(null);
  const [promptEdit, setPromptEdit] = useState<PromptEdit | null>(null);
  const [newName, setNewName] = useState<string>('');

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
        <button
          type="button"
          onClick={() => {
            setPromptEdit({ id: record.id, name: record.name });
            setNewName(record.name!);
          }}
        >
          Edit
        </button>
      ),
    },
    {
      title: 'delete',
      key: 'delete',
      render: (_: unknown, record: Data) => (
        <button type="button" onClick={() => setPromptDelete({ id: record.id })}>
          Delete
        </button>
      ),
    },
  ];

  return (
    <>
      <AntdTable dataSource={newRows} columns={columns} />
      <Modal
        title="Basic Modal"
        open={!!promptDelete}
        onOk={() => {
          promptDelete?.id && deleteDataType('location', { id: promptDelete.id });
          setPromptDelete(null);
        }}
        onCancel={() => setPromptDelete(null)}
      >
        <p>Delete Location with ID: {promptDelete?.id}?</p>
      </Modal>
      <Modal
        title="Basic Modal"
        open={!!promptEdit}
        onOk={() => {
          promptEdit?.id &&
            promptEdit?.name &&
            editDataType('location', { id: promptEdit.id, name: newName });
          setPromptEdit(null);
        }}
        onCancel={() => setPromptEdit(null)}
      >
        <p>New Name</p>
        <Input
          placeholder={promptEdit?.name ?? ''}
          onChange={(event) => setNewName(event.target.value)}
        />
      </Modal>
    </>
  );
}
