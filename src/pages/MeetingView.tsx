import dayjs from 'dayjs';

import { VoteTable, VoteTableData } from '../components/VoteTable/VoteTable';

export function MeetingView() {
  const mockData: VoteTableData[] = [
    {
      date: dayjs('2022-11-26T01:44:39.114Z'),
      votings: [
        { total: 8, current: 8, checked: false, focused: false },
        { total: 8, current: 3, checked: true, focused: false },
      ],
    },
    {
      date: dayjs('2022-11-26T01:44:39.114Z'),
      votings: [
        { total: 8, current: 5, checked: true, focused: false },
        { total: 8, current: 3, checked: false, focused: false },
      ],
    },
  ];

  const mockData2: VoteTableData[] = [
    {
      date: dayjs('2022-11-26T01:44:39.114Z'),
      votings: [{ total: 8, current: 8, checked: false, focused: false }],
    },
    {
      date: dayjs('2022-11-26T01:44:39.114Z'),
      votings: [{ total: 8, current: 5, checked: true, focused: false }],
    },
  ];

  return (
    <div>
      <VoteTable data={mockData} headers={['점심', '저녁']} />
      <VoteTable data={mockData2} headers={['투표 현황']} />
    </div>
  );
}
