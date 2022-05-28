import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#960000',
    },
    secondary: {
      main: '#eec204',
    },
    background: {
      default: '#0e0d14',
    },
    text: {
      primary: '#fbf5f3',
    },
  },
});

export { theme };
