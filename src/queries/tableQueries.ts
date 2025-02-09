import axios from 'axios';

import type {
  DataTypes,
  ModelsCreateUnion,
  ModelsUpdateUnion,
} from '../../src/types/index';
import { getErrorMessage } from '../util/getErrorMessage';
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

  if (response?.status === 200 || response?.status === 201) {
    return response.data;
  } else {
    console.log('Response returned with non-200 status');
    console.log(response);
  }
}

export async function getDataType(dataType: DataTypes | undefined) {
  // const currentJwt = isValidJwt();
  // console.log(`${import.meta.env.VITE_API_ORIGIN}/api/v1/${dataType}/${apiKey}`);
  if (dataType) {
    const response = await axios.get(
      `${import.meta.env.VITE_API_ORIGIN}/api/v1/${dataType}/123456`,
      {
        // headers: { jwt: currentJwt?.jwt },
      },
    );
    // .catch(function (error) {
    //   console.log(error);
    //   const errorMessage = getErrorMessage(error);
    //   console.log(errorMessage);
    //   // return { type: 'error', message: errorMessage };
    // });

    // console.log(response);

    if (response?.status === 200 || response?.status === 201) {
      return response.data;
    } else {
      console.log('Response returned with non-200 status');
      console.log(response);
    }
  }
}

interface PostDataBase {
  name?: string;
}

// interface PostData extends PostDataBase {}
interface EditData extends PostDataBase {
  id: number;
}

type SuccessResponseType = {
  type: 'success';
  // message?: string;
};
type ErrorResponseType = {
  type: 'error';
  message: string;
};

type ResponseType = SuccessResponseType | ErrorResponseType;

export async function createDataType(
  dataType: DataTypes,
  data: ModelsCreateUnion,
): Promise<ResponseType> {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_ORIGIN}/api/v1/${dataType}/123456`,
      {
        ...data,
        // headers: { jwt: currentJwt?.jwt },
      },
    );
    if (response?.status === 200 || response?.status === 201) {
      const successObj: SuccessResponseType = { type: 'success' };
      return successObj;
    } else {
      console.log(response);
      const errorObj: ErrorResponseType = {
        type: 'error',
        // errorMessage: {
        //   errorMessage: 'Response returned with non-200 status',
        //   errorCode: undefined,
        // },
        message: 'Response returned with non-200 status',
      };
      return errorObj;
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return { type: 'error', message: errorMessage.errorMessage };
  }
}

export async function editDataType(
  dataType: DataTypes,
  data: ModelsUpdateUnion,
): Promise<ResponseType> {
  // const currentJwt = isValidJwt();
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_ORIGIN}/api/v1/${dataType}/${apiKey}`,
      {
        ...data,
        // headers: { jwt: currentJwt?.jwt },
      },
    );
    if (response?.status === 200 || response?.status === 201) {
      return { type: 'success' };
    } else {
      console.log(response);
      return { type: 'error', message: 'Response returned with non-200 status' };
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return { type: 'error', message: errorMessage.errorMessage };
  }
}

export async function deleteDataType(
  dataType: DataTypes,
  data: Omit<EditData, 'name'>,
): Promise<ResponseType> {
  // const currentJwt = isValidJwt();
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_ORIGIN}/api/v1/${dataType}/${apiKey}`,
      {
        // headers: { jwt: currentJwt?.jwt },
        data: { ...data },
      },
    );
    if (response?.status === 200 || response?.status === 201) {
      return { type: 'success' };
    } else {
      console.log(response);
      return { type: 'error', message: 'Response returned with non-200 status' };
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return { type: 'error', message: errorMessage.errorMessage };
  }
}
