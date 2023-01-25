import { ThemeOptions, createTheme } from '@mui/material/styles';

const PRIMARY_COLOR = '#66D6B4';
const SECONDARY_COLOR = '#d9d9d9';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
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
