import { Dayjs } from 'dayjs';
import * as React from 'react';

import { Calender } from '../../components/Calendar';

interface Props {
  dates: Dayjs[];
  handleSelectDates: (dates: Dayjs[]) => void;
}

export function SelectDates(props: Props) {
  const { dates, handleSelectDates } = props;

  const dayOnClick = (newDate: Dayjs, selected: boolean) => {
    if (selected) {
      handleSelectDates(dates.filter((date) => !date.isSame(newDate, 'day')));
    } else {
      handleSelectDates(dates.concat(newDate));
    }
  };

  return <Calender dayOnClick={dayOnClick} dates={dates}></Calender>;
}
