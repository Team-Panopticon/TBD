import * as React from 'react';
import { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  isSelected: boolean;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<CustomPickerDayProps>(({ theme, isSelected }) => ({
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  }),
})) as React.ComponentType<CustomPickerDayProps>;

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
    selectedDates: Array<Dayjs | null>,
    pickersDayProps: PickersDayProps<Dayjs>,
  ) => {
    const isSelected = values.some((value) => value.isSame(date));

    return <CustomPickersDay {...pickersDayProps} isSelected={isSelected} disableMargin />;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        label="Week picker"
        value={values}
        onChange={onChange}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="'Week of' MMM d"
      />
    </LocalizationProvider>
  );
}
