import { useDataContext } from '../../contexts/DataContext';

const tableButtonStyles = { background: 'rgb(36,36,36)' };

interface ColumnTypeWithEditDelete {
  id: number;
  name: string;
  edit: JSX.Element;
  delete: JSX.Element;
}

function handleEdit(id: number) {
  console.log(id);
}

function handleDelete(id: number) {
  console.log(id);
}

export function ArtistTable() {
  const { artists } = useDataContext();

  const dataWithEditDelete: ColumnTypeWithEditDelete[] | [] = artists
    ? artists?.map((item) => ({
        id: item.id,
        name: item.name,
        edit: (
          <button
            type="button"
            style={tableButtonStyles}
            onClick={() => handleEdit(item.id)}
          >
            Edit
          </button>
        ),
        delete: (
          <button
            type="button"
            style={tableButtonStyles}
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </button>
        ),
      }))
    : [];

  const columns = artists ? [...Object.keys(artists[0]), 'Edit', 'Delete'] : [];

  return (
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
  );
}
