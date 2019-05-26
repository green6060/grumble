import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { Card, CardContent, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import styles from '../../styles'

import { createBlueColors } from '../../helpers/createColors'

export default withStyles(styles)(({
  data,
  labels,
  title,
  dataColors,
  stacked,
  maxWidth,
  width,
  height,
  showLabels,
  labelsColor,
  classes,
  colors,
  fullData
}) => {
  if (data && !colors) {
    data.length > 1
      ? colors = createBlueColors(data.length)
      : colors = createBlueColors(data[0].data.length)
  }

  const dataWithColors = data && data.map((obj, index) => {
    const newColors = dataColors || colors
    return data.length > 1
      ? { ...obj, backgroundColor: newColors[index] }
      : { ...obj, backgroundColor: newColors }
  })

  const dataSet = {
    labels,
    datasets: dataWithColors
  }

  const options = {
    scales: {
      xAxes: [{
        stacked
      }],
      yAxes: [{
        stacked,
        ticks: {
          beginAtZero: true
        }
      }]
    },

    plugins: {
      datalabels: {
        display: showLabels || false,
        color: labelsColor
      }
    }
  }

  return (
    <Card className={classes.fullHeight} style={{ maxWidth }} elevation={8}>
      <CardContent>
        <Typography align='center' variant='display1'>{title}</Typography>
        <HorizontalBar width={width} height={height} data={fullData || dataSet} options={options} />
      </CardContent>
    </Card>
  )
})
