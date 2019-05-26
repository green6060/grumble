import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import QuiversLogo from '../assets/images/Quivers_Large.png'
import { toggleMobileSideBar } from '../actions'
import sideBarStyles from '../styles/sideBarStyles'
import styles from '../styles'
import combineStyles from '../helpers/combineStyles'

const combinedStyles = combineStyles(styles, sideBarStyles)

const MobileMenu = ({ classes, toggleMobileSideBar }) => {
  return (
    <AppBar className={classes.mobileMenu} color='default' position='static'>
      <Toolbar>
        <IconButton onClick={() => toggleMobileSideBar(true)} color='inherit' aria-label='Menu'>
          <Menu />
        </IconButton>
        <div className={classes.width150}>
          <img className={classes.fullWidth} src={QuiversLogo} alt='Quivers Logo' />
        </div>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => {
  return {
    mobileSideBarOpen: state.sideBarReducer.mobileSideBarOpen
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ toggleMobileSideBar }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(MobileMenu))
