
import { createMuiTheme } from '@material-ui/core/styles'
import colors from '../variables/colors'

export default createMuiTheme({
  palette: {
    primary: {
      main: colors.primaryMain,
      contrastText: '#fff'
    },
    secondary: {
      main: colors.secondaryMain,
      light: colors.secondaryLight,
      light1: colors.secondaryLight1,
      light2: colors.secondaryLight2,
      dark: colors.secondaryDark,
      dark1: colors.secondaryDark1,
      dark2: colors.secondaryDark2,
      dark3: colors.secondaryDark3
    },

    error: {
      main: colors.red,
      light: colors.redLight,
      dark: colors.redDark
    },

    green: {
      main: colors.green,
      light: colors.greenLight,
      dark: colors.greenDark
    }
  },

  shape: {
    borderRadius: 6
  },

  spacing: 8,

  typography: {
    fontSize: 12,
    useNextVariants: true
  }
})
