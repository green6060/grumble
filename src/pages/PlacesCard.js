import React from 'react'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton
} from '@material-ui/core'
import { CheckCircle, Close } from '@material-ui/icons'

export default ({ classes, place, decline }) => {
  console.log(place.photos[0].getUrl())
  return (
    <Card className={classes.placesCard}>
      <CardHeader
        avatar={
          <Avatar aria-label='Recipe' className={classes.avatar}>
            <img width='100%' src={place.icon} />
          </Avatar>
        }
        title={place.name}
        subheader={`Rating: ${place.rating} (${place.user_ratings_total})`}
      />
      <CardContent>
        <div style={{ backgroundImage: `url(${place.photos[0].getUrl()})`, height: 400, width: '100%', backgroundSize: 'cover' }} />
        <Grid style={{ paddingTop: 12 }} container justify='space-between'>
          <Grid item>
            <Typography variant='h6' color='textSecondary' component='h6'>{place.formatted_address}</Typography>
          </Grid>

          <Grid item>
            <Typography variant='h6' color='textSecondary' component='h6'>Price Level: {place.price_level}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justify='space-between'>
          <Grid item>
            <IconButton onClick={decline}>
              <Close />
            </IconButton>
          </Grid>

          <Grid item>
            <a href={`https://maps.google.com/?ll=${place.geometry.location.lat()},${place.geometry.location.lng()}`}>
              <IconButton>
                <CheckCircle />
              </IconButton>
            </a>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}
