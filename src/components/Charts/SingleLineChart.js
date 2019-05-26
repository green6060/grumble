import React from 'react'
import { Line } from 'react-chartjs-2'
import { withStyles } from '@material-ui/core/styles'

import styles from '../../styles'
import { createBlueColors } from '../../helpers/createColors'

export default withStyles(styles)(({
  data,
  labels,
  maxWidth,
  width,
  height,
  fill,
  showLabels,
  labelsColor,
  classes,
  color,
  fillColor,
  showAxes
}) => {
  if (!color && data) {
    color = createBlueColors(1)
  }
  if (!fillColor) {
    fillColor = color[0].replace(/rgb/i, 'rgba').replace(/\)/i, ', 0.4)')
  }

  if (!labels) {
    labels = data.map(val => '')
  }

  const dataSet = {
    labels,
    datasets: [{
      data,
      borderColor: color,
      backgroundColor: fillColor
    }]
  }

  const options = {
    scales: {
      yAxes: [{
        display: showAxes,
        ticks: {
          beginAtZero: true
        }
      }],

      xAxes: [{
        display: showAxes
      }]
    },

    legend: {
      display: false
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

  return <Line width={width} height={height} data={dataSet} options={options} />
})
