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
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  };

  return {
    ...(selected && {
      ...style,
      '&:hover, &:focus': {
        ...style,
      },
    }),
  };
}) as React.ComponentType<CustomPickerDayProps>;

export function Calender() {
  const [values, setValues] = React.useState<Dayjs[]>([]);

  const onChange = (newValue: Dayjs | null) => {
    if (!newValue) {
      return;
    }
    setValues(() => values.concat(newValue));
  };

  const renderWeekPickerDay = (
    date: Dayjs,
    _: Array<Dayjs | null>,
    pickersDayProps: PickersDayProps<Dayjs>,
  ) => {
    const selected = values.some((value) => value.isSame(date));

    return <CustomPickersDay {...pickersDayProps} selected={selected} disableMargin />;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={values}
        onChange={onChange}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField {...params} />}
        disableHighlightToday={true}
      />
    </LocalizationProvider>
  );
}
