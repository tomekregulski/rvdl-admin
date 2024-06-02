import { ReactNode } from 'react';

export interface ColumnTypeWithEditDelete {
  id: number;
  name: string;
  edit: JSX.Element;
  delete: JSX.Element;
}

export interface TableCellProps {
  children: ReactNode;
}

export function TableCell(props: TableCellProps) {
  const { children } = props;
  return (
    <td
      style={{
        maxWidth: '150px',
        textOverflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </td>
  );
}
