import React from 'react'
import { Bar } from 'react-chartjs-2'
import { withStyles } from '@material-ui/core/styles'

import styles from '../../styles'

import { createBlueColors } from '../../helpers/createColors'

export default withStyles(styles)(({
  data,
  labels,
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
    return data.length > 1
      ? { ...obj, backgroundColor: colors[index] }
      : { ...obj, backgroundColor: colors }
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

  return <Bar width={width} height={height} data={fullData || dataSet} options={options} />
})
