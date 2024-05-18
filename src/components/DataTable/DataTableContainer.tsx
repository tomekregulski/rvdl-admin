// import { useQuery } from '@tanstack/react-query';
import { Modal, Select } from 'antd';
import { useState } from 'react';
import { DataTypes } from 'types/Models';

import { ArtistTable } from './ArtistTable';
import { EventTable } from './EventTable';
import { LocationTable } from './LocationTable';
import { MediaTypeTable } from './MediaTypeTable';
import { RagaTable } from './RagaTable';
import { TapeTable } from './TapeTable';
import { TrackTable } from './TrackTable';

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

const tableMap = {
  track: <TrackTable />,
  location: <LocationTable />,
  event: <EventTable />,
  tape: <TapeTable />,
  raga: <RagaTable />,
  artist: <ArtistTable />,
  'media-type': <MediaTypeTable />,
  user: <p>User Table</p>,
};

export function DataTableContainer() {
  const [dataType, setDataType] = useState<DataTypes>('location');
  const [promptCreate, setPromptCreate] = useState<boolean>(false);

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
      {dataType && tableMap[dataType]}
      <Modal
        title={`Create ${dataType}`}
        open={!!promptCreate}
        onOk={() => {
          // createData && createDataType(dataType, createData);
          setPromptCreate(false);
        }}
        onCancel={() => setPromptCreate(false)}
      >
        {/* {Object.keys(dataType[0]).map((item) => (
          <>
            <div>{item}</div>
            <Input
              placeholder={''}
              onChange={(event) =>
                setCreateData((prev) => ({ ...prev, [item]: event.target.value }))
              }
            />
          </>
        ))} */}
      </Modal>
    </>
  );
}
