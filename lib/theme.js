import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#0e0d14',
    },
    secondary: {
      main: '#960000',
    },
    tertiary: {
      main: '#F9F9F9',
      side: '#CCCCCC',
    },
    background: {
      default: '#0e0d14',
    },
    text: {
      primary: '#0e0d14',
    },
  },
});

export { theme };
