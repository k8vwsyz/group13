import { AnyAction, ThunkAction } from "@reduxjs/toolkit"
import { socket } from "../components/client_socket"
import { Infotainment } from "../interfaces/car"
import { carAddedSimple } from "./cars"
import { alertInfoContentUpdated, alertInfoUpdated, lanesExpandedUpdated, lanesZoomedOutUpdated, notificationTextUpdated } from "./infotainment"
import { RootState } from "./store"

export type Payload<T> = { payload: T, type: string }
export type RootThunk = ThunkAction<void, RootState, unknown, AnyAction>

export const thunkEmitDispatch = <T>(
  eventType: string,
  args: any[],
  action: Payload<T>
): RootThunk => async (dispatch, getState) => {
  const admin = getState().user.admin // TODO maybe, add multiple rooms for 1 admin
  socket.emit(eventType, admin, admin, ...args)
  dispatch(action)
}

export const latestState = (infotainment: Infotainment): RootThunk => (dispatch, _getState) => {
  const { alertInfo, alertInfoContent, cars, zoomedOut, expanded, notificationText } = infotainment
  cars.forEach(car => dispatch(carAddedSimple(car)))
  dispatch(alertInfoUpdated(alertInfo))
  dispatch(alertInfoContentUpdated(alertInfoContent))
  dispatch(lanesZoomedOutUpdated(zoomedOut))
  dispatch(lanesExpandedUpdated(expanded))
  dispatch(notificationTextUpdated(notificationText))
}
