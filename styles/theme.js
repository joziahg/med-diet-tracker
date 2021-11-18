import { createTheme, responsiveFontSizes } from '@mui/material/styles'

let theme = createTheme({
  typography: {
    h1: {
      fontFamily: '"Libre Baskerville", "Roboto", "Helvetica", "Arial", serif',
      fontWeight: 300,
      fontSize: '6rem',
      lineHeight: 1.167,
      letterSpacing: '-0.01562em'
    },
    h2: {
      fontFamily: '"Libre Baskerville", "Roboto", "Helvetica", "Arial", serif',
      fontWeight: 300,
      fontSize: '3.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em'
    },
    h3: {
      fontFamily: '"Libre Baskerville", "Roboto", "Helvetica", "Arial", serif',
      fontWeight: 400,
      fontSize: '3rem',
      lineHeight: 1.167,
      letterSpacing: '0em'
    },
    h4: {
      fontFamily: '"Libre Baskerville", "Roboto", "Helvetica", "Arial", serif',
      fontWeight: 400,
      fontSize: '2.125rem',
      lineHeight: 1.235,
      letterSpacing: '0.00735em'
    },
    h5: {
      fontFamily: '"Libre Baskerville", "Roboto", "Helvetica", "Arial", serif',
      fontWeight: 400,
      fontSize: '1.5rem',
      lineHeight: 1.334,
      letterSpacing: '0em'
    },
    h6: {
      fontFamily: '"Libre Baskerville", "Roboto", "Helvetica", "Arial", serif',
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.6,
      letterSpacing: '0.0075em'
    }
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#009688'
    },
    secondary: {
      main: '#ffc400'
    },
    background: {
      paper: '#424242',
      default: '#212121',
      level2: '#333',
      level1: '#212121'
    }
  }
})

theme = responsiveFontSizes(theme)

export default theme
