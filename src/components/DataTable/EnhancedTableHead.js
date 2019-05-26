import React, { Component } from 'react'
import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Tooltip,
  TableSortLabel,
  Typography
} from '@material-ui/core'
import classNames from 'classnames'

export default class extends Component {
  render () {
    const {
      onSelectAll,
      order,
      orderBy,
      numSelected,
      rowCount,
      tableHeaders,
      selectable,
      allSelected,
      classes
    } = this.props

    return (
      <TableHead>
        <TableRow>
          {selectable &&
            <TableCell padding='checkbox'>
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={(numSelected === rowCount) || allSelected}
                onChange={onSelectAll()} />
            </TableCell>
          }
          {tableHeaders.map((header, key) => {
            return header !== 'dataTableId' &&
              <TableCell
                className={header.center && classNames(classes.fontCenter)}
                padding={header.padding}
                numeric={header.numeric}
                key={key}
                sortDirection={orderBy === header ? order : false}>
                {!header.noOrder
                  ? <Tooltip
                    title='Sort'
                    placement='bottom-start'
                    enterDelay={200}>
                    <TableSortLabel
                      active={orderBy === header}
                      direction={order}
                      onClick={this.createSortHandler(header)}>
                      {header.value}
                    </TableSortLabel>

                  </Tooltip>
                  : <Typography variant='caption'>{header.value}</Typography>
                }
              </TableCell>
          }, this)}
        </TableRow>
      </TableHead>
    )
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }
}
