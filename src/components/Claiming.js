import React, { Component, Fragment } from 'react'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  InputLabel,
  Select,
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button
} from '@material-ui/core'
import classNames from 'classnames'
import { MuiPickersUtilsProvider } from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import TimePicker from 'material-ui-pickers/TimePicker'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'

import { DonutChart, HorizontalBarChart } from './Charts'

export default class extends Component {
  state = {
    leftoverTime: null,
    favoringTime: null,
    localRadius: null,
    radiusType: 'miles',
    localTime: null,
    during: 'wholeDay',
    startTime: null,
    endTime: null,
    territoryTime: null,
    restriction: 'noRestriction',
    minItems: 1,
    maxClaimers: '',
    minPercentage: '',
    chartType: 'donut',
    days: []
  }

  render () {
    const { classes } = this.props
    const {
      leftoverTime,
      favoringTime,
      localRadius,
      radiusType,
      localTime,
      during,
      startTime,
      endTime,
      territoryTime,
      restriction,
      minItems,
      maxClaimers,
      minPercentage,
      chartType,
      days
    } = this.state

    const labels = [
      'Favoring timer duration (hours)',
      'Local timer duration (hours)',
      'Territory timer duration (hours)',
      'Time left over (hours)'
    ]
    const colors = [ '#2671B3', '#21CAC6', '#1FC068', '#6F29C0' ]

    const chartData = [
      favoringTime,
      localTime,
      territoryTime,
      leftoverTime
    ]

    const barData = {
      datasets: [
        {
          label: labels[0],
          data: [chartData[0]],
          backgroundColor: colors[0]
        },
        {
          label: labels[1],
          data: [chartData[1]],
          backgroundColor: colors[1]
        },
        {
          label: labels[2],
          data: [chartData[2]],
          backgroundColor: colors[2]
        },
        {
          label: labels[3],
          data: [chartData[3]],
          backgroundColor: colors[3]
        }
      ]
    }

    return (
      <Fragment>
        <Typography variant='h6'>
            Order Availability
        </Typography>
        <Typography>
            Populate claiming rules to define how orders are shared with connected businesses.
        </Typography>

        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <Card className={classNames(classes.grayCard, classes.marginTop2)} elevation={0}>
              <CardContent>
                <form>
                  <TextField
                    fullWidth
                    value={favoringTime}
                    onChange={this.handleChange('favoringTime')}
                    label='Favoring timer duration: (hours)' />
                  <Typography className={classes.marginTop2} fullWidth variant='h6'>
                    Local Timer:
                  </Typography>
                  <Grid container spacing={8}>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        value={localRadius}
                        onChange={this.handleChange('localRadius')}
                        label='Local timer radius:' />
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel>Radius type:</InputLabel>
                        <Select native fullWidth onChange={this.handleChange('radiusType')} value={radiusType}>
                          <option value='miles'>Miles</option>
                          <option value='kilometers'>Kilometers</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        value={localTime}
                        onChange={this.handleChange('localTime')}
                        label='Local timer duration: (hours)' />
                    </Grid>
                  </Grid>

                  <Grid container alignItems='center'>
                    <Grid item xs={6}>
                      <FormControl className={classes.marginTop2} component='fieldset'>
                        <FormLabel>Local timer availability</FormLabel>
                        <RadioGroup
                          value={during}
                          onChange={this.handleChange('during')}>
                          <FormControlLabel
                            value='wholeDay'
                            control={<Radio color='primary' />}
                            label='Available during the whole day' />
                          <FormControlLabel
                            value='specificHours'
                            control={<Radio color='primary' />}
                            label='Available during specific hours' />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                      {during === 'specificHours' &&
                        <Grid container alignItems='flex-end' spacing={8}>
                          <Grid item xs={12} sm={6}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                              <TimePicker
                                fullWidth
                                label='Start Time'
                                value={startTime}
                                onChange={this.handleStartTimeChange} />
                            </MuiPickersUtilsProvider>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                              <TimePicker
                                fullWidth
                                label='End Time'
                                value={endTime}
                                onChange={this.handleEndTimeChange} />
                            </MuiPickersUtilsProvider>
                          </Grid>
                        </Grid>
                      }
                    </Grid>
                  </Grid>

                  <Grid container spacing={8}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        vaule={territoryTime}
                        onChange={this.handleChange('territoryTime')}
                        label='Territory timer duration: (hours)' />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        vaule={leftoverTime}
                        onChange={this.handleChange('leftoverTime')}
                        label='Left Over timer duration: (hours)' />
                    </Grid>
                  </Grid>

                  <Typography variant='h6' className={classes.marginTop2}>Days of the Week</Typography>
                  <Grid container justify='center' spacing={8}>
                    <Grid item xs={3}>
                      <Button fullWidth onClick={this.weekDays} variant='contained' color='primary'>Week Days</Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button fullWidth onClick={this.weekEnd} variant='contained' color='primary'>Week End</Button>
                    </Grid>
                  </Grid>

                  <Grid container className={classes.marginTop1} spacing={8}>
                    <Grid item xs>
                      <Button
                        fullWidth
                        variant='contained'
                        onClick={() => this.toggleDay('sun')}
                        color={days.includes('sun') ? 'primary' : 'default'}>
                        Sun
                      </Button>
                    </Grid>

                    <Grid item xs>
                      <Button
                        fullWidth
                        variant='contained'
                        onClick={() => this.toggleDay('mon')}
                        color={days.includes('mon') ? 'primary' : 'default'}>
                        Mon
                      </Button>
                    </Grid>

                    <Grid item xs>
                      <Button
                        fullWidth
                        variant='contained'
                        onClick={() => this.toggleDay('tue')}
                        color={days.includes('tue') ? 'primary' : 'default'}>
                        Tue
                      </Button>
                    </Grid>

                    <Grid item xs>
                      <Button
                        fullWidth
                        variant='contained'
                        onClick={() => this.toggleDay('wed')}
                        color={days.includes('wed') ? 'primary' : 'default'}>
                        Wed
                      </Button>
                    </Grid>

                    <Grid item xs>
                      <Button
                        fullWidth
                        variant='contained'
                        onClick={() => this.toggleDay('thu')}
                        color={days.includes('thu') ? 'primary' : 'default'}>
                        Thu
                      </Button>
                    </Grid>

                    <Grid item xs>
                      <Button
                        fullWidth
                        variant='contained'
                        onClick={() => this.toggleDay('fri')}
                        color={days.includes('fri') ? 'primary' : 'default'}>
                        Fri
                      </Button>
                    </Grid>

                    <Grid item xs>
                      <Button
                        fullWidth
                        variant='contained'
                        onClick={() => this.toggleDay('sat')}
                        color={days.includes('sat') ? 'primary' : 'default'}>
                        Sat
                      </Button>
                    </Grid>
                  </Grid>

                  <Typography className={classes.marginTop2} variant='h6'>
                    Retailer Claiming Restriction
                  </Typography>
                  <Grid container alignItems='center'>
                    <Grid item xs={6}>

                      <FormControl component='fieldset'>
                        <RadioGroup
                          value={restriction}
                          onChange={this.handleChange('restriction')}>
                          <FormControlLabel
                            value='noRestriction'
                            control={<Radio color='primary' />}
                            label='No Restriction' />
                          <FormControlLabel
                            value='singleClaimer'
                            control={<Radio color='primary' />}
                            label='Single Claimer' />
                          <FormControlLabel
                            value='custom'
                            control={<Radio color='primary' />}
                            label='Custom' />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        disabled={restriction !== 'custom'}
                        value={minItems}
                        onChange={this.handleChange('minItems')}
                        label='Min. amount of items per order' />

                      <Grid container spacing={8}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            disabled={restriction !== 'custom'}
                            value={maxClaimers}
                            onChange={this.handleChange('maxClaimers')}
                            label='Max. number of claimers' />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            disabled={restriction !== 'custom'}
                            value={minPercentage}
                            onChange={this.handleChange('minPercentage')}
                            label='Min. claim percentage (%)' />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container justify='center' className={classes.marginTop2}>
                    <Button variant='contained' color='primary' size='large'>
                        Submit
                    </Button>
                  </Grid>
                </form>

              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl component='fieldset' fullWidth>
              <RadioGroup
                className={classes.horizontalRadio}
                value={chartType}
                onChange={this.handleChange('chartType')}>
                <FormControlLabel
                  value='donut'
                  control={<Radio color='primary' />}
                  label='Donut Chart' />
                <FormControlLabel
                  value='bar'
                  control={<Radio color='primary' />}
                  label='Bar Chart' />
              </RadioGroup>
            </FormControl>

            {chartType === 'donut'
              ? <DonutChart
                width={180}
                data={chartData}
                labels={labels}
                colors={colors}
                showLabels
                labelsColor='#fff' />
              : <HorizontalBarChart
                width={180}
                fullData={barData}
                showLabels
                stacked
                labelsColor='#fff' />
            }
          </Grid>
        </Grid>
      </Fragment>
    )
  }

  weekDays = () => {
    this.setState({ days: ['mon', 'tue', 'wed', 'thu', 'fri'] })
  }

  weekEnd = () => {
    this.setState({ days: ['sat', 'sun'] })
  }

  toggleDay = day => {
    const days = this.state.days
    if (days.includes(day)) {
      const daysArr = days.slice()
      const index = daysArr.indexOf(day)
      daysArr.splice(index, 1)
      this.setState({ days: daysArr })
    } else {
      this.setState({ days: [ ...this.state.days, day ] })
    }
  }

  handleChange = name => event => {
    if (name === 'restriction' && event.target.value === 'singleClaimer') {
      this.setState({
        restriction: event.target.value,
        maxClaimers: 1,
        minPercentage: 100
      })
    } else if (name === 'restriction' && event.target.value !== 'singleClaimer') {
      this.setState({
        restriction: event.target.value,
        maxClaimers: '',
        minPercentage: ''
      })
    } else {
      this.setState({
        [name]: event.target.value
      })
    }
  }

  handleStartTimeChange = time => {
    this.setState({ startTime: time })
  }

  handleEndTimeChange = time => {
    this.setState({ endTime: time })
  }
}
