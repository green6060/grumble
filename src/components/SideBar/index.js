import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Drawer,
  Typography,
  Button,
  Popover,
  Grid,
  IconButton
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Close } from '@material-ui/icons'
import classNames from 'classnames'
import { bindActionCreators } from 'redux'
import Cookies from 'js-cookie'

import Notification from './Notification'
import sideBarStyles from '../../styles/sideBarStyles'
import styles from '../../styles'
import combineStyles from '../../helpers/combineStyles'
import history from '../../helpers/history'
import { logOutUser, toggleMobileSideBar } from '../../actions'
import QuiversLogo from '../../assets/images/Quivers_Large.png'
import NavLinks from './NavLinks'
import BusinessSelect from './BusinessSelect'

const combinedStyles = combineStyles(styles, sideBarStyles)

class SideBarNav extends Component {
  state = { anchorEl: null }

  render () {
    const {
      classes,
      mobileSideBarOpen,
      sideBarOpen,
      businessRefId,
      businesses,
      business,
      toggleMobileSideBar
    } = this.props
    const { anchorEl } = this.state
    const open = !!anchorEl

    return (
      <Drawer
        elevation={18}
        variant='permanent'
        classes={{
          paper: classNames(classes.sideBar, sideBarOpen && classes.sideBarOpen, mobileSideBarOpen && classes.mobileSideBarOpen)
        }}>
        <div>
          <div className={classes.toolbar}>
            <img className={classes.sideBarLogo} src={QuiversLogo} alt='Quivers Logo' />
            <Grid container className={classes.mobileSideBarClose} justify='flex-end'>
              <IconButton onClick={() => toggleMobileSideBar(false)}><Close /></IconButton>
            </Grid>
            <BusinessSelect
              classes={classes}
              businesses={businesses}
              business={business} />
          </div>

          <Notification sideBarOpen={sideBarOpen} classes={classes} />

          <NavLinks classes={classes} sideBarOpen={sideBarOpen} businessRefId={businessRefId} />
        </div>

        <div className={classNames(classes.sideBarBottom, !sideBarOpen && classes.sideBarBottomHidden, 'sideBarBottom')}>

          <Button onClick={this.openPopOver}>Gavyn Caldwell</Button>
          <Popover
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
            <Link to={`/user-profile?business=${businessRefId}`}>
              <Button fullWidth>Profile</Button>
            </Link>
            <Button fullWidth onClick={this.logOut}>Logout</Button>
          </Popover>

          <Typography className={classes.fullWidth} variant='body1' align='center'>
              &copy; Quivers, Inc.
          </Typography>

          <Button href='https://www.quivers.com/msa' target='_blank' color='primary' fullWidth>
            Terms
          </Button>
        </div>
      </Drawer>
    )
  }

  openPopOver = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  closePopOver = () => {
    this.setState({ anchorEl: null })
  }

  logOut = () => {
    window.quivers.unauth((err, res) => {
      console.log(err, res)
      history.push('/login')
    })

    Cookies.remove('Retailers')
    Cookies.remove('Selling')
    Cookies.remove('Logistics')
    Cookies.remove('user')
  }
}

const mapStateToProps = state => {
  return {
    mobileSideBarOpen: state.sideBarReducer.mobileSideBarOpen,
    sideBarOpen: state.sideBarReducer.sideBarOpen,
    user: state.userReducer.user,
    businessRefId: state.businessReducer.businessRefId,
    businesses: state.businessReducer.businesses,
    business: state.businessReducer.business
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    toggleMobileSideBar,
    logOutUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(SideBarNav))
