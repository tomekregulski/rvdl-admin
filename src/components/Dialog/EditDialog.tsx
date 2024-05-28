import * as RadixDialog from '@radix-ui/react-dialog';
// import { deleteDataType } from 'queries/tableQueries';
import { ReactNode, useState } from 'react';
// import tw from 'twin.macro';
import {
  Artist,
  Category,
  DataTypes,
  Location as PerformanceLocation,
  MediaType,
} from 'types/Models';

import { editDataType } from '../../queries';
import { Update as UpdateNameId } from '../Forms/NameId';

export interface EditDialogProps {
  dataType: DataTypes;
  item: Artist | Category | MediaType | PerformanceLocation;
}

export interface ResponseType {
  type: 'error' | 'success';
  message: string | ReactNode;
}

export function EditDialog(props: EditDialogProps) {
  const { item, dataType } = props;
  const { id, name: itemName } = item;

  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<ResponseType | null>(null);
  const [name, setName] = useState<string>('');

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
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Trigger>Edit</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-[rgba(1,1,1,.6)]" />
        <RadixDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] text-black flex flex-col">
          <RadixDialog.Title>{`Edit ${dataType}`}</RadixDialog.Title>
          <RadixDialog.Description className="flex flex-col">
            <span>{`This action will update ${dataType} with ID ${id} and name ${itemName}.`}</span>
            <UpdateNameId value={name} placeholder={item.name} setValue={setName} />
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
                <button
                  className="text-white"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button className="text-white" type="submit" onClick={() => handleEdit()}>
                  Submit
                </button>
              </>
            )}
          </RadixDialog.Description>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
