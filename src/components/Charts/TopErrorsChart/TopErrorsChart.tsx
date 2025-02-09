import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  // ResponsiveContainer, // setting dimensions was not clear. check docs to see what's up and understand potential benefits of this component
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { TDateISO } from '../../../types';
import { Select } from '../../Select/Select';
import { getTimeWindows } from './getTimeWindows';

// import { getErrorMessage } from "util/getErrorMessage";

const key = import.meta.env.VITE_API_KEY;

export interface TError {
  errorCode?: number;
  errorMessage: string;
  isRegisteredUser: boolean;
  userId?: number;
  userEmailAddress?: string;
  userName?: string;
  timestamp: TDateISO;
}

interface ErrorCount {
  [key: string]: number;
}
interface PreppedErrorCount {
  name: string;
  count: number;
}

export function TopErrorsChart() {
  const { timeWindows, timeWindowsOptions } = getTimeWindows();
  const [errors, setErrors] = useState<TError[] | null>([]);
  const [sortedErrors, setSortedErrors] = useState<{ [key: string]: TError[] } | null>(
    null,
  );
  const [topErrors, setTopErrors] = useState<PreppedErrorCount[] | null>([]);
  const [timeWindowValue, setTimeWindowValue] = useState<number>(0);

  const numTopErrors = 3;
  useEffect(() => {
    async function getErrors() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_ORIGIN}/api/v1/network-error/${key}`,
        );
        setErrors(res.data);
      } catch (error) {
        console.log('Failed to log network error.');
        console.log(error);
        // const errorObj = getErrorMessage(error);
      }
    }
    getErrors();
  }, []);

  useEffect(() => {
    const processedErrors: { [key: string]: TError[] } = {};

    if (errors) {
      errors.forEach((error: TError) => {
        if (!processedErrors[error.errorMessage]) {
          processedErrors[error.errorMessage] = [error];
        } else {
          processedErrors[error.errorMessage].push(error);
        }
      });
    }
    setSortedErrors(processedErrors);
  }, [errors]);

  function sortByValue(
    array: {
      [key: string]: number;
    }[],
  ) {
    return array.sort(function (a, b) {
      const valueA = Object.values(a)[0];
      const valueB = Object.values(b)[0];
      const x = valueA;
      const y = valueB;
      return x > y ? -1 : x < y ? 1 : 0;
    });
  }

  useEffect(() => {
    if (sortedErrors) {
      // const errorCount: { name: string; count: number }[] = [];
      const errorCountObj: ErrorCount = {};
      const errorKeys = Object.keys(sortedErrors);
      errorKeys.forEach((errorKey) => {
        sortedErrors[errorKey].forEach((error) => {
          const errorDate = error.timestamp;
          const window = timeWindowsOptions[timeWindowValue].label;
          const timeWindowIso = timeWindows[window];
          if (errorDate >= timeWindowIso && !errorCountObj[errorKey]) {
            errorCountObj[errorKey] = 1;
          } else {
            errorCountObj[errorKey] = errorCountObj[errorKey] + 1;
          }
        });
      });
      const keys = Object.keys(errorCountObj);
      const arr = keys.map((key) => {
        const obj = { [key]: errorCountObj[key] };
        return obj;
      });
      const sortedObj = sortByValue(arr);
      const top = sortedObj.splice(0, numTopErrors);
      const preppedTop = top.map((error) => {
        const name = Object.keys(error)[0];
        const count = Object.values(error)[0];
        const obj = { name, count };
        return obj;
      });
      setTopErrors(preppedTop);
    }
  }, [sortedErrors, timeWindowValue]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Top {numTopErrors} Errors</h2>
      <Select
        options={timeWindowsOptions}
        placeholder="Select Time Window"
        defaultValue="0"
        onValueChange={(value) => {
          setTimeWindowValue(parseInt(value));
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        {topErrors && topErrors.length > 0 && (
          // <ResponsiveContainer width="500" height="500">
          <BarChart
            width={500}
            height={300}
            data={topErrors}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              content={(props) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: 'black',
                      padding: '16px',
                      borderRadius: 8,
                    }}
                  >
                    <span>Message: {props.label}</span>
                    <span>Count: {props.payload?.[0]?.value}</span>
                  </div>
                );
              }}
            />
            <Legend />
            <Bar
              dataKey="count"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
          // </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
