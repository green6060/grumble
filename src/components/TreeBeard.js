import React, { Component } from 'react'
import { Treebeard, decorators as Decorators } from 'react-treebeard'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Checkbox } from '@material-ui/core'

import data from '../../Products/components/data'
import * as filters from '../../Products/components/filter'
import theme from '../../../styles/treeBeardTheme'
import styles from '../../../styles'
import productStyles from '../../../styles/productStyles'
import tableStyles from '../../../styles/tableStyles'
import combineStyles from '../../../helpers/combineStyles'

const combinedStyles = combineStyles(styles, productStyles, tableStyles)
let folders = []
const checkStyle = { paddingTop: 0, paddingBottom: 0 }

const decorators = { ...Decorators }

decorators.Header = ({ style, node }) => {
  return (
    <div style={style.base}>
      <div style={style.title}>
        <Checkbox style={checkStyle} color='default' />
        {node.name}
      </div>
    </div>
  )
}

class Products extends Component {
  state = {
    filteredData: data,
    searchValue: '',
    allToggled: false,
    allFolders: []
  }

  render () {
    const { filteredData } = this.state

    return filteredData
      ? <Treebeard
        style={theme}
        data={filteredData}
        decorators={decorators}
        onToggle={this.onToggle} />

      : null
  }

  componentDidMount () {
    folders = []
    this.returnAllFolders(data)
  }

  returnAllFolders = data => {
    data.forEach(item => {
      if (item.children) {
        this.returnAllFolders(item.children)
        folders.push(item)
      }
    })

    this.setState({ allFolders: folders })
  }

  toggleAll = () => {
    const state = this.state
    const data = filters.toggleAll(state.filteredData, !state.allToggled)
    this.setState({ filteredData: data, allToggled: !state.allToggled })
  }

  onToggle = (node, toggled) => {
    const { cursor } = this.state
    node.active = true
    if (cursor) { cursor.active = false }
    if (node.children) { node.toggled = toggled }
    this.setState({ cursor: node })
  }

  handleRootClick = () => {
    const state = this.state
    const data = filters.deselectAll(filters.toggleAll(state.filteredData, false))
    this.setState({ filteredData: data, allToggled: false, cursor: null })
  }
}

const mapStateToProps = state => {
  return {
    options: state.productsReducer.options,
    businessRefId: state.businessReducer.businessRefId
  }
}

export default connect(mapStateToProps)(withStyles(combinedStyles)(Products))
