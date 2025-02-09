export type TimeWindows = 'oneWeek' | 'twoWeeks' | 'oneMonth' | 'threeMonths';

type TimeWindowsObj = {
  [K in TimeWindows]: string;
};

type TimeWindowsOptionsObj = {
  label: TimeWindows;
  value: string;
};

export function getTimeWindows() {
  const currentDate = new Date();
  const oneWeekAgo = currentDate.setDate(currentDate.getDate() - 7);
  const oneWeekAgoIso = new Date(oneWeekAgo).toISOString();

  const twoWeeksAgo = currentDate.setDate(currentDate.getDate() - 14);
  const twoWeeksAgoIso = new Date(twoWeeksAgo).toISOString();

  const oneMonthAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    currentDate.getDate(),
  );
  const oneMonthAgoIso = new Date(oneMonthAgo).toISOString();

  const threeMonthsAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 3,
    currentDate.getDate(),
  );

  const threeMonthsAgoIso = new Date(threeMonthsAgo).toISOString();

  const timeWindows: TimeWindowsObj = {
    oneWeek: oneWeekAgoIso,
    twoWeeks: twoWeeksAgoIso,
    oneMonth: oneMonthAgoIso,
    threeMonths: threeMonthsAgoIso,
  };
  const timeWindowsOptions: TimeWindowsOptionsObj[] = [
    { label: 'oneWeek', value: '0' },
    {
      label: 'twoWeeks',
      value: '1',
    },
    {
      label: 'oneMonth',
      value: '2',
    },
    {
      label: 'threeMonths',
      value: '3',
    },
  ];

  return { timeWindowsOptions, timeWindows };
}
