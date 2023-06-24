import { PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomPalette {
    transPrimary: Omit<PaletteColor, 'light' | 'dark'>;
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
