import React from 'react'
import { Grid, Divider } from '@material-ui/core'
import AlertControls from './Infotainment/AlertControls'
import LanesContainerControls from './Infotainment/LanesContainerControls'
import CarControls from './Infotainment/CarControls'
import NotificationControls from './Infotainment/NotificationControls'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  padding: { padding: '1em' },
  margin: { margin: '1em 0' }
})

const InfotainmentControls = () => {
  const classes = useStyles()
  //================================================================================================
  // Sources, to be put somewhere else eventually
  //
  // * Source of EV: https://www.pngaaa.com/detail/3428326
  //================================================================================================

  return (
    <Grid className={classes.padding} container spacing={2}>
      <Grid item xs={12}>
        <CarControls />
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.margin} />
        <NotificationControls />
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.margin} />
        <LanesContainerControls />
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.margin} />
        <AlertControls />
      </Grid>
    </Grid>
  )
}

export default InfotainmentControls
