import { TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useRef } from 'react';

interface Props {
  minDate: Dayjs;
  maxDate?: Dayjs;
  selectedDate?: Dayjs;
  onChange: (date: Dayjs) => void;
  format?: string;
}

const DEFAULT_FORMAT = 'YYYY-MM-DD';

export const DateInput: React.FC<Props> = (props: Props) => {
  const { minDate, maxDate, onChange, selectedDate, format = DEFAULT_FORMAT } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const inputValue = selectedDate ? selectedDate.format(format) : '';

  useEffect(() => {
    if (inputRef.current) {
      const inputElement = inputRef.current;

      inputElement.setAttribute('min', minDate.format(format));
      maxDate && inputElement.setAttribute('max', maxDate.format(format));
    }
  }, [minDate, maxDate, format]);

  return (
    <TextField
      inputRef={inputRef}
      type="date"
      hiddenLabel
      size="small"
      variant="outlined"
      fullWidth
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(dayjs(event.target.value));
      }}
      value={inputValue}
    />
  );
};
