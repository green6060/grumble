import React, { Component, Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Cookies from 'js-cookie'

import LoadingScreen from './LoadingScreen'
import MobileMenu from './MobileMenu'
import Alert from './Alert'
import SideBarNav from './SideBar'
import SideBarToggle from './SideBar/SideBarToggle'
import BulletinBanner from './BulletinBanner'
import styles from '../styles'
import { addBusinessToArray, setBusinessRefId, setCurrentBusiness, resetOptions } from '../actions'
import history from '../helpers/history'
import { getBusiness } from '../api/businesses'

const businessCookie = Cookies.get('selected-business')

const PrivateRoute = class extends Component {
  render () {
    const { component: Component, sideBarOpen, classes, user, businessRefId, ...rest } = this.props

    return (
      <Route
        {...rest}
        render={props => {
          // Checks to make sure the authentication cookie exists and is not 'null' otherwise youre sent to the login screen
          if (window.quivers.user) {
            if (businessRefId) {
              return (
                <Fragment>
                  <MobileMenu />
                  <BulletinBanner />
                  <div className={classNames(classes.pageWrapper, sideBarOpen ? classes.pageWrapperOpen : '')}>
                    <Alert />
                    <SideBarNav />
                    <SideBarToggle />
                    <Component {...props} />
                  </div>
                </Fragment>
              )
            }

            return <LoadingScreen />
          }

          return <Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />
        }}
      />
    )
  }

  componentDidMount () {
    if (window.quivers.user) {
      if (!this.props.businesses || this.props.businesses.length <= 0) {
        const roles = window.quivers.user.roles.filter(role => role.value)

        roles.forEach(role => {
          getBusiness(role.value)
            .then(res => {
              this.props.addBusinessToArray(res)
            })
        })
      }

      !history.location.search && this.setUrl()
    }

    this.props.resetOptions()
  }

  componentDidUpdate () {
    const props = this.props

    if (props.businesses && props.businesses.length > 0) {
      this.setRefId(this.props.businesses)
    }

    if (props.businessRefId && props.businessRefId !== undefined) {
      this.setUrl()
    }
  }

  setBusiness = refId => {
    getBusiness(refId)
      .then(res => {
        this.props.setCurrentBusiness(res)
      })
      .catch(err => {
        history.push('/no-business')
        console.log(err)
      })
  }

  setUrl = () => {
    // this sets the url search param refid
    const url = history.location.pathname
    const props = this.props
    if (!props.location.search || props.location.search !== `?business=${props.businessRefId}`) {
      history.replace({
        pathname: url,
        search: `?business=${props.businessRefId}`
      })
    }
  }

  setRefId = (businesses) => {
    const props = this.props
    const search = history.location.search
    const id = search.split('?business=').join('')

    // function that set's the selected business refId to both state and the cookie
    if (props.businessRefId) {
      props.setBusinessRefId(props.businessRefId)
    } else if (search && id !== 'undefined' && id !== props.businessRefId) {
      props.setBusinessRefId(id)
      this.setBusiness(id)
    } else if (!props.businessRefId && businessCookie) {
      props.setBusinessRefId(businessCookie)
      this.setBusiness(businessCookie)
    } else if (!props.bussinessRefId && !businessCookie && businesses) {
      props.setBusinessRefId(businesses[0]._id)
      Cookies.set('selected-business', businesses[0]._id)
      this.setBusiness(businesses[0]._id)
    } else {
      window.alert('There was an error grabbing your business. Reload, and if the error persists, please contact marissa')
    }
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addBusinessToArray,
    setBusinessRefId,
    setCurrentBusiness,
    resetOptions
  }, dispatch)
}
const mapStateToProps = state => {
  return {
    sideBarOpen: state.sideBarReducer.sideBarOpen,
    user: state.userReducer.user,
    business: state.businessReducer.business,
    businesses: state.businessReducer.businesses,
    businessRefId: state.businessReducer.businessRefId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PrivateRoute))
