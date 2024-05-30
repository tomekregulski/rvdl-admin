import { useDataContext } from '../../contexts/DataContext';
import { CreateDialog, DeleteDialog, EditDialog } from '../Dialog';

interface ColumnTypeWithEditDelete {
  id: number;
  name: string;
  edit: JSX.Element;
  delete: JSX.Element;
}

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
    <>
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
