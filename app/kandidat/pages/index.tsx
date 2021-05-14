import React, { useEffect, useCallback } from 'react'
import Controls from '../components/Controls/Controls'
import { socket, SocketContext } from '../components/client_socket'
import ConnectedClients from '../components/ConnectedClients'
import { useAppDispatch } from '../redux/hooks'
import { latestState } from '../redux/genericThunk'
import { Infotainment } from '../interfaces/car'
import { carsRemoved } from '../redux/cars'
import Vehicle from '../components/Vehicle'
import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  aspectRatio: {
    width: '100%', paddingBottom: '79%',
    position: 'relative'
  },
  vehicleLayout: {
    position: 'absolute', width: '100%', height: '100%',
    overflow: 'hidden', borderRadius: '2em',
    background: '#ffffff', boxShadow: '2px 2px 8px 0px rgba(0,0,0,0.25)'
  },
  controlsContainer: {
    marginTop: theme.spacing(4),
    overflow: 'hidden',
    padding: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(2)
  }
}))

const IndexPage = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const handleLatestState = useCallback((infotainment: Infotainment) => {
    console.log('latest state', infotainment)
    dispatch(carsRemoved())
    dispatch(latestState(infotainment))
  }, [socket])

  useEffect(() => {
    socket.on('latest_state', handleLatestState)
  }, [socket])

  return (
    <SocketContext.Provider value={socket}>
      <Grid className={classes.padding} container>
        <Grid item xs={2}>
          <ConnectedClients />
        </Grid>
        <Grid item xs={10}>
          <div className={classes.aspectRatio}>
            <div className={classes.vehicleLayout}>
              <Vehicle />
            </div>
          </div>
          <div className={classes.controlsContainer}>
            <Controls />
          </div>
        </Grid>
      </Grid>
      <p>source for the copyright holder of the ambulance sprite used <a href="https://www.pngaaa.com/detail/3428326">here</a></p>
    </SocketContext.Provider >
  )
}

export default IndexPage
