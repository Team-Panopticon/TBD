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
    };
  }
}
