import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LaneChange } from "../components/infotainment/Lanes";
import { AlertInfoContent } from "../interfaces/car";
import { NotificationDropdown } from "../interfaces/infotainment";
import { thunkEmitDispatch } from "./genericThunk";
import { RootState } from "./store";

export interface InfotainmentSlice {
  notificationPlaying: NotificationDropdown,
  notificationText: string,
  lanes_expanded: boolean,
  lanes_zoomed_out: boolean,
  alertInfo: boolean,
  alertInfoContent: AlertInfoContent,
  laneChange: LaneChange | null
}

const initialState: InfotainmentSlice = {
  notificationPlaying: { show: false, sound: true },
  notificationText: '',
  lanes_expanded: false,
  lanes_zoomed_out: false,
  alertInfo: false,
  alertInfoContent: { distance: 0, amount: 0 },
  laneChange: null
}

export const infotainmentSlice = createSlice({
  name: 'infotainment',
  initialState,
  reducers: {
    notificationPlaying: (state) => { state.notificationPlaying = { show: true, sound: true } },
    notificationStopped: (state) => { state.notificationPlaying = { show: false, sound: true } },
    notificationPlayed: (state, action: PayloadAction<NotificationDropdown>) => { state.notificationPlaying = action.payload },
    notificationTextUpdated: (state, action: PayloadAction<string>) => { state.notificationText = action.payload },
    lanesExpandedUpdated: (state, action: PayloadAction<boolean>) => { state.lanes_expanded = action.payload },
    lanesZoomedOutUpdated: (state, action: PayloadAction<boolean>) => { state.lanes_zoomed_out = action.payload },
    alertInfoUpdated: (state, action: PayloadAction<boolean>) => { state.alertInfo = action.payload },
    alertInfoContentUpdated: (state, action: PayloadAction<AlertInfoContent>) => {
      state.alertInfoContent = action.payload
    },
    laneChangeUpdated: (state, action: PayloadAction<LaneChange>) => { state.laneChange = action.payload },
    laneChangeCleared: (state) => { state.laneChange = null }
  }
})

export const {
  notificationPlaying,
  notificationStopped,
  notificationTextUpdated,
  lanesExpandedUpdated,
  lanesZoomedOutUpdated,
  alertInfoUpdated,
  alertInfoContentUpdated,
  laneChangeCleared,
  laneChangeUpdated,
  notificationPlayed,
} = infotainmentSlice.actions

export const selectNotification = (state: RootState) => state.infotainment.notificationPlaying
export const selectNotificationText = (state: RootState) => state.infotainment.notificationText
export const selectLanesExpanded = (state: RootState) => state.infotainment.lanes_expanded
export const selectLanesZoomedOut = (state: RootState) => state.infotainment.lanes_zoomed_out
export const selectAlertInfo = (state: RootState) => state.infotainment.alertInfo
export const selectAlertInfoContent = (state: RootState) => state.infotainment.alertInfoContent
export const selectLaneChange = (state: RootState) => state.infotainment.laneChange

//  _ emits updates local redux store, and sends event to server, no underscore dispatches directly to server?
export const notificationPlayed_ = (notification: NotificationDropdown) => {
  const action = notificationPlayed(notification)
  return thunkEmitDispatch<NotificationDropdown>('notification_played', [notification], action)
}


export const notificationTextUpdated_ = (new_text: string) => {
  const action = notificationTextUpdated(new_text)
  return thunkEmitDispatch<string>('notification_text_updated', [new_text], action)
}

export const notificationPlaying_ = () => {
  const action = notificationPlaying()
  return thunkEmitDispatch<undefined>('notification_played', [{ show: true, sound: true }], action)
}

export const lanesExpandedUpdated_ = (expanded: boolean) => {
  const action = lanesExpandedUpdated(expanded)
  return thunkEmitDispatch<boolean>('lanes_expanded', [expanded], action)
}

export const lanesZoomedOutUpdated_ = (expanded: boolean) => {
  const action = lanesZoomedOutUpdated(expanded)
  return thunkEmitDispatch<boolean>('lanes_zoomed_out', [expanded], action)
}

export const alertInfoUpdated_ = (alertInfo: boolean) => {
  const action = alertInfoUpdated(alertInfo)
  return thunkEmitDispatch<boolean>('alert_info_updated', [alertInfo], action)
}

export const alertInfoContentUpdated_ = (content: AlertInfoContent) => {
  const action = alertInfoContentUpdated(content)
  return thunkEmitDispatch<AlertInfoContent>('alert_info_content_updated', [content], action)
}

export const laneChangeUpdated_ = (laneChange: LaneChange) => {
  const action = laneChangeUpdated(laneChange)
  return thunkEmitDispatch<LaneChange>('lane_change_updated', [laneChange], action)
}

export const laneChangeCleared_ = () => {
  const action = laneChangeCleared()
  return thunkEmitDispatch<undefined>('lane_change_cleared', [], action)
}

export default infotainmentSlice.reducer