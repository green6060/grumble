import React, { Component } from 'react'
import { TextField, MenuItem, Button } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setBusinessRefId } from '../../actions'

class BusinessSelect extends Component {
  render () {
    const { classes, businesses, businessRefId, business } = this.props
    const currentBusiness = business || businesses.filter(business => business.refId === businessRefId)[0]

    return (
      <Button className={classes.sideBarSelect} color='default' variant='contained' fullWidth>
        <div className={classes.businessImage} >
          <img src='http://1000logos.net/wp-content/uploads/2016/10/ACME-logo.png' alt='' />
        </div>

        {business ? currentBusiness.name : 'Loading...'}

        <TextField
          select
          value={businessRefId}
          onChange={event => this.setBusiness(event)}
          className={classes.businessSelect}>
          {businesses && businesses.map(biz => biz._id !== businessRefId &&
            <MenuItem value={biz._id} key={biz._id}>
              {biz.name}
            </MenuItem>
          )}

          <MenuItem>
            <Search /> Search Business
          </MenuItem>
        </TextField>
      </Button>
    )
  }

  setBusiness = (event) => {
    this.props.setBusinessRefId(event.target.value)
    window.location.reload()
  }
}

const mapStateToProps = state => {
  return {
    businessRefId: state.businessReducer.businessRefId
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setBusinessRefId }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessSelect)
