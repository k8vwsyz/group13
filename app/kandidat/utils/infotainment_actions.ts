import { LaneChange } from "../components/infotainment/Lanes"
import { Car } from "../interfaces/car"
import { carAdded_, carMoved_, carRemoved_, carsRemoved_ } from "../redux/cars"
import { alertInfoContentUpdated_, alertInfoUpdated_, laneChangeCleared_, laneChangeUpdated_, notificationPlayed_, notificationTextUpdated_ } from "../redux/infotainment"
import { store } from "../redux/store"

export const addMultipleCars = (cars: Car[]) => {
  cars.forEach(car => store.dispatch(carAdded_(car)))
}

// change notification msg
export const changeMsg = async (msg: string) => store.dispatch(notificationTextUpdated_(msg))
export const msgEVapproaching = async () => await changeMsg("Emergency Vehicle Approaching")
export const msgEVleaving = async () => await changeMsg("Emergency Vehicle Has Departed")
export const msgSwitchedLanes = async () => await changeMsg("Emergency Vehicle Switched Lane")
export const msgRemainingInLane = async () => await changeMsg("Remaining In Current Lane To Give Way")

// show and hide the information drop down
export const showAlert = () => store.dispatch(alertInfoUpdated_(true))
export const hideAlert = () => store.dispatch(alertInfoUpdated_(false))

//Decrementing distance to EV
export const changeDistanceAmount = async (distance: number, amount: number) => {
  const alertContent = { distance, amount }
  return store.dispatch(alertInfoContentUpdated_(alertContent))
}
export const distanceAlert0 = () => changeDistanceAmount(500, 1)
export const distanceAlert1 = () => changeDistanceAmount(400, 1)
export const distanceAlert2 = () => changeDistanceAmount(300, 1)
export const distanceAlert3 = () => changeDistanceAmount(200, 1)
export const distanceAlert4 = () => changeDistanceAmount(100, 1)
export const distanceAlert5 = () => changeDistanceAmount(50, 1)
export const distanceAlert6 = () => changeDistanceAmount(0, 1)

// show the notification for 10 seconds
export const handlePlayNotification = (playSound: boolean) => {
  store.dispatch(notificationPlayed_({ show: true, sound: playSound }))
  setTimeout(() => { store.dispatch(notificationPlayed_({ show: false, sound: playSound })) }, 10000)
}

// adds the bottom arrow that indicates where the Ev is
export const addArrow = (id: string, lane: number, height: number, duration: number) => {
  store.dispatch(carAdded_({ id, lane, height, duration, hwRatio: 2, sprite: "down_arrow_2.png", role: "generic" }))
}

// moves a car to some lane
export const displayArrowAndMoveCar = (car: Car, laneChange: LaneChange, lane: number, height: number) => {
  showLaneChangeArrow(laneChange) // show lane change arrow
  setTimeout(() => { store.dispatch(carMoved_({ ...car, lane, height })) }, 4000) // move car
  setTimeout(() => { hideLaneChangeArrow() }, 4500)// hide lane change arrow
}

// moves the car to a lane and height
export const moveCar = (car: Car, lane: number, height: number) => store.dispatch(carMoved_({ ...car, lane, height }))
// same as moveCar except the lane change uses a custom transition duration
export const moveCarDuration = (car: Car, lane: number, height: number, duration: number) => store.dispatch(carMoved_({ ...car, lane, height, duration }))

// removes all cars
export const handleRemoveCars = () => store.dispatch(carsRemoved_())
// only removes a single car with the id 'id'
export const removeCar = (id: string) => store.dispatch(carRemoved_(id))

// shows the lane change arrow
export const showLaneChangeArrow = (laneChange: LaneChange) => store.dispatch(laneChangeUpdated_(laneChange))
// hides lane change arrow
export const hideLaneChangeArrow = () => store.dispatch(laneChangeCleared_())

