import { useQuery } from '@tanstack/react-query';

import { fetchTracks } from '../queries/audioQueries';

export function DataTable() {
  const { data, isLoading, isError } = useQuery(['tracks'], () => fetchTracks(), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return (
    <>
      <div>DataTable</div>
      {isLoading && <div>loading...</div>}
      {data && <div>Returned {data.length} tracks</div>}
      {isError && <div>An error occured</div>}
    </>
  );
}
