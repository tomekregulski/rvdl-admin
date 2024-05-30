// import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { DataTypes } from 'types/Models';

import { CreateDialog } from '../Dialog/CreateDialog';
import { Select } from '../Select/Select';
import { ArtistTable } from './ArtistTable';
import { CategoryTable } from './CategoryTable';
import { EventTable } from './EventTable';
import { LocationTable } from './LocationTable';
import { MediaTypeTable } from './MediaTypeTable';
import { RagaTable } from './RagaTable';
import { TapeTable } from './TapeTable';
import { TrackTable } from './TrackTable';

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

interface DataTypeOptions {
  label: string;
  value: DataTypes;
}

export function DataTableContainer() {
  const [dataType, setDataType] = useState<DataTypes>('location');
  // const [promptCreate, setPromptCreate] = useState<boolean>(false);

  const options: DataTypeOptions[] = [
    {
      label: 'Track',
      value: 'track',
    },
    {
      label: 'Category',
      value: 'category',
    },
    {
      label: 'Location',
      value: 'location',
    },
    {
      label: 'Event',
      value: 'event',
    },
    {
      label: 'Tape',
      value: 'tape',
    },
    {
      label: 'Raga',
      value: 'raga',
    },
    {
      label: 'Artist',
      value: 'artist',
    },
    {
      label: 'Media Type',
      value: 'media-type',
    },
  ];

  return (
    <>
      <div>
        <Select
          options={options}
          dataType={dataType}
          onValueChange={(value: DataTypes) => setDataType(value)}
        />
      </div>
      <div>Data View</div>
      <CreateDialog dataType={dataType} />
      {dataType && tableMap[dataType]}
    </>
  );
}
