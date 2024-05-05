import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DataTypes } from 'src/components/DataTable/Table/DataTableContainer';
import type { Artist, Event, Location, MediaType, Raga, Tape, Track } from 'src/types';

import { getAllData } from '../util/getAllData';

export const OUTSIDE_DATA_PROVIDER_ERROR =
  'Attempting to access DataContext outside of Provider!';

interface DataContextProps {
  children: ReactNode;
}

interface DataState {
  locations: Location[] | null;
  ragas: Raga[] | null;
  tapes: Tape[] | null;
  events: Event[] | null;
  artists: Artist[] | null;
  mediaTypes: MediaType[] | null;
  tracks: Track[] | null;
  getMappedData: (dataType: string) => unknown;
}

export const DataContext = createContext<DataState | null>(null);

export const DataProvider = (props: DataContextProps) => {
  const [locations, setLocations] = useState<Location[] | null>(null);
  const [ragas, setRagas] = useState<Raga[] | null>(null);
  const [tapes, setTapes] = useState<Tape[] | null>(null);
  const [events, setEvents] = useState<Event[] | null>(null);
  const [artists, setArtists] = useState<Artist[] | null>(null);
  const [mediaTypes, setMediaTypes] = useState<MediaType[] | null>(null);
  const [tracks, setTracks] = useState<Track[] | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    async function getData() {
      const { locations, ragas, tapes, events, artists, mediaTypes, tracks } =
        await getAllData();

      setLocations(locations);
      setRagas(ragas);
      setTapes(tapes);
      setEvents(events);
      setArtists(artists);
      setMediaTypes(mediaTypes);
      setTracks(tracks);
      setIsDataLoaded(true);
    }
    if (!isDataLoaded) {
      getData();
    }
  });

  function getMappedData(dataType: DataTypes) {
    switch (dataType) {
      case 'location':
        return locations;
      case 'raga':
        return ragas;
      case 'tape':
        return tapes;
      case 'event':
        return events;
      case 'artist':
        return artists;
      case 'media-type':
        return mediaTypes;
      case 'track':
        return tracks;
      default:
        return {};
    }
  }

  const value = useMemo(
    () => ({
      locations,
      ragas,
      tapes,
      events,
      artists,
      mediaTypes,
      tracks,
      getMappedData,
    }),
    [locations, ragas, tapes, events, artists, mediaTypes, tracks, getMappedData],
  );

  return <DataContext.Provider value={value}>{props.children}</DataContext.Provider>;
};

export const useDataContext = () => {
  const dataContext = useContext(DataContext);

  if (!dataContext) {
    throw new Error(OUTSIDE_DATA_PROVIDER_ERROR);
  }

  return dataContext;
};