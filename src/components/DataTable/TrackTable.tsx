import { Track } from '@types';

import { useDataContext } from '../../contexts/DataContext';
import { DeleteDialog } from '../Dialog';
import { Create, Update } from '../Forms/Track';
import { TableCell, TableWrapper } from './common';
interface ColumnTypeWithEditDelete extends Omit<Track, 'mediaType' | 'tape' | 'raga'> {
  edit: JSX.Element;
  delete: JSX.Element;
}

export function TrackTable() {
  const { tracks } = useDataContext();
  console.log(tracks);

  const dataWithEditDelete: ColumnTypeWithEditDelete[] | [] = tracks
    ? tracks?.map((item) => ({
        id: item.id,
        trackId: item.trackId,
        tapeId: item.tapeId,
        ragaId: item.ragaId,
        primaryArtistId: item.primaryArtistId,
        plays: item.plays,
        alap: item.alap,
        jor: item.jor,
        jhalla: item.jhalla,
        slowGat: item.slowGat,
        mediumGat: item.mediumGat,
        fastGat: item.fastGat,
        accompanied: item.accompanied,
        notes: item.notes,
        audioQuality: item.audioQuality,
        master: item.master,
        mediaTypeId: item.mediaTypeId,
        public: item.public,
        url: item.url,
        edit: <Update item={item} />,
        delete: <DeleteDialog dataType="track" item={item} />,
      }))
    : [];

  const columns = tracks ? [...Object.keys(tracks[0]), 'Edit', 'Delete'] : [];

  const unusedColumns = ['tape', 'mediaType', 'raga'];

  return (
    <TableWrapper>
      <Create />
      <table
        style={{
          textOverflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <thead>
          <tr>
            {columns.map((item) => {
              if (!unusedColumns.includes(item)) {
                return <th key={item}>{item}</th>;
              } else {
                return null;
              }
            })}
          </tr>
        </thead>
        <tbody>
          {dataWithEditDelete &&
            dataWithEditDelete.map((row) => (
              <tr
                className="border"
                key={`row-${row.id}`}
                style={{
                  textOverflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                <TableCell key={`id-${row.id}`}>{row.id}</TableCell>
                <TableCell key={`track-id-${row.id}`}>{row.trackId}</TableCell>
                <TableCell key={`tape-id-${row.id}`}>{row.tapeId}</TableCell>
                <TableCell key={`raga-id-${row.id}`}>{row.ragaId}</TableCell>
                <TableCell key={`primary-artist-id-${row.id}`}>
                  {row.primaryArtistId}
                </TableCell>
                <TableCell key={`plays-${row.id}`}>{row.plays}</TableCell>
                <TableCell key={`alap-${row.id}`}>{row.alap ? 'yes' : 'no'}</TableCell>
                <TableCell key={`jor-${row.id}`}>{row.jor ? 'yes' : 'no'}</TableCell>
                <TableCell key={`jhalla-${row.id}`}>
                  {row.jhalla ? 'yes' : 'no'}
                </TableCell>
                <TableCell key={`slow-gat-${row.id}`}>
                  {row.slowGat ? 'yes' : 'no'}
                </TableCell>
                <TableCell key={`medium-gat-${row.id}`}>
                  {row.mediumGat ? 'yes' : 'no'}
                </TableCell>
                <TableCell key={`fast-gat-${row.id}`}>
                  {row.fastGat ? 'yes' : 'no'}
                </TableCell>
                <TableCell key={`accompanied-${row.id}`}>
                  {row.accompanied ? 'yes' : 'no'}
                </TableCell>
                <TableCell key={`notes-${row.id}`}>{row.notes}</TableCell>
                <TableCell key={`audioQuality-${row.id}`}>{row.audioQuality}</TableCell>
                <TableCell key={`master-${row.id}`}>
                  {row.master ? 'yes' : 'no'}
                </TableCell>
                <TableCell key={`media-type-id-${row.id}`}>{row.mediaTypeId}</TableCell>
                <TableCell key={`public-${row.id}`}>
                  {row.public ? 'yes' : 'no'}
                </TableCell>
                <TableCell key={`url-${row.id}`}>{row.url}</TableCell>
                <TableCell key={`edit-${row.id}`}>{row.edit}</TableCell>
                <TableCell key={`delete-${row.id}`}>{row.delete}</TableCell>
              </tr>
            ))}
        </tbody>
      </table>
    </TableWrapper>
  );
}
