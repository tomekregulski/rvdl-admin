import { useDataContext } from '../../contexts/DataContext';
import { CreateDialog, DeleteDialog, EditDialog } from '../Dialog';
import { ColumnTypeWithEditDelete, TableCell, TableWrapper } from './common';

export function MediaTypeTable() {
  const { mediaTypes } = useDataContext();

  const dataWithEditDelete: ColumnTypeWithEditDelete[] | [] = mediaTypes
    ? mediaTypes?.map((item) => ({
        id: item.id,
        name: item.name,
        edit: <EditDialog dataType="media-type" item={item} />,
        delete: <DeleteDialog dataType="media-type" item={item} />,
      }))
    : [];

  const columns = mediaTypes ? [...Object.keys(mediaTypes[0]), 'Edit', 'Delete'] : [];

  return (
    <TableWrapper>
      <CreateDialog dataType={'media-type'} />
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
