import { TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import React, { useEffect, useRef } from 'react';

interface Props {
  minDate: Dayjs;
  maxDate?: Dayjs;
  selectedDate: string;
  onChange: (date: string) => void;
  format?: string;
}

const DEFAULT_FORMAT = 'YYYY-MM-DD';

export const DateInput: React.FC<Props> = (props: Props) => {
  const { minDate, maxDate, onChange, selectedDate, format = DEFAULT_FORMAT } = props;
  const inputRef = useRef<HTMLInputElement>(null);

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
        onChange(event.target.value);
      }}
      value={selectedDate}
    />
  );
};
