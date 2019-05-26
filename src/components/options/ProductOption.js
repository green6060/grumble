import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, TextField, Button, Chip, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import classNames from 'classnames'

import { updateOptions } from '../../actions'

class ProductOption extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valueName: '',
      name: props.option.name,
      submit: true
    }
  }

  render () {
    const { valueName, name, submit } = this.state
    const { classes, option, small } = this.props

    return (
      <Grid className={classNames(classes.fullWidth, classes.paddingTop2)} container spacing={!small && 16}>
        <Grid item xs={10} md={small ? 10 : 6}>
          <form onSubmit={this.addOptionName}>
            <Grid container alignItems='flex-end' spacing={8}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  value={name}
                  onChange={this.handleInputChange('name')}
                  label='Option Name' />
              </Grid>

              <Grid item xs={4}>
                <Button
                  fullWidth
                  disabled={!submit}
                  type='submit'
                  variant='contained'
                  color='primary'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>

        <Grid item xs={12} md={small ? 12 : 4}>
          <form onSubmit={this.addOptionValue}>
            <Grid container alignItems='flex-end' spacing={8}>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  value={valueName}
                  onChange={this.handleInputChange('valueName')}
                  label='Option Values (hit enter)' />
              </Grid>

              <Grid item xs={2}>
                <Button
                  fullWidth
                  disabled={valueName === ''}
                  type='submit'
                  variant='contained'
                  color='primary'>
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>

        <Grid className={classes.firstOnSmallDown} style={small && { order: -1 }} item xs={2} container justify='center'>
          <IconButton onClick={this.deleteOption}>
            <Delete />
          </IconButton>
        </Grid>

        {option.values.map((value, index) => (
          <Chip
            className={classNames(classes.marginTopBottom2, classes.marginLeftRight1)}
            key={index}
            label={value}
            onDelete={() => this.deleteOptionValue(index)}
            color='primary' />
        ))}
      </Grid>
    )
  }

  componentDidUpdate (prevProps) {
    if (prevProps.option.name !== this.props.option.name) {
      this.setState({ name: this.props.option.name })
    }
  }

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
      submit: name === 'name' ? true : this.state.submit
    })
  }

  addOptionName = event => {
    event.preventDefault()
    const props = this.props
    const state = this.state
    props.updateOptions(props.index, state.name, 'updateName')
    this.setState({ submit: false })
  }

  addOptionValue = event => {
    event.preventDefault()
    const props = this.props
    const state = this.state
    props.updateOptions(props.index, state.valueName, 'addOptionValue')
    this.setState({ valueName: '' })
  }

  deleteOptionValue = index => {
    const props = this.props
    props.updateOptions(props.index, index, 'deleteOptionValue')
    this.forceUpdate()
  }

  deleteOption = () => {
    const props = this.props
    props.updateOptions(props.index, null, 'deleteOption')
    this.forceUpdate()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateOptions: (name, value, type) =>
      dispatch(updateOptions(name, value, type))
  }
}

export default connect(null, mapDispatchToProps)(ProductOption)
