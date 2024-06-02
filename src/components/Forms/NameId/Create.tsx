import { ChangeEvent, Dispatch, ReactNode, useState } from 'react';
import type { DataTypes } from 'types/Models';

import { createDataType } from '../../../queries';

export interface CreateNameIdProps {
  dataType: DataTypes;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export interface ResponseType {
  type: 'error' | 'success';
  message: string | ReactNode;
}

export function Create(props: CreateNameIdProps) {
  const { dataType, setOpen } = props;

  const [name, setName] = useState<string>('');
  const [result, setResult] = useState<ResponseType | null>(null);

  async function handleCreate() {
    if (name === '') {
      alert('Please enter a name');
    }

    const response = await createDataType(dataType, { name });
    if (response?.type === 'success') {
      setResult({
        type: 'success',
        message: `${dataType} ${name} successfully created`,
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
        onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
      />
      {result?.message}
      {result?.type === 'success' ? (
        <button className="text-white" type="button" onClick={() => setOpen(false)}>
          Close
        </button>
      ) : (
        <>
          <button className="text-white" type="button" onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button className="text-white" type="button" onClick={() => handleCreate()}>
            Create
          </button>
        </>
      )}
    </>
  );
}
