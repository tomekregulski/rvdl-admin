import * as RadixDialog from '@radix-ui/react-dialog';
import { ReactNode, useEffect, useState } from 'react';
// import tw from 'twin.macro';
import type { Tape } from 'types/Models';

import { useDataContext } from '../../../contexts/DataContext';
import { editDataType } from '../../../queries/tableQueries';
import { Select } from '../../Select/Select';
import { TapeObject } from './Create';

export interface EditDialogProps {
  item: Tape;
}

export interface ResponseType {
  type: 'error' | 'success';
  message: string | ReactNode;
}

export function Edit(props: EditDialogProps) {
  const { item } = props;
  const { id } = item;

  const [open, setOpen] = useState(false);
  const [tape, setTape] = useState<TapeObject>({
    tapeId: item.tapeId,
    eventId: item.eventId,
  });
  const [result, setResult] = useState<ResponseType | null>(null);
  const [isValidForm, setIsValidForm] = useState(false);

  const { tapes, events } = useDataContext();

  useEffect(() => {
    if (tape.tapeId !== item.tapeId || tape.eventId !== item.eventId) {
      setIsValidForm(true);
    }
  });

  const eventIds = events
    ? events?.map((event) => {
        return { label: event.id.toString(), value: event.id.toString() };
      })
    : [];

  const tapeIds = tapes
    ? tapes.map((tape) => ({ label: tape.id.toString(), value: tape.id.toString() }))
    : [];

  async function handleEdit() {
    if (!isValidForm) {
      alert('Please enter all information and ensure tapeId is unique');
      return;
    }

    const response = await editDataType('tape', {
      id: item.id,
      tapeId: tape.tapeId!,
      eventId: tape.eventId!,
    });

    if (response?.type === 'success') {
      setResult({
        type: 'success',
        message: `Tape with tapeId: ${tape.tapeId} successfully updated`,
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
          <RadixDialog.Title>{`Edit Tape`}</RadixDialog.Title>
          <RadixDialog.Description className="flex flex-col">
            <span>{`This action will update Tape with ID ${id}.`}</span>
            <Select
              options={tapeIds}
              defaultValue={tape.tapeId?.toString()}
              dataType="tape"
              onValueChange={(value) => {
                setTape((prev) => {
                  return { ...prev, tapeId: parseInt(value) };
                });
              }}
            />
            <Select
              options={eventIds}
              dataType="event"
              defaultValue={tape.eventId?.toString()}
              onValueChange={(value) => {
                setTape((prev) => {
                  return { ...prev, eventId: parseInt(value) };
                });
              }}
            />
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
                  disabled={!isValidForm}
                  className="text-white"
                  type="button"
                  onClick={() => handleEdit()}
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
