import type { ChangeEvent, Dispatch } from 'react';
import { useState } from 'react';
import {
  Artist,
  Category,
  DataTypes,
  Location as PerformanceLocation,
  MediaType,
} from 'types/Models';

import { editDataType } from '../../../queries';
import type { ResponseType } from '../common';

export interface UpdateNameIdProps {
  dataType: DataTypes;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  item: Artist | Category | MediaType | PerformanceLocation;
}

export function Update(props: UpdateNameIdProps) {
  const { item, dataType, setOpen } = props;
  const { id, name: itemName } = item;

  const [name, setName] = useState<string>('');
  const [result, setResult] = useState<ResponseType | null>(null);

  async function handleEdit() {
    if (name === '') {
      alert('Please enter a name');
      return;
    }

    const response = await editDataType(dataType, { id, name });
    if (response?.type === 'success') {
      setResult({
        type: 'success',
        message: `${dataType} ${name} successfully updated`,
      });
    }
    if (response?.type === 'error') {
      setResult({
        type: 'error',
        message: response.message,
      });
    }
  }

  return (
    <>
      <input
        className="bg-white border p-2"
        value={name}
        placeholder={itemName}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
      />
      {result?.message}
      {result?.type === 'success' ? (
        <button
          className="text-white"
          type="button"
          onClick={() => {
            setOpen(false);
            setName('');
            setResult(null);
          }}
        >
          Close
        </button>
      ) : (
        <>
          <button className="text-white" type="button" onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button className="text-white" type="submit" onClick={() => handleEdit()}>
            Submit
          </button>
        </>
      )}
    </>
  );
}
