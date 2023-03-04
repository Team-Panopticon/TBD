import { createTheme, ThemeOptions } from '@mui/material/styles';

const PRIMARY_COLOR = '#66D6B4';
const SECONDARY_COLOR = '#d9d9d9';

const themeOptions: ThemeOptions = {
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
