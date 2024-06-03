import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#131312',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#131312',
      secondary: '#ffffff',
    },
    success: {
      main: '#36ba01',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b0b0b0 !important',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-input': {
            color: '#131312',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#131312',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#b0b0b0',
        },
      },
    },
  },
});
export default theme;
