import { useQuery } from '@tanstack/react-query';
import { Input, Modal, Select } from 'antd';
import { useState } from 'react';

import { createDataType, getDataType } from '../../../queries/tableQueries';
import { Data, Table } from './DataTable';

export type DataTypes =
  | 'artist'
  | 'event'
  | 'location'
  | 'raga'
  | 'tape'
  | 'track'
  | 'user';

interface DataTypeOptions {
  label: DataTypes;
  value: number;
}

const options: DataTypeOptions[] = [
  {
    label: 'track',
    value: 1,
  },
  // {
  //   label: 'user',
  //   value: 2,
  // },
  {
    label: 'location',
    value: 3,
  },
  {
    label: 'event',
    value: 4,
  },
  {
    label: 'tape',
    value: 5,
  },
  {
    label: 'raga',
    value: 6,
  },
  {
    label: 'artist',
    value: 7,
  },
];

export function DataTableContainer() {
  const [dataType, setDataType] = useState<DataTypes>('location');
  const [promptCreate, setPromptCreate] = useState<boolean>(false);
  const [createData, setCreateData] = useState<Data | null>(null);

  const { data, isLoading, isError } = useQuery([dataType], () => getDataType(dataType), {
    staleTime: 15000,
  });

  return (
    <>
      <div>
        <Select
          options={options}
          placeholder="Select a data type..."
          onSelect={(_value, option) => void setDataType(option.label)}
        />
      </div>
      <div>DataTable</div>
      <button type="button" onClick={() => setPromptCreate(true)}>
        Create
      </button>
      {isLoading && <div>loading...</div>}
      {data && <Table data={data} dataType={dataType} />}
      {isError && <div>An error occured</div>}
      <Modal
        title={`Create ${dataType}`}
        open={!!promptCreate}
        onOk={() => {
          createData && createDataType(dataType, createData);
          setPromptCreate(false);
        }}
        onCancel={() => setPromptCreate(false)}
      >
        {Object.keys(data[0]).map((item) => (
          <>
            <div>{item}</div>
            <Input
              placeholder={''}
              onChange={(event) =>
                setCreateData((prev) => ({ ...prev, [item]: event.target.value }))
              }
            />
          </>
        ))}
      </Modal>
    </>
  );
}
