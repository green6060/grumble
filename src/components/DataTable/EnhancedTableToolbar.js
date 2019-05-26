import React, { Component } from 'react'
import classNames from 'classnames'
import {
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  FormControl,
  Input,
  InputLabel,
  InputAdornment
} from '@material-ui/core'
import { Delete, FilterList, Search, Close, Send } from '@material-ui/icons'

export default class extends Component {
  state = {
    searchOpen: false,
    searchValue: ''
  }

  render () {
    const { numSelected, classes, title, search, deleteSelected, toolbarButton, borderBottomToolbar } = this.props
    return (
      <Toolbar className={classNames(classes.tableToolbar, borderBottomToolbar && classes.borderBottom)}>
        <div className={classes.tableToolbarTitle}>
          {numSelected > 0 ? (
            <Typography color='inherit' variant='subheading'>
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant='h6' id='tableTitle'>
              {title}
            </Typography>
          )}
        </div>
        {numSelected > 0 && deleteSelected ? (
          <div className={classes.tableToolbarActions}>
            <Tooltip title='Delete'>
              <IconButton onClick={deleteSelected()} aria-label='Delete'>
                <Delete />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <div className={classes.tableToolbarActions}>
            <Tooltip title={this.state.searchOpen ? 'Clear Search' : 'Search'}>
              <IconButton onClick={this.toggleSearch} aria-label='Search'>
                {this.state.searchOpen ? <Close /> : <Search />}
              </IconButton>
            </Tooltip>

            <FormControl
              className={classNames(classes.tableToolbarSearch, this.state.searchOpen && classes.tableToolbarSearchOpen)}>
              <form onSubmit={event => search(this.state.searchValue, event)}>
                <InputLabel htmlFor='table-search-input'>Search</InputLabel>
                <Input
                  onChange={this.setSearch}
                  value={this.state.searchValue}
                  id='table-search-input'
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton type='submit'>
                        <Send />
                      </IconButton>
                    </InputAdornment>
                  } />
              </form>
            </FormControl>

            <Tooltip title='Filter list'>
              <IconButton aria-label='Filter list'>
                <FilterList />
              </IconButton>
            </Tooltip>

            {toolbarButton}
          </div>
        )}
      </Toolbar>
    )
  }

  setSearch = event => {
    this.setState({ searchValue: event.target.value })
  }

  toggleSearch = event => {
    this.setState({ searchOpen: !this.state.searchOpen })
    if (this.state.searchOpen) {
      document.getElementById('table-search-input').blur()
      this.props.search('', event)
      this.setState({ searchValue: '' })
    } else document.getElementById('table-search-input').focus()
  }
}
