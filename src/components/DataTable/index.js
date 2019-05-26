import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Card,
  Checkbox,
  Typography
} from '@material-ui/core'

import history from '../../helpers/history'
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import tableStyles from '../../styles/tableStyles'
import styles from '../../styles'
import combineStyles from '../../helpers/combineStyles'

const combinedStyles = combineStyles(styles, tableStyles)

class EnhancedTable extends Component {
  state = {
    order: 'asc',
    orderBy: 0,
    selected: [],
    page: 0,
    rowsPerPage: 5
  }

  render () {
    const {
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      search,
      deleteSelected
    } = this.state

    const {
      classes,
      className,
      selectable,
      cardHeader,
      elevation,
      link,
      linkFromData,
      title,
      noPagination,
      noToolbar,
      allSelected,
      tableHeaders,
      data = [],
      totals
    } = this.props

    selectable && (link || linkFromData) && console.error('You cannot have both selectable and a link on your DataTable Component at the same time, please choose one')

    // creating a dataTableId value so that we can select and sort the data
    let count = 0
    const enhancedData = data.map(val => {
      count += 1
      return { ...val, dataTableId: count }
    })

    return (
      <Card className={className} elevation={elevation}>
        {cardHeader && cardHeader()}

        {!noToolbar &&
          <EnhancedTableToolbar
            search={search}
            classes={classes}
            title={title}
            deleteSelected={deleteSelected}
            numSelected={selected.length} />
        }

        {(title && noToolbar) &&
          <div className={classes.tableTitle}>
            <Typography variant='h6' id='tableTitle'>
              {title}
            </Typography>
          </div>
        }

        <div className={classes.tableContainer}>
          <Table aria-labelledby='tableTitle'>
            { tableHeaders &&
              <EnhancedTableHead
                classes={classes}
                tableHeaders={tableHeaders}
                allSelected={allSelected}
                selectable={selectable}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAll={this.onSelectAll}
                onRequestSort={this.onRequestSort}
                rowCount={data.length} />
            }

            <TableBody>
              {enhancedData
                .sort(this.getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((obj, key) => {
                  const isSelected = this.isSelected(obj.dataTableId)
                  const keys = Object.keys(obj)
                  return (
                    <TableRow
                      hover
                      className={classes.alternatingTable}
                      role='checkbox'
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={key}
                      onClick={() => linkFromData ? this.onLinkPage(obj[linkFromData]) : (link && this.onLinkPage(link))}
                      selected={isSelected}>

                      {selectable &&
                        <TableCell
                          onClick={event => this.onSelect(event, obj.dataTableId)}
                          padding='checkbox'>
                          <Checkbox checked={isSelected} />
                        </TableCell>
                      }

                      {keys.map((val, key) => {
                        // ===  MAKING SURE THAT IT DOESNT DISPLAY dataTableId VALUE WHICH IS A VALUE I CREATE SO THAT WE CAN SELECT THE VALUES WITH THE CHECKBOX === \\
                        return val !== 'dataTableId' &&
                          <TableCell key={key} numeric={typeof obj[val] === 'number'}>
                            {obj[val]}
                          </TableCell>
                      })}
                    </TableRow>
                  )
                })}

              {totals &&
                <TableRow className={classes.alternatingTable}>
                  {selectable && <TableCell />}
                  {totals.map(total =>
                    <TableCell numeric={typeof total === 'number'}>
                      {total}
                    </TableCell>
                  )}
                </TableRow>
              }
            </TableBody>
          </Table>
        </div>

        {!noPagination &&
          <TablePagination
            component='div'
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.onPageChange}
            onChangeRowsPerPage={this.onChangeRowsPerPage} />
        }
      </Card>
    )
  }

  onLinkPage = href => {
    history.push(
      this.props.initialRoute
        ? `${this.props.initialRoute}/${href}`
        : `/${href}`
    )
  }

  getSorting = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)
  }

  onRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  }

  onSelectAll = (event, checked) => {
    const data = this.props.data
    if (checked) {
      this.setState({ selected: data.map(val => data.indexOf(val) + 1) })
      return
    }
    this.setState({ selected: [] })
  }

  onSelect = (event, id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    this.setState({ selected: newSelected })
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1

  onPageChange = (event, page) => {
    this.setState({ page })
  }

  onChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }
}

export default withStyles(combinedStyles)(EnhancedTable)
