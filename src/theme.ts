import { createTheme, ThemeOptions } from '@mui/material/styles';

export const PRIMARY_COLOR = '#62d6b4';
export const SECONDARY_COLOR = '#d9d9d9';

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: [
      'nps',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: PRIMARY_COLOR,
      contrastText: '#fff',
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
    transPrimary: {
      main: 'rgba(102, 214, 180, 0.5)',
      contrastText: '#747474',
    },
  },
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: 'white',
            backgroundColor: PRIMARY_COLOR,
          },
          '&.Mui-selected:hover': {
            backgroundColor: PRIMARY_COLOR,
          },
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
