import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TablePagination,
  Card,
  Typography
} from '@material-ui/core'

import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import tableStyles from '../../styles/tableStyles'
import styles from '../../styles'
import combineStyles from '../../helpers/combineStyles'
import { setEnhancedTableData, setNumberOfRows, setPageNumber } from '../../actions'

const combinedStyles = combineStyles(styles, tableStyles)

class EnhancedTable extends Component {
  state = {
    order: 'asc',
    orderBy: 0
  }

  render () {
    const { order, orderBy } = this.state
    const {
      classes,
      className,
      elevation,
      cardHeader,
      selectable,
      deleteSelected,
      title,
      rowCount,
      tableHeaders,
      selectAllFunc,
      selectedData,
      allSelected,
      pageNumber,
      numberOfRows,
      noToolbar,
      noPagination,
      search,
      toolbarButton,
      borderBottomToolbar,
      setLoading
    } = this.props

    return (
      <Card className={className} elevation={elevation}>
        {cardHeader && cardHeader()}

        {!noToolbar &&
          <EnhancedTableToolbar
            borderBottomToolbar={borderBottomToolbar}
            toolbarButton={toolbarButton}
            search={search}
            classes={classes}
            title={title}
            deleteSelected={deleteSelected}
            numSelected={selectedData.length} />
        }

        {(title && noToolbar) &&
          <Typography variant='h6' id='tableTitle'>
            {title}
          </Typography>
        }

        <div className={classes.tableContainer}>
          <Table aria-labelledby='tableTitle'>
            {tableHeaders &&
              <EnhancedTableHead
                classes={classes}
                tableHeaders={tableHeaders}
                selectable={selectable}
                numSelected={selectedData.length}
                allSelected={allSelected}
                order={order}
                orderBy={orderBy}
                onSelectAll={selectAllFunc}
                onRequestSort={this.onRequestSort}
                rowCount={rowCount} />
            }
            <TableBody>
              {this.props.children}
            </TableBody>
          </Table>
        </div>

        {!noPagination &&
          <TablePagination
            component='div'
            count={rowCount}
            rowsPerPage={numberOfRows}
            page={pageNumber}
            setLoading={setLoading}
            rowsPerPageOptions={[Math.ceil(rowCount / 2) > 5 && 5, Math.ceil(rowCount / 2) > 10 && 10, Math.ceil(rowCount / 2), rowCount]}
            onChangePage={this.onPageChange}
            onChangeRowsPerPage={this.onChangeRowsPerPage} />
        }
      </Card>
    )
  }

  onPageChange = (event, page) => {
    this.props.setPageNumber(page)
  }

  onChangeRowsPerPage = event => {
    this.props.setNumberOfRows(event.target.value)
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setEnhancedTableData,
    setNumberOfRows,
    setPageNumber
  }, dispatch)
}

const mapStateToProps = state => {
  return {
    selectedData: state.tableReducer.selectedData,
    pageNumber: state.tableReducer.pageNumber,
    numberOfRows: state.tableReducer.numberOfRows
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(EnhancedTable))
