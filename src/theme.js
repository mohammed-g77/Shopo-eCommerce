import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2b6b6b',
      light: '#3d8888',
      dark: '#1e4d4d',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffbb38',
      light: '#ffd166',
      dark: '#e6a52e',
      contrastText: '#1a1a1a',
    },
    error: {
      main: '#ef262c',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
      section: '#f6f6f6',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '0.875rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#3d8888',
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#e6a52e',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
        },
      },
    },
  },
});

export default theme;
