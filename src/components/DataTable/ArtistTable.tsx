import { useDataContext } from '../../contexts/DataContext';
import { CreateDialog, DeleteDialog, EditDialog } from '../Dialog';
import { ColumnTypeWithEditDelete, TableCell } from './common';

export function ArtistTable() {
  const { artists } = useDataContext();

  const dataWithEditDelete: ColumnTypeWithEditDelete[] | [] = artists
    ? artists?.map((item) => ({
        id: item.id,
        name: item.name,
        edit: <EditDialog dataType="artist" item={item} />,
        delete: <DeleteDialog dataType="artist" item={item} />,
      }))
    : [];

  const columns = artists ? [...Object.keys(artists[0]), 'Edit', 'Delete'] : [];

  return (
    <>
      <CreateDialog dataType={'artist'} />
      <table>
        <thead>
          <tr>
            {columns.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataWithEditDelete &&
            dataWithEditDelete.map((row) => (
              <tr key={`row-${row.id}`}>
                <TableCell key={`id-${row.id}`}>{row.id}</TableCell>
                <TableCell key={`name-${row.id}`}>{row.name}</TableCell>
                <TableCell key={`edit-${row.id}`}>{row.edit}</TableCell>
                <TableCell key={`delete-${row.id}`}>{row.delete}</TableCell>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
