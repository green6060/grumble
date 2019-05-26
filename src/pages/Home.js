import React, { Component } from 'react'
import classNames from 'classnames'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Grid
} from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import styles from '../styles'

class Home extends Component {
  state = {
    searchValue: '',
    selectedFoodTypes: [],
    pricePoints: [],
    distance: ''
  }

  render () {
    const { classes } = this.props
    const { searchValue, selectedFoodTypes } = this.state

    console.log(selectedFoodTypes)

    const foodTypeArr = ['Food', 'Fast Food', 'Chinese', 'Indian', 'Italian', 'Healthy', 'Sushi', 'Japanese', 'Korean']

    return (
      <Card className={classes.searchForm}>
        <form>
          <CardContent>
            <Typography align='center' variant='h3'>
            Gulper (Tinder For Food)
            </Typography>
            <TextField
              fullWidth
              value={searchValue}
              onChange={this.handleInputChange}
              placeholder='Search Food Type'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Search />
                  </InputAdornment>
                )
              }} />

            <Grid container className={classes.fullWidth}>
              <Grid item className={classes.fullWidth}>
                <Typography className={classes.fullWidth} variant='caption'>Select food types to include in search.</Typography>
              </Grid>

              {foodTypeArr.map((type, key) => {
                return (
                  <Grid
                    item
                    sm={2} lg={4}
                    onClick={() => this.toggleFoodType(type)}
                    key={`${type}${key}`}
                    justify='center'
                    alignContent='center'
                    className={classNames(classes.foodTypeButton, selectedFoodTypes.includes(type) && 'selected')}>
                    <Typography align='center' className={classes.FullWidth}>{type}</Typography>
                  </Grid>
                )
              })}
            </Grid>
          </CardContent>
          <CardActions>
            <div className={classNames(classes.fullWidth, classes.displayFlex, classes.horizontalCenter)}>
              <Button size='medium' color='primary' variant='contained'>Submit</Button>
            </div>
          </CardActions>
        </form>
      </Card>
    )
  }

  handleInputChange = event => {
    this.setState({ searchValue: event.target.value })
  }

  toggleFoodType = type => {
    const selected = this.state.selectedFoodTypes
    const selectedSpread = [...selected]
    selectedSpread.splice(selected.indexOf(type), 1)

    if (selected.includes(type)) {
      this.setState({ selectedFoodTypes: selectedSpread })
    } else {
      this.setState({ selectedFoodTypes: [...this.state.selectedFoodTypes, type] })
    }
  }
}

export default withStyles(styles)(Home)
