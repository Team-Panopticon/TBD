import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';

import {
  CalanderContent,
  CalanderDay,
  CalanderDayBtn,
  CalanderWeek,
  CalenderWrapper,
} from './styled';

const RenderDays = () => {
  const days = [];
  const date = ['일', '월', '화', '수', '목', '금', '토'];

  for (let i = 0; i < 7; i++) {
    days.push(
      <CalanderDay className="col" key={i}>
        <Typography color={i == 0 ? 'red' : 'black'}>{date[i]}</Typography>
      </CalanderDay>,
    );
  }

  return <CalanderWeek>{days}</CalanderWeek>;
};

const RenderCells = ({
  date,
  dayOnClick,
  dates,
}: {
  date: Dayjs;
  dayOnClick: (date: Dayjs, selected: boolean) => void;
  dates: Dayjs[];
}) => {
  const targetDate = dayjs(date);
  const monthStart = dayjs(targetDate).startOf('month');
  const monthEnd = dayjs(targetDate).endOf('month');
  const startDate = dayjs(monthStart).startOf('week');
  const endDate = dayjs(monthEnd).endOf('week');

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const memoDate = dayjs(day);
      formattedDate = day.format('D');
      // const fullDate = day.format('YYYY-MM-DD');
      const isSelected = dates.some((date) => date.isSame(memoDate, 'day'));

      days.push(
        <CalanderDay key={`${date.toString()},${i}`}>
          <CalanderDayBtn
            disabled={targetDate.get('month') !== dayjs(memoDate).get('month')}
            today={dayjs().isSame(memoDate, 'day')}
            onClick={() => {
              dayOnClick(memoDate, isSelected);
            }}
            isSelected={isSelected}
          >
            {formattedDate}
          </CalanderDayBtn>
        </CalanderDay>,
      );
      day = day.add(1, 'day');
    }
    rows.push(<CalanderWeek key={`row${dayjs(day).toString()}`}>{days}</CalanderWeek>);
    days = [];
  }
  return <>{rows}</>;
};
interface ICaledarProps {
  date?: Dayjs;
  dayOnClick: (date: Dayjs, selected: boolean) => void;
  dates: Dayjs[];
}

const ThisMonth = styled('div')({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  padding: '0 4px',
});
const CalanderHeader = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '16px',
});
const CalanderBody = styled('div')`
  display: flex;
  width: 100%;
  min-width: 100%;
`;
export const Calender = ({ date, dayOnClick, dates }: ICaledarProps) => {
  const [currentDate, setCurrentDate] = useState(date || dayjs());
  useEffect(() => {
    setCurrentDate(date || dayjs());
  }, [date]);
  const handleClickNextMonth = () => {
    setCurrentDate((prev) => dayjs(prev).add(1, 'month'));
  };
  const handleClickPrevMonth = () => {
    setCurrentDate((prev) => dayjs(prev).subtract(1, 'month'));
  };

  return (
    <CalenderWrapper>
      <CalanderHeader>
        <IconButton size="small" onClick={handleClickPrevMonth}>
          <ArrowBackIos fontSize="small" />
        </IconButton>
        <ThisMonth>{dayjs(currentDate).format('YYYY년 MM월')}</ThisMonth>

        <IconButton onClick={handleClickNextMonth}>
          <ArrowForwardIos fontSize="small" />
        </IconButton>
      </CalanderHeader>
      <>
        <RenderDays />
        <CalanderBody className="container">
          <CalanderContent className="month">
            <RenderCells date={currentDate} dayOnClick={dayOnClick} dates={dates} />
          </CalanderContent>
        </CalanderBody>
      </>
    </CalenderWrapper>
  );
};
