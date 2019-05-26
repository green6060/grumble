import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

import styles from '../styles'
import bannerStyles from '../styles/bannerStyles'
import combineStyles from '../helpers/combineStyles'

const combinedStyles = combineStyles(styles, bannerStyles)

export default withStyles(combinedStyles)(class extends Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.bannerContainer}>
        <Grid container className={classes.bannerContent} alignItems='center' justify='center'>
          <Typography variant='h6'>
            WARNING! This website will now self destruct in 10 seconds
          </Typography>
        </Grid>
      </div>
    )
  }
})
