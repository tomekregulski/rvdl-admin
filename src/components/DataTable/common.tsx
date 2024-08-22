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

export function TableWrapper(props: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center">{props.children}</div>
  );
}

export function TableCell(props: TableCellProps) {
  const { children } = props;
  return (
    <td
      className="px-4"
      // className="max-w-[150px] overflow-hidden whitespace-nowrap text-red"
      style={{
        maxWidth: '250px',
        textOverflow: 'hidden',
        whiteSpace: 'nowrap',
        marginRight: '8px',
      }}
    >
      <span
        style={{
          maxWidth: '250px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          marginRight: '8px',
        }}
      >
        {children}
      </span>
    </td>
  );
}
