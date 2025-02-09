import * as RadixDialog from '@radix-ui/react-dialog';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import type { Track } from 'types/Models';

import { useDataContext } from '../../../contexts/DataContext';
// import { useDataContext } from '../../../contexts/DataContext';
import { editDataType } from '../../../queries/tableQueries';
import { Select } from '../../Select/Select';
import type { ResponseType } from '../common';
import type { TrackObject } from './Create';

export interface EditDialogProps {
  item: Track;
}

export function Update(props: EditDialogProps) {
  const { item } = props;
  const { id } = item;

  const [open, setOpen] = useState(false);
  const [track, setTrack] = useState<TrackObject>({
    trackId: item.trackId!,
    tapeId: item.tapeId!,
    ragaId: item.ragaId!,
    primaryArtistId: item.primaryArtistId!,
    plays: item.plays,
    alap: item.alap,
    jor: item.jor,
    jhalla: item.jhalla,
    slowGat: item.slowGat,
    mediumGat: item.mediumGat,
    fastGat: item.fastGat,
    accompanied: item.accompanied,
    notes: item.notes || '',
    audioQuality: item.audioQuality,
    master: item.master,
    mediaTypeId: item.mediaTypeId!,
    public: item.public,
    url: item.url,
  });
  const [result, setResult] = useState<ResponseType | null>(null);
  // const [isValidForm, setIsValidForm] = useState(false);

  const { tapes, tracks, ragas, artists, mediaTypes } = useDataContext();

  const trackIds = tracks ? tracks?.map((track) => track.id) : [];

  const tapesList = tapes
    ? tapes?.map((tape) => ({
        label: tape.id.toString(),
        value: tape.id.toString(),
      }))
    : [];

  const ragasList = ragas
    ? ragas?.map((raga) => ({
        label: raga.name,
        value: raga.id.toString(),
      }))
    : [];

  const artistsList = artists
    ? artists?.map((artist) => ({
        label: artist.name,
        value: artist.id.toString(),
      }))
    : [];

  const mediaTypesList = mediaTypes
    ? mediaTypes?.map((mediaType) => ({
        label: mediaType.name,
        value: mediaType.id.toString(),
      }))
    : [];

  function checkForExistingTrackId() {
    return track.trackId ? trackIds.includes(track.trackId) : false;
  }

  useEffect(() => {
    console.log('existingTrack: ', checkForExistingTrackId());
  }, [track.trackId]);

  // useEffect(() => {
  //   const { trackId, tapeId, ragaId, primaryArtistId, audioQuality, mediaTypeId, url } =
  //     track;
  //   if (
  //     trackId  &&
  //     tapeId &&
  //     ragaId &&
  //     primaryArtistId &&
  //     mediaTypeId &&
  //     audioQuality !== '' &&
  //     url !== ''
  //   ) {
  //     setIsValidForm(true);
  //   }
  // });

  console.log(item);
  console.log(track);

  async function handleUpdate() {
    // if (!isValidForm) {
    //   alert('Please enter all information');
    //   return;
    // }

    const response = await editDataType('track', {
      id: item.id,
      trackId: track.trackId!,
      tapeId: track.tapeId!,
      ragaId: track.ragaId!,
      primaryArtistId: track.primaryArtistId!,
      plays: 0,
      alap: track.alap,
      jor: track.jor,
      jhalla: track.jhalla,
      slowGat: track.slowGat,
      mediumGat: track.mediumGat,
      fastGat: track.fastGat,
      accompanied: track.accompanied,
      notes: track.notes,
      audioQuality: track.audioQuality,
      master: track.master,
      mediaTypeId: track.mediaTypeId!,
      public: track.public,
      url: track.url,
    });

    if (response?.type === 'success') {
      setResult({
        type: 'success',
        message: `Track with name: ${track.trackId} successfully updated`,
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
          <RadixDialog.Description className="flex flex-col gap-4 overflow-scroll">
            <span>{`This action will update Track with ID ${id}.`}</span>
            <input
              className="bg-white border p-2"
              value={track.trackId}
              placeholder="Track ID"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setTrack((prev) => {
                  return { ...prev, trackId: parseInt(event.target.value) };
                });
              }}
            />
            {/* We should probably never manually changes the play count */}
            {/* <input
              className="bg-white border p-2"
              value={track.plays}
              type="number"
              placeholder="Plays"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setTrack((prev) => {
                  return { ...prev, plays: parseInt(event.target.value) };
                });
              }}
            /> */}
            <Select
              options={tapesList}
              placeholder="Select Tape ID"
              onValueChange={(value) => {
                setTrack((prev) => {
                  return { ...prev, tapeId: parseInt(value) };
                });
              }}
            />
            <Select
              options={ragasList}
              placeholder="Select Raga"
              onValueChange={(value) => {
                setTrack((prev) => {
                  return { ...prev, ragaId: parseInt(value) };
                });
              }}
            />
            <Select
              options={artistsList}
              placeholder="Select Artist"
              onValueChange={(value) => {
                setTrack((prev) => {
                  return { ...prev, primaryArtistId: parseInt(value) };
                });
              }}
            />
            <Select
              options={mediaTypesList}
              placeholder="Select Media Type"
              onValueChange={(value) => {
                setTrack((prev) => {
                  return { ...prev, mediaTypeId: parseInt(value) };
                });
              }}
            />
            <Select
              options={[
                { label: 'true', value: '1' },
                { label: 'false', value: '0' },
              ]}
              placeholder="Has Alap"
              defaultValue="0"
              onValueChange={(value) => {
                setTrack((prev) => {
                  return { ...prev, alap: value === '0' ? false : true };
                });
              }}
            />
            <Select
              options={[
                { label: 'true', value: '1' },
                { label: 'false', value: '0' },
              ]}
              placeholder="Has Jor"
              defaultValue="0"
              onValueChange={(value) => {
                setTrack((prev) => {
                  return { ...prev, jor: value === '0' ? false : true };
                });
              }}
            />
            <Select
              options={[
                { label: 'true', value: '1' },
                { label: 'false', value: '0' },
              ]}
              placeholder="Has Jhalla"
              defaultValue="0"
              onValueChange={(value) => {
                setTrack((prev) => {
                  return { ...prev, jhalla: value === '0' ? false : true };
                });
              }}
            />
            <Select
              options={[
                { label: 'true', value: '1' },
                { label: 'false', value: '0' },
              ]}
              placeholder="Has Slow Gat"
              defaultValue="0"
              onValueChange={(value) => {
                setTrack((prev) => {
                  return { ...prev, slowGat: value === '0' ? false : true };
                });
              }}
            />
            <Select
              options={[
                { label: 'true', value: '1' },
                { label: 'false', value: '0' },
              ]}
              placeholder="Has Medium Gat"
              defaultValue="0"
              onValueChange={(value) => {
                setTrack((prev) => {
                  return { ...prev, mediumGat: value === '0' ? false : true };
                });
              }}
            />
            <Select
              options={[
                { label: 'true', value: '1' },
                { label: 'false', value: '0' },
              ]}
              placeholder="Has Fast Gat"
              defaultValue="0"
              onValueChange={(value) => {
                setTrack((prev) => {
                  return { ...prev, fastGat: value === '0' ? false : true };
                });
              }}
            />
            <Select
              options={[
                { label: 'true', value: '1' },
                { label: 'false', value: '0' },
              ]}
              placeholder="Is Master Tape"
              defaultValue="0"
              onValueChange={(value) => {
                setTrack((prev) => {
                  return { ...prev, master: value === '0' ? false : true };
                });
              }}
            />
            <Select
              options={[
                { label: 'true', value: '1' },
                { label: 'false', value: '0' },
              ]}
              placeholder="Is Public Track"
              defaultValue="0"
              onValueChange={(value) => {
                setTrack((prev) => {
                  return { ...prev, public: value === '0' ? false : true };
                });
              }}
            />
            <Select
              options={[
                { label: 'true', value: '1' },
                { label: 'false', value: '0' },
              ]}
              placeholder="Is Accompanied"
              defaultValue="0"
              onValueChange={(value) => {
                setTrack((prev) => {
                  return { ...prev, accompanied: value === '0' ? false : true };
                });
              }}
            />
            <input
              className="bg-white border p-2"
              value={track.url}
              placeholder="Url"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setTrack((prev) => {
                  return { ...prev, url: event.target.value };
                });
              }}
            />
            <input
              className="bg-white border p-2"
              value={track.audioQuality}
              placeholder="Audio Quality"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setTrack((prev) => {
                  return { ...prev, audioQuality: event.target.value };
                });
              }}
            />
            <textarea
              className="bg-white border p-2"
              value={track.notes}
              placeholder="Notes"
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                setTrack((prev) => {
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
                  // disabled={!isValidForm}
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
