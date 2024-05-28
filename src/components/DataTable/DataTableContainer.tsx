// import { useQuery } from '@tanstack/react-query';
import { Select } from 'antd';
import { useState } from 'react';
import { DataTypes } from 'types/Models';

import { CreateDialog } from '../Dialog/CreateDialog';
import { ArtistTable } from './ArtistTable';
import { CategoryTable } from './CategoryTable';
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
  {
    label: 'category',
    value: 2,
  },
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
  {
    label: 'media-type',
    value: 8,
  },
];

const tableMap = {
  track: <TrackTable />,
  category: <CategoryTable />,
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
  // const [promptCreate, setPromptCreate] = useState<boolean>(false);

  return (
    <>
      <div>
        <Select
          options={options}
          placeholder="Select a data type..."
          onSelect={(_value, option) => void setDataType(option.label)}
        />
      </div>
      <div>Data View</div>
      <CreateDialog dataType={dataType} />
      {dataType && tableMap[dataType]}
    </>
  );
}
