import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Card, CardContent, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import styles from '../../styles'
import { createBlueColors } from '../../helpers/createColors'

export default withStyles(styles)(({
  data,
  labels,
  title,
  stacked,
  maxWidth,
  width,
  height,
  showLabels,
  labelsColor,
  classes,
  colors,
  percentTooltips
}) => {
  if (data && !colors) {
    colors = createBlueColors(data.length)
  }

  const dataSet = {
    labels,
    datasets: [{
      data,
      backgroundColor: colors
    }]
  }

  const tooltips = percentTooltips
    ? {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex]
          const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue)
          const currentValue = dataset.data[tooltipItem.index]
          const percentage = Math.floor(((currentValue / total) * 100) + 0.5)

          return percentage + '%'
        }
      }
    }
    : {}

  const options = {
    tooltips,

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
        <Doughnut width={width} height={height} data={dataSet} options={options} />
      </CardContent>
    </Card>
  )
})
