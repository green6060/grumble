import React from 'react'
import { Line } from 'react-chartjs-2'
import { Card, CardContent, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import styles from '../../styles'
import { createBlueColors } from '../../helpers/createColors'

export default withStyles(styles)(({
  data,
  labels,
  title,
  maxWidth,
  width,
  height,
  fill,
  showLabels,
  labelsColor,
  classes,
  colors,
  fillColors
}) => {
  if (!colors && data) {
    colors = createBlueColors(data.length)
  }
  if (!fillColors) {
    fillColors = colors.map(color => color.replace(/rgb/i, 'rgba').replace(/\)/i, ', 0.4)'))
  }

  const dataWithColors = data && data.map((obj, index) => {
    return { ...obj, borderColor: colors[index], backgroundColor: fillColors[index] }
  })

  const dataSet = {
    labels,
    datasets: dataWithColors
  }

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },

    elements: {
      line: {
        fill
      },

      point: {
        hitRadius: 40
      }
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
        <Line width={width} height={height} data={dataSet} options={options} />
      </CardContent>
    </Card>
  )
})
