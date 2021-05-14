import React from 'react'
import RoomControls from './RoomControls'
import { Grid, Paper } from '@material-ui/core'
import ScenarioControls from './ScenarioControls'
import InfotainmentControls from './InfotainmentControls'

const Controls = () => {
  return (
    <Grid container style={{ flexGrow: 1 }} spacing={4}>
      <Grid item xs={12}>
        <Paper elevation={2}>
          <ScenarioControls />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2}>
          <RoomControls />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2}>
          <InfotainmentControls />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Controls
