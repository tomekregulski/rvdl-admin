import { ColumnTypeWithEditDelete, TableCell } from './common';

const tableButtonStyles = { background: 'rgb(36,36,36)' };
interface NameIdData {
  id: number;
  name: string;
}

const fakeData: NameIdData[] = [
  {
    id: 1,
    name: 'one',
  },
  {
    id: 2,
    name: 'two',
  },
];

function handleEdit(id: number) {
  console.log(id);
}

function handleDelete(id: number) {
  console.log(id);
}

export function NameIdTable(props: { data: Location[] }) {
  const { data } = props;
  console.log(data);

  const dataWithEditDelete: ColumnTypeWithEditDelete[] = fakeData.map((item) => ({
    id: item.id,
    name: item.name,
    edit: (
      <button type="button" style={tableButtonStyles} onClick={() => handleEdit(item.id)}>
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
  }));

  const columns = [...Object.keys(data[0]), 'Edit', 'Delete'];

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
        {dataWithEditDelete.map((row) => (
          <tr key={`row-${row.id}`}>
            <TableCell key={`id-${row.id}`}>{row.id}</TableCell>
            <TableCell key={`name-${row.id}`}>{row.name}</TableCell>
            <TableCell key={`edit-${row.id}`}>{row.edit}</TableCell>
            <TableCell key={`delete-${row.id}`}>{row.delete}</TableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
