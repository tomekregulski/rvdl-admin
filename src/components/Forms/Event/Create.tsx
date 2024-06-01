import * as RadixDialog from '@radix-ui/react-dialog';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';

import { useDataContext } from '../../../contexts/DataContext';
import { createDataType } from '../../../queries';
import { Select } from '../../Select/Select';

export interface ResponseType {
  type: 'error' | 'success';
  message: string | ReactNode;
}

export interface EventObject {
  eventName: string;
  date: string;
  locationId: number | undefined;
  categoryId: number | undefined;
  notes: string;
}

export function Create() {
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState<EventObject>({
    eventName: '',
    date: '',
    locationId: undefined,
    categoryId: undefined,
    notes: '',
  });
  const [result, setResult] = useState<ResponseType | null>(null);
  const [isValidForm, setIsValidForm] = useState(false);

  const { events, locations, categories } = useDataContext();

  console.log(categories);

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
    const { eventName, date, locationId, categoryId } = event;
    if (eventName !== '' && date !== '' && locationId && categoryId) {
      setIsValidForm(true);
    }
  });

  async function handleCreate() {
    if (!isValidForm) {
      alert('Please enter all information');
      return;
    }

    // @ts-expect-error missing category, location, types
    const response = await createDataType('event', {
      eventName: event.eventName,
      date: event.date,
      locationId: event.locationId!,
      categoryId: event.categoryId!,
      notes: event.notes,
    });

    if (response?.type === 'success') {
      setResult({
        type: 'success',
        message: `Event with name: ${event.eventName} successfully created`,
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
      <RadixDialog.Trigger>Create Event</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-[rgba(1,1,1,.6)]" />
        <RadixDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] text-black flex flex-col">
          <RadixDialog.Title>{`Create Event`}</RadixDialog.Title>
          <RadixDialog.Description className="flex flex-col">
            <span>{`This action will create a new Event.`}</span>
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
              dataType="location"
              onValueChange={(value) => {
                setEvent((prev) => {
                  return { ...prev, locationId: parseInt(value) };
                });
              }}
            />
            <Select
              options={categoriesList}
              dataType="category"
              onValueChange={(value) => {
                setEvent((prev) => {
                  return { ...prev, categoryId: parseInt(value) };
                });
              }}
            />
            <textarea
              className="bg-white border p-2"
              value={event.notes}
              placeholder="Notes"
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
