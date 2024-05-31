import { useDataContext } from '../../contexts/DataContext';
import { DeleteDialog } from '../Dialog';
import { Create, Edit } from '../Forms/Tape';

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
                <td key={`id-${row.id}`}>{row.id}</td>
                <td key={`event-${row.id}`}>{row.eventId}</td>
                <td key={`tape-${row.id}`}>{row.tapeId}</td>
                <td key={`edit-${row.id}`}>{row.edit}</td>
                <td key={`delete-${row.id}`}>{row.delete}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
