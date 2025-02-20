import * as RadixDialog from '@radix-ui/react-dialog';
import { ReactNode, useState } from 'react';
// import tw from 'twin.macro';
import {
  Artist,
  Category,
  DataTypes,
  Event,
  Location as PerformanceLocation,
  MediaType,
  Tape,
  Track,
  User,
} from 'types/Models';

import { deleteDataType } from '../../queries/tableQueries';

export interface DialogProps {
  dataType: DataTypes;
  item: Artist | Category | MediaType | PerformanceLocation | Tape | Event | Track | User;
}

export interface ResponseType {
  type: 'error' | 'success';
  message: string | ReactNode;
}

export function DeleteDialog(props: DialogProps) {
  const { item, dataType } = props;
  const { id } = item;

  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<ResponseType | null>(null);

  async function handleDelete() {
    setResult({
      type: 'success',
      message: `${dataType} with ID ${id} successfully deleted`,
    });
    const response = await deleteDataType(dataType, { id });
    if (response?.type === 'success') {
      setResult({
        type: 'success',
        message: `${dataType} with ID ${id} successfully successfully`,
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
      <RadixDialog.Trigger>Delete</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-[rgba(1,1,1,.6)]" />
        <RadixDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] text-black flex flex-col gap-4">
          <RadixDialog.Title>{`Delete ${dataType}`}</RadixDialog.Title>
          <RadixDialog.Description className="flex flex-col gap-4">
            <span>{`This action will delete $the entry for ${dataType} "${name}" (ID: ${id}).`}</span>
            <span>
              Please ensure that any dependent items have been deleted before proceeding
            </span>
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
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
              </>
            )}
          </RadixDialog.Description>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
