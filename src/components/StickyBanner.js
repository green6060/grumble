import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography, Button } from '@material-ui/core'

import styles from '../styles'
import bannerStyles from '../styles/bannerStyles'
import combineStyles from '../helpers/combineStyles'

const combinedStyles = combineStyles(styles, bannerStyles)

export default withStyles(combinedStyles)(class extends Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.stickyBannerContainer}>
        <Grid container className={classes.stickyBannerContent} alignItems='center' justify='space-between'>
          <Grid item xs={8}>
            <Typography variant='h6'>
            Unsaved Changes
            </Typography>
          </Grid>

          <Grid item xs={4} container justify='flex-end'>
            <Button variant='contained' color='default'>Cancel</Button>
            <Button variant='contained' color='primary'>Save</Button>
          </Grid>
        </Grid>
      </div>
    )
  }
})
