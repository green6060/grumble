import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Popover, ListItem, Badge } from '@material-ui/core'
import { Notifications } from '@material-ui/icons'

export default class extends Component {
  state = { anchorEl: null }

  render () {
    const { classes } = this.props
    const { anchorEl } = this.state
    const open = !!anchorEl

    return (
      <Grid container className={classes.cursorPointer} justify='center'>
        <Button color='secondary' onClick={this.openPopOver} fullWidth>
          <Badge badgeContent={12} color='error'>
            <Notifications />
          </Badge>
        </Button>
        <Popover
          id='simple-popper'
          open={open}
          anchorEl={anchorEl}
          onClose={this.closePopOver}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}>
          <ListItem type='button'>
            <Link to='/'>Orders ready to ship: 12</Link>
          </ListItem>
          <ListItem type='button'>
            <Link to='/retailers'>Connection Requests: 108</Link>
          </ListItem>
        </Popover>
      </Grid>
    )
  }

  openPopOver = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  closePopOver = () => {
    this.setState({ anchorEl: null })
  }
}
