import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      primary: {
        main: string;
      };
      secondary: {
        main: string;
      };
      transPrimary: {
        main: string;
        contrastText: string;
      };
    };
  }
}

declare module '@mui/material/styles' {
  interface CustomPalette {
    transPrimary: PaletteColorOptions;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Palette extends CustomPalette {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    transPrimary: true;
  }
}
