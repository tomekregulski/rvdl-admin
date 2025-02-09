import { useDataContext } from '../../contexts/DataContext';
import { CreateDialog, DeleteDialog, EditDialog } from '../Dialog';
import { ColumnTypeWithEditDelete, TableCell, TableWrapper } from './common';

export function CategoryTable() {
  const { categories } = useDataContext();

  const dataWithEditDelete: ColumnTypeWithEditDelete[] | [] = categories
    ? categories?.map((item) => ({
        id: item.id,
        name: item.name,
        edit: <EditDialog dataType="category" item={item} />,
        delete: <DeleteDialog dataType="category" item={item} />,
      }))
    : [];

  const columns = categories ? [...Object.keys(categories[0]), 'Edit', 'Delete'] : [];

  return (
    <TableWrapper>
      <CreateDialog dataType={'category'} />
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
