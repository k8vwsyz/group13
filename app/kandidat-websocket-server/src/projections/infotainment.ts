import { AlertInfoContent, Infotainment } from "../types/client_types"
import { CarEvent } from "../types/types"
import { projectCars } from "./car"

export const expanded = (carEvents: CarEvent[]) => {
  const reducer = (_acc: boolean, e: CarEvent) => e.kind === "lanes_expanded" ? e.payload : false
  return carEvents.reduce(reducer, false)
}

export const zoomedOut = (carEvents: CarEvent[]) => {
  const reducer = (acc: boolean, e: CarEvent) => e.kind === "lanes_zoomed_out" ? e.payload : acc
  return carEvents.reduce(reducer, false)
}

export const notificationText = (carEvents: CarEvent[]) => {
  const reducer = (acc: string, e: CarEvent) => e.kind === "notification_text_updated" ? e.payload : acc
  return carEvents.reduce(reducer, '')
}

export const projectAlertInfo = (carEvents: CarEvent[]) => {
  const reducer = (acc: boolean, e: CarEvent) => e.kind === "alert_info_updated" ? e.payload : acc
  return carEvents.reduce(reducer, false)
}

export const projectAlertInfoContent = (carEvents: CarEvent[]) => {
  const reducer = (acc: AlertInfoContent, e: CarEvent) => e.kind === "alert_info_content_updated" ? e.payload : acc
  return carEvents.reduce(reducer, { amount: 0, distance: 0 })
}

export const projectInfotainment = (carEvents: CarEvent[]): Infotainment => {
  const cars = projectCars(carEvents)
  const _expanded = expanded(carEvents)
  const _zoomedOut = zoomedOut(carEvents)
  const _notificationText = notificationText(carEvents)
  const _alertInfo = projectAlertInfo(carEvents)
  const _alertInfoContent = projectAlertInfoContent(carEvents)
  return {
    cars,
    expanded: _expanded,
    zoomedOut: _zoomedOut,
    notificationText: _notificationText,
    alertInfo: _alertInfo,
    alertInfoContent: _alertInfoContent
  }
}
