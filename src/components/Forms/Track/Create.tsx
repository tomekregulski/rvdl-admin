import * as RadixDialog from '@radix-ui/react-dialog';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { useDataContext } from '../../../contexts/DataContext';
import { createDataType } from '../../../queries';
import { Select } from '../../Select/Select';
import type { ResponseType } from '../common';

export interface TrackObject {
  trackId: number | undefined;
  tapeId: number | undefined;
  ragaId: number | undefined;
  primaryArtistId: number | undefined;
  plays: number | undefined;
  alap: boolean;
  jor: boolean;
  jhalla: boolean;
  slowGat: boolean;
  mediumGat: boolean;
  fastGat: boolean;
  accompanied: boolean;
  notes: string;
  audioQuality: string;
  master: boolean;
  mediaTypeId: number | undefined;
  public: boolean;
  url: string;
}

export function Create() {
  const [open, setOpen] = useState(false);
  const [track, setTrack] = useState<TrackObject>({
    trackId: undefined,
    tapeId: undefined,
    ragaId: undefined,
    primaryArtistId: undefined,
    plays: 0,
    alap: false,
    jor: false,
    jhalla: false,
    slowGat: false,
    mediumGat: false,
    fastGat: false,
    accompanied: false,
    notes: '',
    audioQuality: '',
    master: false,
    mediaTypeId: undefined,
    public: false,
    url: '',
  });
  const [result, setResult] = useState<ResponseType | null>(null);
  const [isValidForm, setIsValidForm] = useState(false);

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

  useEffect(() => {
    const { trackId, tapeId, ragaId, primaryArtistId, audioQuality, mediaTypeId, url } =
      track;
    if (
      trackId &&
      tapeId &&
      ragaId &&
      primaryArtistId &&
      mediaTypeId &&
      audioQuality !== '' &&
      url !== ''
    ) {
      setIsValidForm(true);
    }
  });

  console.log(isValidForm);

  async function handleCreate() {
    if (!isValidForm) {
      alert('Please enter all information');
      return;
    }

    // @ts-expect-error missing category, location, types
    const response = await createDataType('track', {
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
        message: `Track with name: ${track.trackId} successfully created`,
      });
    }
    if (response?.type === 'error') {
      setResult({
        type: 'error',
        message: response.message,
      });
    }
  }
  console.log(track);

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Trigger>Create Track</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-[rgba(1,1,1,.6)]" />
        <RadixDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] text-black flex flex-col">
          <RadixDialog.Title>{`Create Event`}</RadixDialog.Title>
          <RadixDialog.Description className="flex flex-col">
            <span>{`This action will create a new Track.`}</span>
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
              placeholder="Has Sloe Gat"
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
