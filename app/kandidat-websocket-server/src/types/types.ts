import { AlertInfoContent, Car, DurationChangedType, LaneChange, NotificationDropdown } from "./client_types"
import { Admin, Room, SocketId } from "./server_types"

// ===================
// == General types == 
// ===================

export type Meta = {
  id: number,
  timestamp: Date,
  admin: Admin,
  room: Room
}

// ================
// == Car events ==
// ================

export type CarMetaEvent = {
  carEvent: CarEvent,
  meta: Meta
}

export type CarEvent =
  CarAdded
  | CarMoved
  | NotificationPlayed
  | LanesExpanded
  | LanesZoomedOut
  | NotificationTextUpdated
  | AlertInfoUpdated
  | AlertInfoContentUpdated
  | LaneChangeUpdated
  | LaneChangeCleared
  | CarsRemoved
  | CarRemoved
  | DurationChanged

export type CarAdded = { kind: "car_added", payload: Car }

export type CarMoved = { kind: "car_moved", payload: Car }

export type NotificationPlayed = { kind: "notification_played", payload: NotificationDropdown }

export type LanesExpanded = { kind: "lanes_expanded", payload: boolean }
//[move(x,y2, id??) ]

export type LanesZoomedOut = { kind: "lanes_zoomed_out", payload: boolean }

export type NotificationTextUpdated = { kind: "notification_text_updated", payload: string }

export type AlertInfoUpdated = { kind: "alert_info_updated", payload: boolean }

export type AlertInfoContentUpdated = { kind: "alert_info_content_updated", payload: AlertInfoContent }

export type LaneChangeUpdated = { kind: "lane_change_updated", payload: LaneChange }

export type LaneChangeCleared = { kind: "lane_change_cleared" }

export type CarsRemoved = { kind: "cars_removed" }

export type CarRemoved = { kind: "car_removed", payload: string }

export type DurationChanged = { kind: "duration_changed", payload: DurationChangedType }

// =================
// == Room events ==
// =================

export type RoomEvent =
  RoomCreated
  | RoomAssociate
  | ClientCreated
  | ClientJoined
  | ClientLeft

export type RoomCreated = {
  kind: "room_created",
  admin: Admin,
  room_name: Room
}

export type RoomAssociate = {
  kind: "associate"
  admin: Admin
  socket_id: SocketId
}

export type ClientCreated = {
  kind: "client_created",
  admin: Admin,
  client_name: string
}

export type ClientJoined = {
  kind: "client_joined",
  client_name: string,
  socket_id: SocketId
}

export type ClientLeft = {
  kind: "client_left",
  client_name: string,
  socket_id: SocketId
}
