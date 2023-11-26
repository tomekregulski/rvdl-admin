import { useQuery } from '@tanstack/react-query';
import { Select } from 'antd';
import { useState } from 'react';

import { getDataType } from '../../../queries/audioQueries';
import { Table } from './DataTable';

export type DataTypes = 'location' | 'track' | 'user';

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
];

export function DataTableContainer() {
  const [dataType, setDataType] = useState<DataTypes>('track');

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
      {isLoading && <div>loading...</div>}
      {data && <Table data={data} />}
      {isError && <div>An error occured</div>}
    </>
  );
}
