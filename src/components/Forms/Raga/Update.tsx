import * as RadixDialog from '@radix-ui/react-dialog';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import type { Raga } from 'types/Models';

// import { useDataContext } from '../../../contexts/DataContext';
import { editDataType } from '../../../queries/tableQueries';
import type { ResponseType } from '../common';
import type { RagaObject } from './Create';

export interface EditDialogProps {
  item: Raga;
}

export function Update(props: EditDialogProps) {
  const { item } = props;
  const { id } = item;

  const [open, setOpen] = useState(false);
  const [raga, setRaga] = useState<RagaObject>({
    name: item.name,
    alternateSpelling: item.alternateSpelling,
    time: item.time,
    rasa: item.rasa,
  });
  const [result, setResult] = useState<ResponseType | null>(null);
  const [isValidForm, setIsValidForm] = useState(false);

  // const { ragas } = useDataContext();

  // const ragaNames = ragas
  //   ? ragas?.map((raga) => ({
  //       name: raga.name,
  //       alternateSpelling: raga.alternateSpelling,
  //     }))
  //   : [];

  function checkForExistingRaga() {
    // const alternateSpellings = raga.alternateSpelling
    //   ? raga.alternateSpelling.split(',')
    //   : [];
    // const allNames = [raga.name, ...alternateSpellings];
    // const existingRaga = ragaNames.filter((raga) => {
    //   // console.log(raga);
    //   const {
    //     name: ragaPrimaryNameToCompare,
    //     alternateSpelling: ragaAlternateSpellingsToCompare,
    //   } = raga;
    //   // console.log('raga: ', raga);
    //   // const primaryName = currentRagaName;
    //   const restNames = ragaAlternateSpellingsToCompare
    //     ? ragaAlternateSpellingsToCompare.split(',')
    //     : [];

    //   const allCurrentNames = [ragaPrimaryNameToCompare, ...restNames];
    //   // console.log('allCurrentNames: ', allCurrentNames);
    //   const isExistingRaga = allCurrentNames.filter((name) => {
    //     if (allNames.includes(name)) {
    //       console.log('allCurrentNames: ', allCurrentNames);
    //       console.log('name: ', name);
    //       console.log(allNames.includes(name));
    //       return name;
    //     }
    //   });
    //   return isExistingRaga;
    // });
    // return !!existingRaga.length;
    return false;
  }

  useEffect(() => {
    console.log('exitingRaga: ', checkForExistingRaga());
  }, [raga.name, raga.alternateSpelling]);

  useEffect(() => {
    // @ts-expect-error missing some typing here
    const emptyFields = Object.keys(raga).filter((field) => raga[field] === '');
    // TODO: check that raga !== item
    setIsValidForm(emptyFields.length === 0);
  });

  async function handleUpdate() {
    if (!isValidForm) {
      alert('Please enter all information');
      return;
    }

    const response = await editDataType('raga', {
      id: item.id,
      name: raga.name!,
      alternateSpelling: raga.alternateSpelling!,
      time: raga.time!,
      rasa: raga.rasa!,
    });

    if (response?.type === 'success') {
      setResult({
        type: 'success',
        message: `Raga with name: ${raga.name} successfully updated`,
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
          <RadixDialog.Title>{`Update Raga`}</RadixDialog.Title>
          <RadixDialog.Description className="flex flex-col">
            <span>{`This action will update Raga with ID ${id}.`}</span>
            {/* <CreateNameId dataType={dataType} setOpen={setOpen} /> */}
            <input
              className="bg-white border p-2"
              value={raga.name}
              placeholder="Name"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setRaga((prev) => {
                  // const value = event.target.value ? parseInt(event.target.value) : null;
                  return { ...prev, name: event.target.value };
                });
              }}
            />
            <input
              className="bg-white border p-2"
              value={raga.alternateSpelling}
              placeholder="Alternate spellings (comma-separated, no spaces)"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setRaga((prev) => {
                  // const value = event.target.value ? parseInt(event.target.value) : null;
                  return { ...prev, alternateSpelling: event.target.value };
                });
              }}
            />
            <input
              className="bg-white border p-2"
              value={raga.time}
              placeholder="Time"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setRaga((prev) => {
                  // const value = event.target.value ? parseInt(event.target.value) : null;
                  return { ...prev, time: event.target.value };
                });
              }}
            />
            <input
              className="bg-white border p-2"
              value={raga.rasa}
              placeholder="Rasa"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setRaga((prev) => {
                  // const value = event.target.value ? parseInt(event.target.value) : null;
                  return { ...prev, rasa: event.target.value };
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
