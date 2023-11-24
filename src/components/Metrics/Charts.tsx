import { LineChart } from '../Charts/LineChart/LineChart';

export function Charts() {
  return (
    <div className="flex justify-around w-full mt-[64px]">
      <LineChart />
      <LineChart />
    </div>
  );
}
