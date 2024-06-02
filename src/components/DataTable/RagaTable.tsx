import { Raga } from '@types';

import { useDataContext } from '../../contexts/DataContext';
import { DeleteDialog } from '../Dialog';
import { Create, Update } from '../Forms/Raga';
import { TableCell } from './common';

interface ColumnTypeWithEditDelete extends Omit<Raga, 'tracks'> {
  edit: JSX.Element;
  delete: JSX.Element;
}

export function RagaTable() {
  const { ragas } = useDataContext();

  const dataWithEditDelete: ColumnTypeWithEditDelete[] | [] = ragas
    ? ragas?.map((item) => ({
        id: item.id,
        name: item.name,
        alternateSpelling: item.alternateSpelling,
        time: item.time,
        rasa: item.rasa,
        edit: <Update item={item} />,
        delete: <DeleteDialog dataType="raga" item={item} />,
      }))
    : [];

  const columns = ragas ? [...Object.keys(ragas[0]), 'Edit', 'Delete'] : [];

  return (
    <>
      <Create />
      <table
        style={{
          textOverflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
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
              <tr
                key={`row-${row.id}`}
                style={{
                  textOverflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                <TableCell key={`id-${row.id}`}>{row.id}</TableCell>
                <TableCell key={`name-${row.id}`}>{row.name}</TableCell>
                <TableCell key={`alternate-spelling-${row.id}`}>
                  {row.alternateSpelling}
                </TableCell>
                <TableCell key={`time-${row.id}`}>{row.time}</TableCell>
                <TableCell key={`rasa-${row.id}`}>{row.rasa}</TableCell>
                <TableCell key={`edit-${row.id}`}>{row.edit}</TableCell>
                <TableCell key={`delete-${row.id}`}>{row.delete}</TableCell>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
