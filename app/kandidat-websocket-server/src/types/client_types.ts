
// yoinked from frontend. TODO replace "left" | "right" with angle in degrees as a number
export type LaneChange = {
  laneDivider: number, // 1 indexed -- e.g. 1 is between the first (0) and second (1) lane
  direction: "left" | "right"
  height: number,
  cancelling: boolean
}

// yoinking more types :D
export type NotificationDropdown = {
  show: boolean,
  sound: boolean,
}

export type Role = 'generic' | 'main' | 'ev'

export type Car = {
  id: string,
  lane: number,
  height: number,
  sprite: string,
  hwRatio: number,
  role: Role,
  duration: number
}

export type AlertInfoContent = {
  amount: number,
  distance: number,
}

export type DurationChangedType = {
  id: string,
  duration: number
}

export type Infotainment = {
  cars: Car[],
  zoomedOut: boolean,
  expanded: boolean,
  notificationText: string,
  alertInfo: boolean,
  alertInfoContent: AlertInfoContent
}
