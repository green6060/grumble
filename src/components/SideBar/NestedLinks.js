import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import classNames from 'classnames'
import Cookies from 'js-cookie'

import history from '../../helpers/history'

class NestedLinks extends Component {
  // ===== Im using cookies so that if there is a refresh the nested links they have open continue to stayh open ===== \\
  constructor (props) {
    super(props)
    const storageItem = Cookies.get(props.link.text)

    this.state = {
      listOpen: storageItem && true
    }
  }

  render () {
    const { classes, businessRefId, link: { icon, href, text, subLinks } } = this.props

    return (
      <Fragment>
        <ListItem
          className={classNames(history.location.pathname.includes(href) && classes.selectedLink, classes.sideBarLink)}
          onClick={() => this.toggleList(href)}
          button>
          <ListItemIcon className={classes.linkIcon}>
            {icon}
          </ListItemIcon>
          <ListItemText className={classes.noPadding} primary={text} />
          {this.state.listOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={this.state.listOpen} timeout='auto' unmountOnExit>
          <List
            className={classes.nestedLinksContainer}
            component='div'
            disablePadding>
            {subLinks.map((subLink, key) => {
              return (
                <Link
                  to={{
                    pathname: subLink.href,
                    search: `?business=${businessRefId}`
                  }}
                  key={key}>
                  <ListItem
                    button
                    className={classNames(history.location.pathname.includes(subLink.href) && classes.selectedLink, classes.nestedLink)}>
                    {subLink.icon
                      ? <ListItemIcon className={classes.linkIcon}>
                        {subLink.icon}
                      </ListItemIcon>
                      : <Typography
                        align='center'
                        variant='subheading'
                        className={classes.linkIcon}>
                        {subLink.text.split(' ').map(text => text.split('')[0]).join('')}
                      </Typography>
                    }

                    <ListItemText className={classes.noPadding} primary={subLink.text} />
                  </ListItem>
                </Link>
              )
            })}
          </List>
        </Collapse>
      </Fragment>
    )
  }

  // ===== Im using cookies so that if there is a refresh the nested links they have open continue to stayh open ===== \\
  toggleList = href => {
    const listOpen = this.state.listOpen
    const cookieName = this.props.link.text
    const refId = this.props.businessRefId
    const subLinks = this.props.link.subLinks.map(sublink => sublink.href)
    const pathname = history.location.pathname

    listOpen ? Cookies.remove(cookieName) : Cookies.set(cookieName, !listOpen)

    if (((pathname !== href && !listOpen) || subLinks.includes(pathname)) && href) {
      history.push(`${href}?business=${refId}`)
      Cookies.set(cookieName, true)
      this.setState({ listOpen: true })
    } else {
      this.setState({ listOpen: !listOpen })
    }
  }
}

const mapStateToProps = state => {
  return {
    sideBarOpen: state.sideBarReducer.sideBarOpen,
    businessRefId: state.businessReducer.businessRefId
  }
}

export default connect(mapStateToProps)(NestedLinks)
