import React from 'react'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import {
  TableRow,
  TableCell,
  TextField,
  FormControlLabel,
  Switch
} from '@material-ui/core'

export default ({ classes, variant }) => {
  return (
    <TableRow hover className={classes.alternatingTable}>
      <TableCell className={classes.minWidth100} padding='dense'>
        {variant.join('-')}
      </TableCell>

      <TableCell className={classes.minWidth200} padding='dense'>
        <TextField placeholder='Variant Name' />
      </TableCell>

      <TableCell className={classes.minWidth100} padding='dense'>
        <Dropzone
          className={classNames(classes.fullWidth, classes.fullHeight, classes.cursorPointer)}
          accept='image/jpeg, image/png'>
            Click to add images
        </Dropzone>
      </TableCell>

      <TableCell className={classes.minWidth100} padding='dense'>
        <TextField placeholder='SKU' />
      </TableCell>

      <TableCell className={classes.minWidth100} padding='dense'>
        <TextField placeholder='GTIN' />
      </TableCell>

      <TableCell className={classes.minWidth100} padding='dense'>
        <TextField placeholder='UPC' />
      </TableCell>

      <TableCell className={classes.minWidth100} padding='dense'>
        <TextField placeholder='Ref ID' />
      </TableCell>

      <TableCell className={classes.minWidth100} padding='dense'>
        <FormControlLabel
          control={
            <Switch
              value='reviewsOn'
              color='primary' />
          }
          label='on' />
      </TableCell>

      <TableCell className={classes.minWidth100} padding='checkbox'>
        <TextField placeholder='Standard(USD)' />
      </TableCell>

      <TableCell className={classes.minWidth100} padding='dense'>
        <TextField placeholder='Wholesale(USD)' />
      </TableCell>

      <TableCell className={classes.minWidth100} padding='dense'>
        <TextField placeholder='MSRP(CAD)' />
      </TableCell>

      <TableCell className={classes.minWidth100} padding='dense'>
        <TextField placeholder='Europe Standard EUR' />
      </TableCell>

      <TableCell className={classes.minWidth100} padding='dense'>
        <TextField placeholder='Euro MSRP' />
      </TableCell>

      <TableCell className={classes.minWidth100} padding='dense'>
        <TextField placeholder='AUD' />
      </TableCell>

      <TableCell className={classes.minWidth100} padding='dense'>
        <TextField placeholder='Friends & Family' />
      </TableCell>

      <TableCell className={classes.minWidth100} padding='dense'>
        <TextField placeholder='Test Price Type' />
      </TableCell>

      <TableCell className={classes.minWidth100} padding='dense'>
        <TextField placeholder='USD' />
      </TableCell>

      <TableCell className={classes.minWidth100} padding='dense'>
        <TextField placeholder='Special' />
      </TableCell>

    </TableRow>
  )
}
