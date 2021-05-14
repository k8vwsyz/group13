import React, { useEffect, useRef, useState } from 'react'
import { AlertInfoContent } from '../../interfaces/car'
import styles from '../../styles/Infotainment.module.css'
import { useContainerDimensions } from './Lanes'
import { useSpring, animated } from '@react-spring/web'
import { Typography } from '@material-ui/core'
import EvInfo from './EvInfo'
import LanesWrapper from './LanesWrapper'
import { NotificationDropdown } from '../../interfaces/infotainment'

// Type. Move to interfaces?
export type InfotainmentProps = {
  notification: NotificationDropdown,
  notificationText: string,
  expanded: boolean,
  alertInfo: boolean,
  alertInfoContent: AlertInfoContent
}

const Infotainment = ({ notification: { show, sound }, notificationText, expanded, alertInfo, alertInfoContent }: InfotainmentProps) => {
  //In order for the sound to play the user needs to interact with the screen at least once.
  //This can be handled by having them press a button before the prototype plays.
  useEffect(() => {
    //hack :D
    (async () => {
      if (show && sound) {
        const notiSound = new Audio('/ascending_threetone_light_study.mp3')
        await notiSound.play()
      }
    })()
  }, [show, sound])

  const [expandedProps, setExpandedProps] = useSpring({ flexGrow: 0.25, onChange: () => { handleResize() } }, [expanded])
  const [notificationStyle, animateNotification] = useSpring({ transform: 'translateY(-100%)' }, [show])
  const [alert, setAlert] = useSpring({ transform: 'translateY(-100%)' }, [alertInfo])
  const [hidden, setHidden] = useState(true)

  const lanesContainerRef = useRef<HTMLDivElement>(null)
  const { width, height, handleResize } = useContainerDimensions(lanesContainerRef)

  useEffect(() => { setExpandedProps({ flexGrow: expanded ? 1.66667 : 0.45 }) }, [expanded])

  //Using spring to animate the notification bar
  useEffect(() => {
    if (show) {
      setHidden(false)
      animateNotification({ transform: 'translateY(0%)' })
    } else {
      setHidden(true)
      animateNotification({ transform: 'translateY(-100%)' })
    }
  }, [show])

  //The alert containing information regarding the position, and number of, emergency vehicles
  useEffect(() => {
    alertInfo ?
      setAlert({ transform: 'translateY(0%)' }) :
      setAlert({ transform: 'translateY(-100%)' })
  }, [alertInfo])


  //Spring will know to animate the tags called "animated.div"
  //Using `$[Text] $[Other text]`  will be read as a string.
  return (
    <div className={styles.container}>
      <animated.div style={expandedProps} className={`${styles.lanes}`}>
        <LanesWrapper ref={lanesContainerRef} width={width} height={height} />
      </animated.div>
      <div className={styles.map}>
        <img
          src="/map_placeholder.png"
          style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute' }} />
      </div>
      <animated.div style={alert} className={styles.alert}>
        <EvInfo distance={alertInfoContent.distance} amount={alertInfoContent.amount} />
      </animated.div>
      <animated.div style={notificationStyle} className={
        `${styles.notificationWrapper} ${hidden ? styles.overflowHidden : ''}`}>
        <div className={styles.notification}>
          <Typography style={{ fontSize: '1.0rem' }} variant="h6" >{notificationText}</Typography>
        </div>
      </animated.div>
    </div>
  )
}

export default Infotainment