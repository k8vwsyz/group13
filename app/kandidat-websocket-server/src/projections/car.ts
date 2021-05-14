import { Car, LaneChange } from "../types/client_types"
import { CarEvent } from "../types/types"

export const projectCars = (carEvents: CarEvent[]) => {
  const reducer = (acc: Car[], cur: CarEvent) => { // O(n)
    switch (cur.kind) {
      case "car_added":
        acc.push(cur.payload) // O(1)
        return acc // O(1)
      case "car_moved":
        const i = acc.findIndex(e => e.id === cur.payload.id) // O(n)
        if (i !== -1) { acc[i] = cur.payload; return acc } else return acc // O(1)
      case "cars_removed":
        return [] // O(1)
      case "car_removed":
        return acc.filter(car => car.id !== cur.payload) // O(n)
      case "duration_changed":
        return acc.map(car => car.id === cur.payload.id ? { ...car, duration: cur.payload.duration } : car) // O(n)
      default:
        return acc // O(1)
    }
  }
  return carEvents.reduce(reducer, [])
}

export const projectLaneChange = (carEvents: CarEvent[]) => {
  const reducer = (acc: LaneChange | null, e: CarEvent) => {
    if (e.kind === "lane_change_updated")
      return e.payload
    else if (e.kind === "lane_change_cleared")
      return null
    else
      return acc
  }
  return carEvents.reduce(reducer, null)
}
