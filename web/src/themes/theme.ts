import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
        main: '#556cd6',
    },
    secondary: {
        main: '#19857b',
    },
    error: {
        main: '#ff4444',
    },
    background: {
        default: '#f4f5fd',
    },
  },
  typography: {
    fontFamily: [
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
    button: {
        textTransform: 'none',
    },
  },
});
