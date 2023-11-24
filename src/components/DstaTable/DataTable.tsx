import { useQuery } from '@tanstack/react-query';

import { fetchTracks } from '../../queries/audioQueries';
import { Table } from './Table/Table';

export function DataTable() {
  const { data, isLoading, isError } = useQuery(['tracks'], () => fetchTracks(), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return (
    <>
      <div>DataTable</div>
      {isLoading && <div>loading...</div>}
      {data && <Table />}
      {isError && <div>An error occured</div>}
    </>
  );
}
