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
    background: {
      default: '#fbf5f3',
    },
    text: {
      primary: '#0e0d14',
    },
  },
});

export { theme };
