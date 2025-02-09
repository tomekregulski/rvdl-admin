import * as RadixDialog from '@radix-ui/react-dialog';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { useDataContext } from '../../../contexts/DataContext';
import { createDataType } from '../../../queries';
import { Select } from '../../Select/Select';
import type { ResponseType } from '../common';

export interface TapeObject {
  tapeId: number | undefined;
  eventId: number | undefined;
}

export function Create() {
  const [open, setOpen] = useState(false);
  const [tape, setTape] = useState<TapeObject>({
    tapeId: undefined,
    eventId: undefined,
  });
  const [result, setResult] = useState<ResponseType | null>(null);
  const [isValidForm, setIsValidForm] = useState(false);

  console.log(tape);

  const { tapes, events } = useDataContext();

  const eventIds = events
    ? events?.map((event) => ({ label: event.id.toString(), value: event.id.toString() }))
    : [];

  const tapeIds = tapes ? tapes.map((tape) => tape.id) : [];

  useEffect(() => {
    if (tape.tapeId && tape.eventId && tapeIds && !tapeIds.includes(tape.tapeId)) {
      setIsValidForm(true);
    }
  });

  async function handleCreate() {
    console.log(isValidForm);
    if (!isValidForm) {
      alert('Please enter all information and ensure tapeId is unique');
      return;
    }
    console.log('sending');

    const response = await createDataType('tape', {
      tapeId: tape.tapeId!,
      eventId: tape.eventId!,
    });
    console.log(response);

    if (response?.type === 'success') {
      setResult({
        type: 'success',
        message: `Tape with tpeId: ${tape.tapeId} successfully created`,
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
      <RadixDialog.Trigger className="w-[150px]">Create Tape</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-[rgba(1,1,1,.6)]" />
        <RadixDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] text-black flex flex-col">
          <RadixDialog.Title>{`Create Tape`}</RadixDialog.Title>
          <RadixDialog.Description className="flex flex-col">
            <span>{`This action will create a new Tape.`}</span>
            {/* <CreateNameId dataType={dataType} setOpen={setOpen} /> */}
            <input
              className="bg-white border p-2"
              value={tape.tapeId}
              type="number"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setTape((prev) => {
                  // const value = event.target.value ? parseInt(event.target.value) : null;
                  return { ...prev, tapeId: parseInt(event.target.value) };
                });
              }}
            />
            <Select
              options={eventIds}
              placeholder="Select Event Id"
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
