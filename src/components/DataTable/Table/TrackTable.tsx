import { Input, Modal, Table as AntdTable } from 'antd';
import { useState } from 'react';
import { Track } from 'src/types';

import { useDataContext } from '../../../contexts/DataContext';
import { deleteDataType, editDataType } from '../../../queries/tableQueries';
import { prepareTracks } from '../../../util/prepareTracks';

interface BaseData {
  id: number;
  name?: string;
}

export interface Data extends BaseData {}

export function TrackTable() {
  const [promptDelete, setPromptDelete] = useState<number | null>(null);
  const [editTrackData, setEditTrackData] = useState<Partial<Track> | null>(null);

  const { tracks } = useDataContext();

  const preparedTracks = tracks ? prepareTracks(tracks) : [];

  const keys = preparedTracks ? Object.keys(preparedTracks[0]) : [];
  const newColumns = keys
    ? keys.map((k) => ({
        title: k,
        dataIndex: k,
        key: k,
      }))
    : [];
  const newRows = preparedTracks?.map((item) => ({
    key: item.id,
    ...item,
  }));

  const columns = [
    ...newColumns,
    {
      title: 'edit',
      key: 'edit',
      render: (_: unknown, record: Data) => (
        <button
          type="button"
          onClick={() => {
            const editTrack = tracks?.filter((track) => track.id === record.id)[0];
            // console.log(editTrack);
            editTrack && setEditTrackData({ ...editTrack });
          }}
        >
          Edit
        </button>
      ),
    },
    {
      title: 'delete',
      key: 'delete',
      render: (_: unknown, record: Data) => (
        <button type="button" onClick={() => setPromptDelete(record.id)}>
          Delete
        </button>
      ),
    },
  ];

  console.log(editTrackData);

  return (
    <>
      <AntdTable dataSource={newRows} columns={columns} />
      <Modal
        title="Delete Item"
        open={!!promptDelete}
        onOk={() => {
          promptDelete && deleteDataType('track', { id: promptDelete });
          setPromptDelete(null);
        }}
        onCancel={() => setPromptDelete(null)}
      >
        <p>Delete track with ID: {promptDelete}?</p>
        <p>Before deleting, please ensure that no existing records reference this ID.</p>
      </Modal>
      <Modal
        title="Edit Item"
        open={!!editTrackData}
        onOk={() => {
          editTrackData && editDataType('track', editTrackData);
          setEditTrackData(null);
        }}
        onCancel={() => setEditTrackData(null)}
      >
        {editTrackData &&
          Object.keys(editTrackData).map((key) => {
            return (
              <div key={key}>
                <div>{key}</div>
                <Input
                  placeholder={
                    editTrackData && editTrackData[key as keyof Track]
                      ? editTrackData[key as keyof Track]!.toString()
                      : ''
                  }
                  onChange={(event) =>
                    editTrackData &&
                    setEditTrackData((prev) => ({ ...prev, [key]: event.target.value }))
                  }
                />
              </div>
            );
          })}
      </Modal>
    </>
  );
}
