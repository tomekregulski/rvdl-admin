import { useDataContext } from '../../contexts/DataContext';
import { CreateDialog, DeleteDialog, EditDialog } from '../Dialog';
import { ColumnTypeWithEditDelete, TableCell, TableWrapper } from './common';

export function LocationTable() {
  const { locations } = useDataContext();

  const dataWithEditDelete: ColumnTypeWithEditDelete[] | [] = locations
    ? locations?.map((item) => ({
        id: item.id,
        name: item.name,
        edit: <EditDialog dataType="location" item={item} />,
        delete: <DeleteDialog dataType="location" item={item} />,
      }))
    : [];

  const columns = locations ? [...Object.keys(locations[0]), 'Edit', 'Delete'] : [];

  return (
    <TableWrapper>
      <CreateDialog dataType={'location'} />
      <table>
        <thead>
          <tr>
            {columns.map((item) => (
              <th className="text-center" key={item}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataWithEditDelete &&
            dataWithEditDelete.map((row) => (
              <tr className="border" key={`row-${row.id}`}>
                <TableCell key={`id-${row.id}`}>{row.id}</TableCell>
                <TableCell key={`name-${row.id}`}>{row.name}</TableCell>
                <TableCell key={`edit-${row.id}`}>{row.edit}</TableCell>
                <TableCell key={`delete-${row.id}`}>{row.delete}</TableCell>
              </tr>
            ))}
        </tbody>
      </table>
    </TableWrapper>
  );
}
