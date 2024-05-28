import { getDataType } from '../queries/tableQueries';

export async function getAllData() {
  const locations = await getDataType('location');
  const ragas = await getDataType('raga');
  const tapes = await getDataType('tape');
  const events = await getDataType('event');
  const artists = await getDataType('artist');
  const mediaTypes = await getDataType('media-type');
  const tracks = await getDataType('track');
  const categories = await getDataType('category');

  const allData = {
    artists,
    categories,
    locations,
    ragas,
    tapes,
    events,
    mediaTypes,
    tracks,
  };

  return allData;
}
