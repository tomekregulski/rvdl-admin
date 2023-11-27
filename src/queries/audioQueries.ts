import axios from 'axios';

import { DataTypes } from '../components/DataTable/Table/DataTableContainer';
import { isValidJwt } from '../util/isValidJwt';
const apiKey = import.meta.env.VITE_API_KEY;

export async function fetchTracks() {
  const currentJwt = isValidJwt();
  const response = await axios.get(
    `${import.meta.env.VITE_API_ORIGIN}/api/v1/track/${apiKey}`,
    {
      headers: { jwt: currentJwt?.jwt },
    },
  );
  console.log(response.data);
  return response.data;
}

export async function getDataType(dataType: DataTypes | undefined) {
  const currentJwt = isValidJwt();
  if (dataType) {
    const response = await axios.get(
      `${import.meta.env.VITE_API_ORIGIN}/api/v1/${dataType}/${apiKey}`,
      {
        headers: { jwt: currentJwt?.jwt },
      },
    );
    console.log(response.data);
    return response.data;
  }
}
