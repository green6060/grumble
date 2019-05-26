import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button
} from '@material-ui/core'

import { createOption } from '../../actions'
import tableHeaders from './tableHeaders'
import styles from '../../styles'
import tableStyles from '../../styles/tableStyles'
import combineStyles from '../../helpers/combineStyles'
import EnhancedTable from '../DataTable/EnhancedTable'
import ProductVariant from './ProductVariant'
import ProductOption from './ProductOption'

const combinedStyles = combineStyles(styles, tableStyles)

class Options extends Component {
  render () {
    const { classes, options, className, small } = this.props

    return (
      <div className={className}>
        <Card elevation={4}>
          <CardContent>
            <Grid container className={classes.marginBottom3} justify='space-between'>
              <Typography variant='h6'>Options</Typography>
              <Button variant='contained' color='primary' onClick={this.addOption}>
                  Add Option
              </Button>
            </Grid>

            {options.map((option, index) => (
              <ProductOption key={JSON.stringify(option)} option={option} classes={classes} index={index} small={small} />
            ))}
          </CardContent>
        </Card>

        {this.variants()[0].length >= 1 &&
          <EnhancedTable
            title='Variants'
            elevation={4}
            className={classes.marginTop4}
            rowCount={this.variants().length}
            tableHeaders={tableHeaders}
            data={this.variants()}>
            {this.variants().map((variant, key) => (
              <ProductVariant key={key} variant={variant} classes={classes} />
            ))}
          </EnhancedTable>
        }
      </div>
    )
  }
  variants = () => _.product.apply(null, this.returnOptionValues(this.props.options))

  returnOptionValues = options => {
    const values = options.map(option => option.values.length >= 1 && option.values)
    _.pull(values, false)
    return values
  }

  addOption = () => {
    const options = this.props.options
    this.props.createOption(`option${Object.keys(options).length + 1}`)
  }

  deleteOption = index => {
    const props = this.props
    const options = props.options.slice()
    options.splice(index, 1)

    props.deleteOption(options)
  }
}

const mapStateToProps = state => {
  return {
    options: state.productsReducer.options
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    createOption
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(Options))
