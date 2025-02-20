import { useDataContext } from '../../contexts/DataContext';
import { DeleteDialog } from '../Dialog';
import { Create, Update } from '../Forms/User';
import { TableCell, TableWrapper } from './common';

export interface ColumnTypeWithEditDelete {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  subscriptionActive: boolean;
  stripeId: string;
  isAdmin: boolean;
  edit: JSX.Element;
  delete: JSX.Element;
}

export function UserTable() {
  const { users } = useDataContext();

  const dataWithEditDelete: ColumnTypeWithEditDelete[] | [] = users
    ? users?.map((item) => ({
        id: item.id,
        email: item.email,
        firstName: item.firstName,
        lastName: item.lastName,
        subscriptionActive: item.subscriptionActive,
        stripeId: item.stripeId,
        isAdmin: item.isAdmin,
        edit: <Update item={item} />,
        delete: <DeleteDialog dataType="user" item={item} />,
      }))
    : [];

  const columns = users ? [...Object.keys(users[0]), 'Edit', 'Delete'] : [];

  return (
    <TableWrapper>
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
              <tr className="border" key={`row-${row.id}`}>
                <TableCell key={`id-${row.id}`}>{row.id}</TableCell>
                <TableCell key={`name-${row.id}`}>{row.email}</TableCell>
                <TableCell key={`name-${row.id}`}>{row.firstName}</TableCell>
                <TableCell key={`name-${row.id}`}>{row.lastName}</TableCell>
                <TableCell key={`name-${row.id}`}>{row.subscriptionActive}</TableCell>
                <TableCell key={`name-${row.id}`}>{row.stripeId}</TableCell>
                <TableCell key={`name-${row.id}`}>{row.isAdmin}</TableCell>
                <TableCell key={`edit-${row.id}`}>{row.edit}</TableCell>
                <TableCell key={`delete-${row.id}`}>{row.delete}</TableCell>
              </tr>
            ))}
        </tbody>
      </table>
    </TableWrapper>
  );
}
