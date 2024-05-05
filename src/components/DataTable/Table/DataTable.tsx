import { Input, Modal, Table as AntdTable } from 'antd';
import { useState } from 'react';
import { DataTypes, Track } from 'types/Models';

import { deleteDataType, editDataType } from '../../../queries/tableQueries';
import { prepareTracks } from '../../../util/prepareTracks';

interface BaseData {
  id: number;
  name?: string;
}

export interface Data extends BaseData {}

interface TableProps {
  data: Data[];
  dataType: DataTypes;
}

interface PromptDelete {
  id: number;
}

export function Table(props: TableProps) {
  const [promptDelete, setPromptDelete] = useState<PromptDelete | null>(null);
  const [promptEdit, setPromptEdit] = useState<Data | null>(null);
  const [newName, setNewName] = useState<string>('');
  const [editData, setEditData] = useState<Data | null>(null);

  console.log(editData);

  const { data, dataType } = props;
  let tableData = data;

  if (dataType === 'track') {
    const preparedTracks = prepareTracks(data as Track[]);
    tableData = preparedTracks;
  }

  const keys = tableData ? Object.keys(tableData[0]) : [];
  const newColumns = keys
    ? keys.map((k) => ({
        title: k,
        dataIndex: k,
        key: k,
      }))
    : [];
  const newRows = tableData?.map((item) => ({
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
            setPromptEdit({ ...record });
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
        title="Delete Item"
        open={!!promptDelete}
        onOk={() => {
          promptDelete?.id && deleteDataType('location', { id: promptDelete.id });
          setPromptDelete(null);
        }}
        onCancel={() => setPromptDelete(null)}
      >
        <p>
          Delete {`${dataType}`} with ID: {promptDelete?.id}?
        </p>
        <p>Before deleting, please ensure that no existing records reference this ID.</p>
      </Modal>
      <Modal
        title="Edit Item"
        open={!!promptEdit}
        onOk={() => {
          promptEdit?.id &&
            promptEdit?.name &&
            editDataType(dataType, { id: promptEdit.id, name: newName });
          setPromptEdit(null);
        }}
        onCancel={() => setPromptEdit(null)}
      >
        {Object.keys(tableData[0]).map((item) => (
          <div key={item}>
            <div>{item}</div>
            <Input
              placeholder={promptEdit?.name ?? ''}
              onChange={(event) =>
                // @ts-expect-error Argument of type '(prev: Data | null) => { id?: number | undefined; name?: string | undefined; }' is not assignable to parameter of type 'SetStateAction<Data | null>'.
                setEditData((prev) => ({ ...prev, [item]: event.target.value }))
              }
            />
          </div>
        ))}
      </Modal>
    </>
  );
}
