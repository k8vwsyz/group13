import React, { useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import Grid from '@material-ui/core/Grid'
import { socket } from '../client_socket'
import { adminChanged, clientAdded_, selectAdmin, selectClientError } from '../../redux/user'
import { TextField, Typography, Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  margin: {
    margin: '0 0.5em'
  },
  container: {
    padding: '1em'
  },
  textform: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'baseline'
  },
})

const RoomControls = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const clientCreationError = useAppSelector(selectClientError)
  const admin = useAppSelector(selectAdmin)

  const [clientName, setClientName] = useState('')
  const [username, setUsername] = useState('')

  const handleCreateClient = useCallback(async () => {
    await dispatch(clientAdded_(clientName))
  }, [clientName])

  const handleSetUsername = useCallback(async () => {
    socket.emit('associate', username)
    dispatch(adminChanged(username))
  }, [socket, username])

  return (
    <Grid className={classes.container} container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">current username: {admin}</Typography>
      </Grid>
      <Grid className={classes.textform} item xs={6}>
        <TextField
          className={classes.margin}
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          className={classes.margin}
          variant="contained"
          onClick={handleSetUsername}
        >set username</Button>
      </Grid>
      <Grid className={classes.textform} item xs={6}>
        <TextField
          className={classes.margin}
          label="Client name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          error={clientCreationError ? true : undefined}
          helperText={clientCreationError ? clientCreationError : undefined}
        />
        <Button
          className={classes.margin}
          variant="contained"
          onClick={handleCreateClient}
        >create client</Button>
      </Grid>
    </Grid>
  )
}

export default RoomControls