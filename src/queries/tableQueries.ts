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

interface PostDataBase {
  name: string;
}

interface PostData extends PostDataBase {}
interface EditData extends PostDataBase {
  id: number;
}

export async function createDataType(dataType: DataTypes | undefined, data: PostData) {
  // const currentJwt = isValidJwt();
  if (dataType && data.name) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_ORIGIN}/api/v1/${dataType}/${apiKey}`,
      {
        ...data,
        // headers: { jwt: currentJwt?.jwt },
      },
    );
    console.log(response.data);
    return response.data;
  }
}

export async function editDataType(dataType: DataTypes | undefined, data: EditData) {
  // const currentJwt = isValidJwt();
  if (dataType && data.name && data.id) {
    const response = await axios.put(
      `${import.meta.env.VITE_API_ORIGIN}/api/v1/${dataType}/${apiKey}`,
      {
        ...data,
        // headers: { jwt: currentJwt?.jwt },
      },
    );
    console.log(response.data);
    return response.data;
  }
}

export async function deleteDataType(
  dataType: DataTypes | undefined,
  data: Omit<EditData, 'name'>,
) {
  const currentJwt = isValidJwt();
  if (dataType && data.id) {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_ORIGIN}/api/v1/${dataType}/${apiKey}`,
      {
        headers: { jwt: currentJwt?.jwt },
        data: { ...data },
      },
    );
    console.log(response.data);
    return response.data;
  }
}
