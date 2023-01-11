import { ThemeOptions, createTheme } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#66D6B4',
    },
    secondary: {
      main: '#d9d9d9',
    },
  },
};

export const theme = createTheme(themeOptions);
