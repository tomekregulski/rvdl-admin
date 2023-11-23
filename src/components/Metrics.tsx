import { useQuery } from '@tanstack/react-query';

import { fetchTracks } from '../queries/audioQueries';

export function Metrics() {
  const { data, isLoading, isError } = useQuery(['tracks'], () => fetchTracks(), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return (
    <>
      <div>Metrics</div>
      {isLoading && <div>loading...</div>}
      {data && <div>Successful query</div>}
      {isError && <div>An error occured</div>}
    </>
  );
}
