import { useQuery } from '@tanstack/react-query';

import { fetchTracks } from '../../queries/tableQueries';
import { Charts } from './Charts';

export function MetricsContainer() {
  const { data, isLoading, isError } = useQuery(['tracks'], () => fetchTracks(), {
    staleTime: 15000,
  });

  return (
    <div className="flex flex-col gap-4">
      <div>Metrics</div>
      {isLoading && <div>loading...</div>}
      {data && <Charts />}
      {isError && <div>An error occured</div>}
    </div>
  );
}
