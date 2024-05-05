import {
  CartesianGrid,
  Line,
  LineChart as ReChartsLineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 500, pv: 1800, amt: 1800 },
  { name: 'Page C', uv: 200, pv: 1300, amt: 1300 },
  { name: 'Page D', uv: 100, pv: 1200, amt: 1200 },
  { name: 'Page E', uv: 600, pv: 1000, amt: 1000 },
];

// const errorData = [{ code: '404', message: 'Page noot found' }];

export function LineChart() {
  // console.log('line chart');
  return (
    // <div>Charts coming soon</div>
    <ReChartsLineChart width={400} height={400} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </ReChartsLineChart>
  );
}
