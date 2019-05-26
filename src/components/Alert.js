import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Snackbar, SnackbarContent, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

import { closeAlert } from '../actions'
import styles from '../styles'
import alertStyles from '../styles/alertStyles'
import combineStyles from '../helpers/combineStyles'

const combinedStyles = combineStyles(styles, alertStyles)

const Alert = ({ classes, alertOpen, alertMessage, alertType, closeAlert }) => {
  return (
    <Snackbar
      className={classNames(classes.fullWidth, classes.paddingLeftRight4)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={alertOpen}
      autoHideDuration={6000}
      onClose={closeAlert}>
      <SnackbarContent
        className={classNames(classes.fullWidth, alertType === 'Error' && classes.redBG, alertType === 'Success' && classes.greenBG)}
        message={<Typography className={classes.whiteText} align='center'>{alertMessage}</Typography>}
        action={<IconButton onClick={closeAlert} ><Close /></IconButton>} />
    </Snackbar>
  )
}

const mapStateToProps = state => {
  return {
    alertOpen: state.pageReducer.alertOpen,
    alertMessage: state.pageReducer.alertMessage,
    alertType: state.pageReducer.alertType
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    closeAlert
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(Alert))
