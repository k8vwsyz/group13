
import React, { useCallback, useEffect } from 'react'
import styles from '../../styles/ClientPage.module.css'
import { socket } from '../../components/client_socket'
import homeStyles from '../../styles/Home.module.css'
import { useRouter } from 'next/dist/client/router'
import { useAppDispatch } from '../../redux/hooks'
import { carAddedSimple, carDurationChanged, carMovedSimple, carRemoved, carsRemoved } from '../../redux/cars'
import { AlertInfoContent, Car, Infotainment } from '../../interfaces/car'
import { alertInfoContentUpdated, alertInfoUpdated, laneChangeCleared, laneChangeUpdated, lanesExpandedUpdated, lanesZoomedOutUpdated, notificationPlayed, notificationPlaying, notificationStopped, notificationTextUpdated } from '../../redux/infotainment'
import { LaneChange } from '../../components/infotainment/Lanes'
import { latestState } from '../../redux/genericThunk'
import Vehicle from '../../components/Vehicle'
import { NotificationDropdown } from '../../interfaces/infotainment'

const ClientPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { room } = router.query

  const handlePlayNotification = useCallback((notification: NotificationDropdown) => {
    dispatch(notificationPlayed(notification))
    setTimeout(() => { dispatch(notificationStopped()) }, 10000)
  }, [socket])

  const handleLatestState = useCallback((infotainment: Infotainment) => {
    console.log('latest state?', infotainment)
    dispatch(latestState(infotainment))
  }, [socket])

  //socket.on vill ta emot events
  useEffect(() => {
    if (room !== undefined) { // TODO fix dumb solution
      // sets up event listeners
      socket.on('latest_state', handleLatestState)
      socket.on('notification_played', handlePlayNotification)
      socket.on('car_added', (car: Car) => dispatch(carAddedSimple(car)))
      socket.on('car_moved', (car: Car) => dispatch(carMovedSimple(car)))
      socket.on('lanes_expanded', (expanded: boolean) => dispatch(lanesExpandedUpdated(expanded)))
      socket.on('lanes_zoomed_out', (zoomed: boolean) => dispatch(lanesZoomedOutUpdated(zoomed)))
      socket.on('notification_text_updated', (text: string) => dispatch(notificationTextUpdated(text)))
      socket.on('alert_info_updated', (alert: boolean) => dispatch(alertInfoUpdated(alert)))
      socket.on('alert_info_content_updated', (content: AlertInfoContent) => dispatch(alertInfoContentUpdated(content)))
      socket.on('lane_change_updated', (laneChange: LaneChange) => dispatch(laneChangeUpdated(laneChange)))
      socket.on('lane_change_cleared', () => dispatch(laneChangeCleared()))
      socket.on('cars_removed', () => dispatch(carsRemoved()))
      socket.on('car_removed', (car_id: string) => dispatch(carRemoved(car_id)))
      socket.on('duration_changed', (car_id: string, duration: number) => dispatch(carDurationChanged({ id: car_id, duration })))

      console.log('?', room)
      // joins the room http://address/client/[room name]
      // asks the server for the latest state of the room
      socket.emit('client_joined', room)
    }

    return () => { socket.off('car_added'); socket.off('car_modified') }
  }, [socket, room])

  return (
    <div>
      <p style={{ position: 'absolute', zIndex: 500 }}>source for the copyright holder of the ambulance sprite used <a href="https://www.pngaaa.com/detail/3428326">here</a></p>
      <div className={styles.flexWrapper}>
        <div className={styles.container}>
          <div className={`${homeStyles.vehicleLayout} ${homeStyles.fillParent}`}>
            <Vehicle />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientPage