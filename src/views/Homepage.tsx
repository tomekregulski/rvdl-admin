import { Views } from '@types';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Banner } from '../components/Banner/Banner';
import { DataTableContainer } from '../components/DataTable/DataTableContainer';
import { MetricsContainer } from '../components/Metrics/MetricsContainer';

const key = import.meta.env.VITE_API_KEY;

export function HomePage() {
  const [view, setView] = useState<Views>('data');

  const otherView: Views = view === 'data' ? 'metrics' : 'data';

  useEffect(() => {
    async function getToken() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ORIGIN}/api/v1/auth/admin-token/${key}`,
        );
        const token = response.data.token;
        document.cookie = `roop-verma-library-admin=${token}`;
      } catch (error) {
        console.log('Failed to retrieve login token');
        console.log(error);
      }
    }

    const allCookies = document.cookie.split('; ');
    const jwtKey = 'roop-verma-library-admin';
    let jwtFound = false;
    for (let i = 0; i < allCookies.length; i++) {
      const currentCookie = allCookies[i].split('=');
      if (currentCookie[0] === jwtKey) {
        console.log('jwt found!');
        jwtFound = true;
      }
    }
    if (!jwtFound) {
      console.log('no jwt found, attempting to fetch from server');
      getToken();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Banner otherView={otherView} updateView={setView} />
      {view === 'metrics' && <MetricsContainer />}
      {view === 'data' && <DataTableContainer />}
    </div>
  );
}
