import React from 'react'
import { Button } from '@material-ui/core'
import { KeyboardArrowLeft } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import styles from '../styles'

import history from '../helpers/history'

export default withStyles(styles)(({ classes }) => {
  return (
    <Button size='small' className={classes.noPaddingLeft} onClick={() => { history.goBack() }} color='primary'>
      <KeyboardArrowLeft />Back
    </Button>
  )
})
