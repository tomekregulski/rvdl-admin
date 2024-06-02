import * as RadixDialog from '@radix-ui/react-dialog';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import type { Event } from 'types/Models';

import { useDataContext } from '../../../contexts/DataContext';
// import { useDataContext } from '../../../contexts/DataContext';
import { editDataType } from '../../../queries/tableQueries';
import { Select } from '../../Select/Select';
import type { ResponseType } from '../common';
import type { EventObject } from './Create';

export interface EditDialogProps {
  item: Event;
}

export function Update(props: EditDialogProps) {
  const { item } = props;
  const { id } = item;

  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState<EventObject>({
    eventName: item.eventName,
    date: item.date,
    locationId: item.locationId,
    categoryId: item.categoryId,
    notes: item.notes,
  });
  const [result, setResult] = useState<ResponseType | null>(null);
  const [isValidForm, setIsValidForm] = useState(false);

  const { events, locations, categories } = useDataContext();

  const eventNames = events ? events?.map((event) => event.eventName) : [];

  const locationsList = locations
    ? locations?.map((location) => ({
        label: location.name,
        value: location.id.toString(),
      }))
    : [];

  const categoriesList = categories
    ? categories?.map((category) => ({
        label: category.name,
        value: category.id.toString(),
      }))
    : [];

  function checkForExistingName() {
    return eventNames.includes(event.eventName);
  }

  useEffect(() => {
    console.log('ecistingName: ', checkForExistingName());
  }, [event.eventName]);

  useEffect(() => {
    const { eventName, date, locationId, categoryId, notes } = event;
    if (
      eventName !== item.eventName ||
      date !== item.date ||
      locationId !== item.locationId ||
      categoryId !== item.categoryId ||
      notes !== item.notes
    ) {
      setIsValidForm(true);
    }
  });

  async function handleUpdate() {
    if (!isValidForm) {
      alert('Please enter all information');
      return;
    }

    const response = await editDataType('event', {
      id: item.id,
      eventName: event.eventName,
      date: event.date,
      locationId: event.locationId!,
      categoryId: event.categoryId!,
      notes: event.notes,
    });

    if (response?.type === 'success') {
      setResult({
        type: 'success',
        message: `Event with name: ${event.eventName} successfully updated`,
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
          <RadixDialog.Title>{`Update Event`}</RadixDialog.Title>
          <RadixDialog.Description className="flex flex-col">
            <span>{`This action will update Event with ID ${id}.`}</span>
            {/* <CreateNameId dataType={dataType} setOpen={setOpen} /> */}
            <input
              className="bg-white border p-2"
              value={event.eventName}
              placeholder="Event name"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setEvent((prev) => {
                  return { ...prev, eventName: event.target.value };
                });
              }}
            />
            <input
              className="bg-white border p-2"
              value={event.date}
              placeholder="Date (mm/dd/yyyy)"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setEvent((prev) => {
                  return { ...prev, date: event.target.value };
                });
              }}
            />
            <Select
              options={locationsList}
              placeholder="Select Location"
              defaultValue={event.locationId ? event.locationId.toString() : undefined}
              onValueChange={(value) => {
                setEvent((prev) => {
                  return { ...prev, locationId: parseInt(value) };
                });
              }}
            />
            <Select
              options={categoriesList}
              placeholder="Select Category"
              defaultValue={event.categoryId ? event.categoryId.toString() : undefined}
              onValueChange={(value) => {
                setEvent((prev) => {
                  return { ...prev, categoryId: parseInt(value) };
                });
              }}
            />
            <textarea
              className="bg-white border p-2"
              placeholder="Notes"
              value={item.notes}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                setEvent((prev) => {
                  // const value = event.target.value ? parseInt(event.target.value) : null;
                  return { ...prev, notes: event.target.value };
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
                  onClick={() => handleUpdate()}
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
