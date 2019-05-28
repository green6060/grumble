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
    selectedPrice: '$$$',
    selectedDistance: '5 Miles'
  }

  render () {
    const { classes } = this.props
    const { searchValue, selectedFoodTypes, selectedDistance, selectedPrice } = this.state

    console.log(selectedFoodTypes)

    const foodTypeArr = ['Mexican', 'French', 'Chinese', 'Indian', 'Italian', 'Thai', 'Seafood', 'Japanese', 'Korean', 'German', 'Fast Food', 'Cocktails', 'Steak', 'American', 'Vegan']
    const priceArr = ['$', '$$', '$$$']
    const distanceArr = ['Walking', '5 Miles', '20 miles']

    return (
      <Card className={classes.searchForm}>
        <form>
          <CardContent>
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

            <Grid container className={classes.fullWidth}>
              <Grid item className={classes.fullWidth}>
                <Typography className={classes.fullWidth} variant='caption'>Select price point and max distance.</Typography>
              </Grid>

              {priceArr.map((price, key) => {
                return (
                  <Grid
                    item
                    sm={2} lg={4}
                    onClick={() => this.select('selectedPrice', price)}
                    key={`${price}${key}`}
                    justify='center'
                    alignContent='center'
                    className={classNames(classes.foodTypeButton, selectedPrice === price && 'selected')}>
                    <Typography align='center' className={classes.FullWidth}>{price}</Typography>
                  </Grid>
                )
              })}
              {distanceArr.map((distance, key) => {
                return (
                  <Grid
                    item
                    sm={2} lg={4}
                    onClick={() => this.select('selectedDistance', distance)}
                    key={`${distance}${key}`}
                    justify='center'
                    alignContent='center'
                    className={classNames(classes.foodTypeButton, selectedDistance === distance && 'selected')}>
                    <Typography align='center' className={classes.FullWidth}>{distance}</Typography>
                  </Grid>
                )
              })}
            </Grid>

            <TextField
              fullWidth
              style={{ marginTop: 24 }}
              variant='outlined'
              value={searchValue}
              onChange={this.handleInputChange}
              placeholder='Food Type or Restaurant Name (optional)'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Search />
                  </InputAdornment>
                )
              }} />
          </CardContent>
          <CardActions>
            <div className={classNames(classes.fullWidth, classes.displayFlex, classes.horizontalCenter)}>
              <Button size='large' color='primary' variant='contained'>FIND ME FOOD</Button>
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

  select = (name, value) => {
    this.setState({ [name]: value })
  }
}

export default withStyles(styles)(Home)
