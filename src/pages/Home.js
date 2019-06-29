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
import { Search, Add, Autorenew } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import PlacesCard from './PlacesCard'
import styles from '../styles'

class Home extends Component {
  state = {
    searchValue: '',
    selectedFoodTypes: [],
    selectedPrice: '$$$',
    selectedDistance: 5,
    newType: '',
    foodTypeArr: ['Mexican', 'French', 'Chinese', 'Indian', 'Italian', 'Thai', 'Seafood', 'Japanese', 'Korean', 'German', 'Fast Food', 'Cocktails', 'Steak', 'American', 'Vegan'],
    placesResults: [],
    currentPlace: 0
  }

  render () {
    const { classes } = this.props
    const { searchValue, selectedFoodTypes, selectedDistance, selectedPrice, newType, foodTypeArr, placesResults, currentPlace } = this.state

    console.log(selectedFoodTypes)

    const priceArr = ['$', '$$', '$$$']
    const distanceArr = [
      { distance: 0.5, name: 'walking' },
      { distance: 5, name: '5 miles' },
      { distance: 20, name: '20 miles' }
    ]

    // const geo = geoip.lookup(ipAddress)
    console.log(window.google)

    if (placesResults.length === 0) {
      return (
        <Card className={classes.searchForm}>
          <div id='map' />
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
                    className={classNames(classes.foodTypeButton, selectedFoodTypes.includes(type) && 'selected')}>
                    <Typography align='center' className={classes.FullWidth}>{type}</Typography>
                  </Grid>
                )
              })}

              <form onSubmit={this.addFoodType} className={classes.fullWidth}>
                <TextField
                  fullWidth
                  style={{ marginTop: 24 }}
                  variant='outlined'
                  value={newType}
                  onChange={this.handleInputChange('newType')}
                  placeholder='Add Food Type (press enter)'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Add />
                      </InputAdornment>
                    )
                  }} />
              </form>
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
                    onClick={() => this.select('selectedDistance', distance.distance)}
                    key={`${distance.distance}${key}`}
                    className={classNames(classes.foodTypeButton, selectedDistance === distance.distance && 'selected')}>
                    <Typography align='center' className={classes.FullWidth}>{distance.name}</Typography>
                  </Grid>
                )
              })}
            </Grid>

            <TextField
              fullWidth
              style={{ marginTop: 24 }}
              variant='outlined'
              value={searchValue}
              onChange={this.handleInputChange('searchValue')}
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
              <Button size='large' color='primary' variant='contained' onClick={this.search}>FIND ME FOOD</Button>
            </div>
          </CardActions>
        </Card>
      )
    } else {
      return (
        <Grid container justify='center' alignContent='center'>
          <Typography variant='h6' onClick={() => window.location.reload(true)}><Button>Reset <Autorenew /></Button></Typography>
          <PlacesCard key={placesResults[currentPlace].name} place={placesResults[currentPlace]} decline={this.decline} classes={classes} />
        </Grid>
      )
    }
  }

  decline = () => {
    this.setState({ currentPlace: this.state.currentPlace + 1 })
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(pos => {
      const googleLocation = new window.google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
      this.setState({ googleLocation, location: pos.coords })
    })
  }

  addFoodType = event => {
    event.preventDefault()
    const foodTypes = [...this.state.foodTypeArr, this.state.newType]
    this.setState({ foodTypeArr: foodTypes, newType: '' })
  }

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value })
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

  search = () => {
    const { googleLocation, searchValue, selectedFoodTypes, selectedDistance, selectedPrice } = this.state
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: googleLocation,
      zoom: 15
    })
    const service = new window.google.maps.places.PlacesService(map)
    const request = {
      query: `${selectedFoodTypes.join('|')}|${searchValue && `|${searchValue}`}`,
      location: googleLocation,
      radius: selectedDistance * 1610,
      minPriceLevel: selectedPrice.length,
      type: ['restaurant']
    }
    console.log(request)
    service.textSearch(request, (results, status) => {
      console.log(results)
      this.setState({ placesResults: results })
    })
  }
}

export default withStyles(styles)(Home)
