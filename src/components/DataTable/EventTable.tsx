import { Event } from '@types';

import { useDataContext } from '../../contexts/DataContext';
import { DeleteDialog } from '../Dialog';
import { Create, Update } from '../Forms/Event';
import { TableCell, TableWrapper } from './common';

interface ColumnTypeWithEditDelete
  extends Omit<Event, 'location' | 'category' | 'tapes'> {
  edit: JSX.Element;
  delete: JSX.Element;
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
        edit: <Update item={item} />,
        delete: <DeleteDialog dataType="event" item={item} />,
      }))
    : [];

  const columns = events ? [...Object.keys(events[0]), 'Edit', 'Delete'] : [];

  return (
    <TableWrapper>
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
                className="border"
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
    </TableWrapper>
  );
}
