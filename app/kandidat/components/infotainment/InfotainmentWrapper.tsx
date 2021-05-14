import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import { selectAlertInfo, selectAlertInfoContent, selectLanesExpanded, selectNotification, selectNotificationText } from '../../redux/infotainment'
import Infotainment, { InfotainmentProps } from './Infotainment'

const InfotainmentWrapper = () => {
  const notification = useAppSelector(selectNotification)
  const notificationText = useAppSelector(selectNotificationText)
  const expanded = useAppSelector(selectLanesExpanded)
  const alertInfo = useAppSelector(selectAlertInfo)
  const alertInfoContent = useAppSelector(selectAlertInfoContent)

  const props: InfotainmentProps = {
    notification, notificationText, expanded, alertInfo, alertInfoContent
  }

  return <Infotainment {...props} />
}

export default InfotainmentWrapper