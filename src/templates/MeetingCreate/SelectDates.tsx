import * as React from 'react';
import { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';

type CustomPickerDayProps = PickersDayProps<Dayjs>;

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<CustomPickerDayProps>(({ theme, selected }) => {
  const style: React.CSSProperties = {
    borderRadius: 0,
    width: 28,
    height: 28,
    margin: 6,
  };

  const selectedStyle: React.CSSProperties = {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    ...style,
  };

  return {
    ...style,
    ...(selected && {
      ...selectedStyle,
      '&:hover, &:focus': {
        ...selectedStyle,
      },
    }),
  };
}) as React.ComponentType<CustomPickerDayProps>;

interface Props {
  dates: Dayjs[];
  onAddDate: (date: Dayjs) => void;
  onRemoveDate: (date: Dayjs) => void;
}

export function SelectDates(props: Props) {
  const { dates, onAddDate, onRemoveDate } = props;

  const dayOnClick = (newDate: Dayjs, selected: boolean) => {
    if (selected) {
      onRemoveDate(newDate);
    } else {
      onAddDate(newDate);
    }
  };

  const renderWeekPickerDay = (
    targetDate: Dayjs,
    _: Array<Dayjs | null>,
    pickersDayProps: PickersDayProps<Dayjs>,
  ) => {
    const selected = dates.some((date) => targetDate.isSame(date));

    return (
      <CustomPickersDay
        {...pickersDayProps}
        selected={selected}
        disableMargin
        onClick={() => dayOnClick(targetDate, selected)}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={dates}
        // onChange는 처음 클릭한 날짜에 대해 다시 클릭했을 때 이벤트가 발생하지 않으므로 사용하지 않음, PickersDay의 onClick으로 클릭 처리
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange={() => {}}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField {...params} />}
        disableHighlightToday={true}
        disablePast={true}
      />
    </LocalizationProvider>
  );
}
