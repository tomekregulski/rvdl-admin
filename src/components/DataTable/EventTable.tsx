import { Event } from '@types';
import { ReactNode } from 'react';

import { useDataContext } from '../../contexts/DataContext';

const tableButtonStyles = { background: 'white ' };

interface TableCellProps {
  children: ReactNode;
  // cellKey: string;
}

function TableCell(props: TableCellProps) {
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
interface ColumnTypeWithEditDelete
  extends Omit<Event, 'location' | 'category' | 'tapes'> {
  edit: JSX.Element;
  delete: JSX.Element;
}

function handleEdit(id: number) {
  console.log(id);
}

function handleDelete(id: number) {
  console.log(id);
}

export function EventTable() {
  const { events } = useDataContext();

  const dataWithEditDelete: ColumnTypeWithEditDelete[] | [] = events
    ? events?.map((item) => ({
        id: item.id,
        eventName: item.eventName,
        date: item.date,
        locationId: item.locationId,
        categoryId: item.categoryId,
        notes: item.notes,
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

  const columns = events ? [...Object.keys(events[0]), 'Edit', 'Delete'] : [];

  return (
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
              <TableCell key={`event-name-${row.id}`}>{row.eventName}</TableCell>
              <TableCell key={`date-${row.id}`}>{row.date}</TableCell>
              <TableCell key={`location-id-${row.id}`}>{row.locationId}</TableCell>
              <TableCell key={`category-id-${row.id}`}>{row.categoryId}</TableCell>
              <TableCell key={`notes-${row.id}`}>{row.notes}</TableCell>
              <TableCell key={`edit-${row.id}`}>{row.edit}</TableCell>
              <TableCell key={`delete-${row.id}`}>{row.delete}</TableCell>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
