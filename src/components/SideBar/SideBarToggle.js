import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons'
import classNames from 'classnames'

import { toggleSideBar } from '../../actions'
import styles from '../../styles/sideBarStyles'

const SideBarToggle = ({ classes, sideBarOpen, toggleSideBar }) => (
  <div
    onClick={() => toggleSideBar(!sideBarOpen)}
    className={classNames(sideBarOpen && classes.toggleSideBarOpen, classes.toggleSideBar)}>
    {sideBarOpen ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
  </div>
)

const mapStateToProps = state => {
  return { sideBarOpen: state.sideBarReducer.sideBarOpen }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    toggleSideBar
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SideBarToggle))
