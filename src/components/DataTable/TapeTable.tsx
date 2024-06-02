import { useDataContext } from '../../contexts/DataContext';
import { DeleteDialog } from '../Dialog';
import { Create, Edit } from '../Forms/Tape';
import { TableCell } from './common';

interface ColumnTypeWithEditDelete {
  id: number;
  eventId: number;
  tapeId: number;
  edit: JSX.Element;
  delete: JSX.Element;
}

export function TapeTable() {
  const { tapes } = useDataContext();

  const dataWithEditDelete: ColumnTypeWithEditDelete[] | [] = tapes
    ? tapes?.map((item) => ({
        id: item.id,
        eventId: item.eventId,
        tapeId: item.tapeId,
        edit: <Edit item={item} />,
        delete: <DeleteDialog dataType="tape" item={item} />,
      }))
    : [];

  const columns = tapes ? [...Object.keys(tapes[0]), 'Edit', 'Delete'] : [];

  return (
    <>
      <Create />
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
                <TableCell key={`event-${row.id}`}>{row.eventId}</TableCell>
                <TableCell key={`tape-${row.id}`}>{row.tapeId}</TableCell>
                <TableCell key={`edit-${row.id}`}>{row.edit}</TableCell>
                <TableCell key={`delete-${row.id}`}>{row.delete}</TableCell>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
