import { useDataContext } from '../../contexts/DataContext';
import { CreateDialog, DeleteDialog, EditDialog } from '../Dialog';
// Location, Category, Artist, MediaType
// Tape
// Raga
// Event
// Track

interface ColumnTypeWithEditDelete {
  id: number;
  name: string;
  edit: JSX.Element;
  delete: JSX.Element;
}

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
    <>
      <CreateDialog dataType={'location'} />
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
                <td key={`name-${row.id}`}>{row.name}</td>
                <td key={`edit-${row.id}`}>{row.edit}</td>
                <td key={`delete-${row.id}`}>{row.delete}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
