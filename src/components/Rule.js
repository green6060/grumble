import React, { Component } from 'react'
import { Grid, TextField, Divider, FormControl, InputLabel, Select } from '@material-ui/core'

export default class extends Component {
  state = {
    rule: null,
    definition: null,
    value: ''
  }
  render () {
    const { classes } = this.props
    const { rule, definition, value } = this.state

    return (
      <Grid container className={classes.paddingBottom1} spacing={8}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>rule</InputLabel>
            <Select fullWidth native variant='outlined' value={rule} onChange={this.onInputChange('rule')}>
              <option disabled selected value>--select an option--</option>
              <option value='tag'>Product Tag</option>
              <option value='name'>Product Name</option>
              <option value='price'>Product Price</option>
              <option value='stock'>Inventory Stock</option>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>definition</InputLabel>
            <Select fullWidth native variant='outlined' value={definition} onChange={this.onInputChange('definition')}>
              <option disabled selected value>--select an option--</option>
              <option value='equalto'>is equal to</option>
              <option value='notequalto'>is not equal to</option>
              <option value='greaterthan'>is greater than</option>
              <option value='lessthan'>is less than</option>
              <option value='startswith'>starts with</option>
              <option value='endswith'>ends with</option>
              <option value='contains'>contains</option>
              <option value='notcontains'>does not contain</option>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            value={value}
            onChange={this.onInputChange('value')}
            className={classes.paddingBottom2}
            variant='outlined'
            label='value' />
          <Divider />
        </Grid>
      </Grid>
    )
  }

  onInputChange = name => event => {
    this.setState({ [name]: event.target.value })
  }
}
