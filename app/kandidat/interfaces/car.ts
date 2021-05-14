/* Types for creating a new car in the top-down view of the infotainment system.
 Once the "add car"-button is pressed a NewCar is created.
 When the new car is to be put on the screen it is given a random id and thus
 is converted to a Car. */


export type Role = 'generic' | 'main' | 'ev'

export interface Car {
  id: string,
  lane: number,
  height: number,
  sprite: string,
  hwRatio: number,
  role: Role,
  duration: number
}


export interface NewCar {
  lane: number,
  height: number
  role: Role
}

export interface AlertInfoContent {
  distance: number,
  amount: number,
}

export type Infotainment = {
  cars: Car[],
  zoomedOut: boolean,
  expanded: boolean,
  notificationText: string,
  alertInfo: boolean,
  alertInfoContent: AlertInfoContent
}
