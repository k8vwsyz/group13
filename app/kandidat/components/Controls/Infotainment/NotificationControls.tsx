import React, { useState, useCallback } from 'react'
import { Button, makeStyles, TextField } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { notificationPlayed_, notificationTextUpdated_, selectNotification } from '../../../redux/infotainment'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'baseline',
  },
  spacing: {
    margin: `0px ${theme.spacing(1)}px`
  },
  grow: {
    flexGrow: 1
  }
}))

const NotificationControls = () => {
  const classes = useStyles()
  const { show, sound } = useAppSelector(selectNotification)
  const dispatch = useAppDispatch()

  const [notificationText, setNotificationText] = useState('')

  const handlePlayNotification = useCallback((playSound: boolean) => {
    dispatch(notificationPlayed_({ show: true, sound: playSound }))
    setTimeout(() => { dispatch(notificationPlayed_({ show: false, sound: playSound })) }, 10000)
  }, [show, sound])

  const handleNotificationTextUpdated = useCallback(() => {
    dispatch(notificationTextUpdated_(notificationText))
  }, [notificationText])

  return (
    <div className={classes.container}>
      <TextField
        className={`${classes.spacing} ${classes.grow}`}
        label="Notification text"
        value={notificationText}
        onChange={(e) => setNotificationText(e.target.value)} />
      <Button className={classes.spacing} variant="contained" onClick={() => handleNotificationTextUpdated()}>update text</Button>
      <Button className={classes.spacing} variant="contained" disabled={show} onClick={() => handlePlayNotification(true)}>play notification</Button>
    </div>
  )
}

export default NotificationControls
