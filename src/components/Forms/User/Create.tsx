import * as RadixDialog from '@radix-ui/react-dialog';
import { useDataContext } from 'contexts/DataContext';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { createDataType } from '../../../queries';
import { Select } from '../../Select/Select';
import type { ResponseType } from '../common';

// THIS SHOULD PROBABLY NEVER ACTUALLY BE USED.
// USERS SHOULD REALLY ONLY BE CREATED THROUGH THE UI WORKFLOW IN ORDER TO PROPERLY SYNC THE CREATION OF A STRIPE USER
// I AM ONLY CREATING THIS SO IT CAN BE TEMPORARILY ACTIVATED TO HANDLE SOME EDGE CASE EXPERIENCE

export interface UserObject {
  email: string;
  firstName: string;
  lastName: string;
  subscriptionActive: boolean;
  stripeId: string;
  isAdmin: boolean;
}

export function Create() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserObject>({
    email: '',
    firstName: '',
    lastName: '',
    subscriptionActive: false,
    stripeId: '',
    isAdmin: false,
  });
  const [result, setResult] = useState<ResponseType | null>(null);
  const [isValidForm, setIsValidForm] = useState(false);

  const { users } = useDataContext();

  const allUserEmails = users?.map((user) => user.email) ?? [];

  function checkForExistingEmail() {
    return allUserEmails.includes(user.email);
  }

  useEffect(() => {
    console.log('existingEmail: ', checkForExistingEmail());
  }, [user.email]);

  useEffect(() => {
    const { email, firstName, lastName, stripeId } = user;
    if (email !== '' && firstName !== '' && lastName !== '' && stripeId !== '') {
      setIsValidForm(true);
    }
  });

  async function handleCreate() {
    if (!isValidForm) {
      alert('Please enter all information');
      return;
    }

    const response = await createDataType('user', {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName!,
      subscriptionActive: user.subscriptionActive!,
      stripeId: user.stripeId,
      isAdmin: user.isAdmin,
    });

    if (response?.type === 'success') {
      setResult({
        type: 'success',
        message: `Event with email: ${user.email} successfully created`,
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
              value={user.email}
              type="email"
              placeholder="Email"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setUser((prev) => {
                  return { ...prev, email: event.target.value };
                });
              }}
            />
            <input
              className="bg-white border p-2"
              value={user.firstName}
              placeholder="First Name"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setUser((prev) => {
                  return { ...prev, firstName: event.target.value };
                });
              }}
            />
            <input
              className="bg-white border p-2"
              value={user.lastName}
              placeholder="Last Name"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setUser((prev) => {
                  return { ...prev, lastName: event.target.value };
                });
              }}
            />
            <input
              className="bg-white border p-2"
              value={user.stripeId}
              placeholder="Stripe ID"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setUser((prev) => {
                  return { ...prev, stripeId: event.target.value };
                });
              }}
            />
            <Select
              options={[
                { label: 'true', value: '1' },
                { label: 'false', value: '0' },
              ]}
              placeholder="Has Active Subscription"
              defaultValue="0"
              onValueChange={(value) => {
                setUser((prev) => {
                  return { ...prev, subscriptionActive: value === '0' ? false : true };
                });
              }}
            />
            <Select
              options={[
                { label: 'true', value: '1' },
                { label: 'false', value: '0' },
              ]}
              placeholder="Is Admin"
              defaultValue="0"
              onValueChange={(value) => {
                setUser((prev) => {
                  return { ...prev, isAdmin: value === '0' ? false : true };
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
