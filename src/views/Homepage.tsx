import axios from 'axios';
import { useEffect, useState } from 'react';

import { DataTableContainer } from '../components/DataTable/Table/DataTableContainer';
import { MetricsContainer } from '../components/Metrics/MetricsContainer';

type Views = 'dataTable' | 'metrics';

const key = import.meta.env.VITE_API_KEY;

export function HomePage() {
  const [view, setView] = useState<Views>('dataTable');

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
    console.log(allCookies);
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

  const otherView = view === 'metrics' ? 'Data Table' : 'Metrics';

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        type="button"
        onClick={() => setView(view === 'metrics' ? 'dataTable' : 'metrics')}
      >
        {`View ${otherView}`}
      </button>
      {view === 'metrics' && <MetricsContainer />}
      {view === 'dataTable' && <DataTableContainer />}
    </div>
  );
}
