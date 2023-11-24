import { useQuery } from '@tanstack/react-query';

import { fetchTracks } from '../../queries/audioQueries';
import { Charts } from './Charts';

export function Metrics() {
  const { data, isLoading, isError } = useQuery(['tracks'], () => fetchTracks(), {
    staleTime: 15000,
  });

  return (
    <>
      <div>Metrics</div>
      {isLoading && <div>loading...</div>}
      {data && <Charts />}
      {isError && <div>An error occured</div>}
    </>
  );
}
