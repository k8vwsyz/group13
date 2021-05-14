import React, { useContext, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { clientsReceived, selectClients } from '../redux/user'
import { SocketContext } from './client_socket'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  client: {
    background: 'radial-gradient(circle, rgba(255,240,245,1) 0%, rgba(246,246,246,1) 69%)',
    boxShadow: '2px 2px 8px 0px rgba(0,0,0,0.25)',
    borderRadius: '0.5em',
    padding: '1em',
    margin: `${theme.spacing(1)}px 0`,
    width: '15em',
    maxWidth: '95%',
  }
}))

const ConnectedClients = () => {
  const socket = useContext(SocketContext)
  const dispatch = useAppDispatch()
  const clients = useAppSelector(selectClients)
  const classes = useStyles()

  useEffect(() => {
    socket.on('connected_clients', (clients: { client: string, count: number }[]) => {
      const mapped = clients.map(client => ({ clientName: client.client, connected: client.count }))
      dispatch(clientsReceived(mapped))
    })
  }, [socket, dispatch])

  return (
    <div className={classes.container}>
      {
        clients.map(client =>
          <div className={classes.client}>
            <Typography variant="caption">name: {client.clientName}, connected: {client.connected}</Typography>
          </div>
        )
      }
    </div>
  )
}

export default ConnectedClients
