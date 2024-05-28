import * as RadixDialog from '@radix-ui/react-dialog';
import { ReactNode, useState } from 'react';
// import tw from 'twin.macro';
import { DataTypes } from 'types/Models';

import { createDataType } from '../../queries';
import { Create as CreateNameId } from '../Forms/NameId/Create';

export interface CreateDialogProps {
  dataType: DataTypes;
}

export interface ResponseType {
  type: 'error' | 'success';
  message: string | ReactNode;
}

export function CreateDialog(props: CreateDialogProps) {
  const { dataType } = props;

  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<ResponseType | null>(null);
  const [name, setName] = useState<string>('');

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
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Trigger>Create {dataType}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-[rgba(1,1,1,.6)]" />
        <RadixDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] text-black flex flex-col">
          <RadixDialog.Title>{`Create ${dataType}`}</RadixDialog.Title>
          <RadixDialog.Description className="flex flex-col">
            <span>{`This action will create a new ${dataType}.`}</span>
            <CreateNameId value={name} setValue={setName} />
            {result?.message}
            {result?.type === 'success' ? (
              <button className="text-white" type="button" onClick={() => setOpen(false)}>
                Close
              </button>
            ) : (
              <>
                <button
                  className="text-white"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="text-white"
                  type="button"
                  onClick={() => handleCreate()}
                >
                  Create
                </button>
              </>
            )}
          </RadixDialog.Description>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
