import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {
  ShoppingCart,
  ShoppingBasket,
  People,
  AttachMoney,
  StoreMallDirectory,
  ShowChart,
  Settings,
  HeadsetMic,
  Book,
  InsertChart,
  Inbox,
  Bookmark,
  EuroSymbol
} from '@material-ui/icons'
import classNames from 'classnames'

import history from '../../helpers/history'
import NestedLinks from './NestedLinks'

const links = [
  { icon: <ShoppingCart />, text: 'Orders', href: '/' },
  {
    icon: <Book />,
    text: 'Catalog',
    subLinks: [
      { icon: <ShoppingBasket />, text: 'Products', href: '/products' },
      { icon: <Inbox />, text: 'Collections', href: '/collections' },
      { icon: <Bookmark />, text: 'Global Options', href: '/global-options' }
    ]
  },
  { icon: <People />, text: 'Consumers', href: '/consumers' },
  {
    icon: <StoreMallDirectory />,
    text: 'Retailers',
    href: '/retailers',
    subLinks: [
      { text: 'Claiming Policies', href: '/claiming-policies' },
      { text: 'Claiming Territories', href: '/claiming-territories' },
      { text: 'Claiming Timers', href: '/claiming-timers' }
    ]
  },
  {
    icon: <AttachMoney />,
    text: 'Selling',
    subLinks: [
      { text: 'Marketplaces', href: '/marketplaces' },
      { text: 'Discounts', href: '/discounts' },
      { text: 'Shipping', href: '/shipping' }
    ]
  },
  {
    icon: <InsertChart />,
    text: 'Logistics',
    subLinks: [
      { text: 'Warehouses', href: '/warehouses' },
      { text: 'Retailer Inventory', href: '/retailer-inventory' }
    ]
  },
  { icon: <ShowChart />, text: 'Reports', href: '/reports' },
  { icon: <EuroSymbol />, text: 'Price Types', href: '/price-types' },
  { icon: <Settings />, text: 'Settings', href: '/settings' },
  { icon: <HeadsetMic />, text: 'Support', href: '/support' }
]

export default ({ classes, sideBarOpen, businessRefId }) => {
  return (
    <List component='nav' disablePadding>
      {links.map((link, key) => {
        if (link.subLinks) {
          return (
            <NestedLinks
              key={key}
              sideBarOpen={sideBarOpen}
              link={link}
              businessRefId={businessRefId}
              classes={classes} />
          )
        }

        return (
          <Link
            to={{
              pathname: link.href,
              search: `?business=${businessRefId}`
            }}
            key={key}>
            <ListItem
              button
              className={classNames(
                history.location.pathname === link.href && classes.selectedLink,
                link.notification && 'notification',
                classes.sideBarLink
              )}>
              <ListItemIcon className={classes.linkIcon}>
                {link.icon}
              </ListItemIcon>
              <ListItemText className={classes.noPadding} primary={link.text} />
            </ListItem>
          </Link>
        )
      })}
    </List>
  )
}
