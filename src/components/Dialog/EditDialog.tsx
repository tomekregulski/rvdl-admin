import * as RadixDialog from '@radix-ui/react-dialog';
import { ReactNode, useState } from 'react';
// import tw from 'twin.macro';
import {
  Artist,
  Category,
  DataTypes,
  Location as PerformanceLocation,
  MediaType,
} from 'types/Models';

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
  const { id, name } = item;

  const [open, setOpen] = useState(false);

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Trigger>Edit</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-[rgba(1,1,1,.6)]" />
        <RadixDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] text-black flex flex-col gap-4">
          <RadixDialog.Title>{`Edit ${dataType}`}</RadixDialog.Title>
          <RadixDialog.Description className="flex flex-col gap-4">
            <span>{`This action will update the entry for ${dataType} "${name}" (ID: ${id}).`}</span>
            <UpdateNameId item={item} dataType={dataType} setOpen={setOpen} />
          </RadixDialog.Description>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
