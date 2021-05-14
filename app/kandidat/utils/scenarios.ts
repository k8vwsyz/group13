import { LaneChange } from "../components/infotainment/Lanes"
import { Car } from "../interfaces/car"
import {
  addArrow,
  addMultipleCars,
  displayArrowAndMoveCar,
  distanceAlert0,
  distanceAlert1,
  distanceAlert2,
  distanceAlert3,
  distanceAlert4,
  distanceAlert5,
  distanceAlert6,
  handlePlayNotification,
  handleRemoveCars,
  hideAlert,
  hideLaneChangeArrow,
  moveCar,
  moveCarDuration,
  msgEVapproaching,
  msgEVleaving,
  msgRemainingInLane,
  msgSwitchedLanes,
  removeCar,
  showAlert,
  showLaneChangeArrow
} from "./infotainment_actions"

export const laneChange = async () => {
  const mainCar: Car = { id: "0", duration: 1.8, sprite: "car1s.png", hwRatio: 1.44, lane: 0, height: 55 / 100, role: "main" }
  const car0: Car = { id: "1", duration: 1.8, sprite: "car5s.png", hwRatio: 1.44, lane: 1, height: 25 / 100, role: "generic" }
  const car1: Car = { id: "2", duration: 1.8, sprite: "truck.png", hwRatio: 4, lane: 2, height: 50 / 100, role: "generic" }
  const car2: Car = { id: "3", duration: 1.8, sprite: "car5s.png", hwRatio: 1.44, lane: 2, height: 95 / 100, role: "generic" }
  const EV: Car = { id: "4", duration: 10.0, sprite: "EV.png", hwRatio: 2, lane: 0, height: 100 / 100, role: "ev" }

  addMultipleCars([mainCar, car0, car1, car2, EV])

  setTimeout(() => { msgEVapproaching(); handlePlayNotification(true) }, 6000);
  const laneChangeMainCar: LaneChange = { laneDivider: 1, direction: "right", height: 45 / 100, cancelling: false }
  setTimeout(() => { addArrow("arrow-1", 0, 0.85, 1.8) }, 15000)

  setTimeout(() => { showAlert(); distanceAlert0() }, 17000)
  setTimeout(() => { displayArrowAndMoveCar(mainCar, laneChangeMainCar, 1, 50 / 100) }, 19000)
  setTimeout(() => { showAlert(); distanceAlert1() }, 19000)
  setTimeout(() => { showAlert(); distanceAlert2() }, 21000)
  setTimeout(() => { showAlert(); distanceAlert3() }, 23000)
  setTimeout(() => { showAlert(); distanceAlert4() }, 25000)
  setTimeout(() => { showAlert(); distanceAlert5() }, 26000)
  setTimeout(() => { showAlert(); distanceAlert6() }, 27000)
  setTimeout(() => { moveCar(EV, 0, -1) }, 28000)
  setTimeout(() => { removeCar("arrow-1") }, 30500)

  setTimeout(() => { hideAlert() }, 31000)
  setTimeout(() => { msgEVleaving(); handlePlayNotification(false) }, 35000)
  setTimeout(() => { handleRemoveCars() }, 42000)
}

export const noLaneChange = async () => {
  const mainCar: Car = { id: "0", duration: 1.8, sprite: "car1s.png", hwRatio: 1.44, lane: 1, height: 55 / 100, role: "main" }
  const car0: Car = { id: "1", duration: 1.8, sprite: "truck.png", hwRatio: 4, lane: 2, height: 25 / 100, role: "generic" }
  const car1: Car = { id: "2", duration: 1.8, sprite: "car5s.png", hwRatio: 1.44, lane: 2, height: 5 / 100, role: "generic" }
  const car2: Car = { id: "3", duration: 1.8, sprite: "car5s.png", hwRatio: 1.44, lane: 1, height: 90 / 100, role: "generic" }
  const EV: Car = { id: "4", duration: 10.0, sprite: "EV.png", hwRatio: 2, lane: 0, height: 100 / 100, role: "ev" }

  addMultipleCars([mainCar, car0, car1, car2, EV])


  setTimeout(() => { msgEVapproaching(); handlePlayNotification(true) }, 6000);
  setTimeout(() => { addArrow("arrow-1", 0, 0.85, 1.8) }, 15000)

  setTimeout(() => { showAlert(); distanceAlert0() }, 17000)
  setTimeout(() => { showAlert(); distanceAlert1() }, 19000)
  setTimeout(() => { showAlert(); distanceAlert2() }, 21000)
  setTimeout(() => { showAlert(); distanceAlert3() }, 23000)
  setTimeout(() => { showAlert(); distanceAlert4() }, 25000)
  setTimeout(() => { showAlert(); distanceAlert5() }, 26000)
  setTimeout(() => { showAlert(); distanceAlert6() }, 27000)
  setTimeout(() => { moveCar(EV, 0, -1) }, 28000)
  setTimeout(() => { removeCar("arrow-1") }, 30500)

  setTimeout(() => { hideAlert() }, 31000)
  setTimeout(() => { msgEVleaving(); handlePlayNotification(false) }, 35000)
  setTimeout(() => { handleRemoveCars() }, 42000)
}

export const cancellingMove = async () => {
  const mainCar: Car = { id: "0", duration: 1.8, sprite: "car1s.png", hwRatio: 1.44, lane: 0, height: 50 / 100, role: "main" }
  const car0: Car = { id: "1", duration: 1.8, sprite: "truck.png", hwRatio: 4, lane: 0, height: 13 / 100, role: "generic" }
  const car1: Car = { id: "2", duration: 1.8, sprite: "car5s.png", hwRatio: 1.44, lane: 2, height: 60 / 100, role: "generic" }
  const car2: Car = { id: "3", duration: 1.8, sprite: "car5s.png", hwRatio: 1.44, lane: 1, height: 77 / 100, role: "generic" }
  const EV: Car = { id: "4", duration: 10.0, sprite: "EV.png", hwRatio: 2, lane: 1, height: 100 / 100, role: "ev" }
  const arrow: Car = { id: "arrow", duration: 1.0, sprite: "down_arrow_2.png", hwRatio: 2, lane: 0, height: 0.85, role: "generic" }

  addMultipleCars([mainCar, car0, car1, car2, EV])

  setTimeout(() => { msgEVapproaching(); handlePlayNotification(true) }, 6000);
  const laneChangeMainCar: LaneChange = { laneDivider: 1, direction: "right", height: 40 / 100, cancelling: false }
  setTimeout(() => { addMultipleCars([arrow]) }, 15000)

  setTimeout(() => { showAlert(); distanceAlert0() }, 17000)
  //interrupted! (should display the crossed-over animation)
  setTimeout(() => { showLaneChangeArrow(laneChangeMainCar) }, 21000)
  //EV switch lane!
  setTimeout(() => { moveCarDuration(arrow, 1, 0.85, 1.0) }, 22000)
  //new messages
  setTimeout(() => { showLaneChangeArrow({ ...laneChangeMainCar, cancelling: true }) }, 23000)
  setTimeout(() => { msgSwitchedLanes(); handlePlayNotification(false) }, 23000);
  setTimeout(() => { msgRemainingInLane(); handlePlayNotification(false) }, 27000);
  setTimeout(() => { hideLaneChangeArrow() }, 32000)

  setTimeout(() => { showAlert(); distanceAlert1() }, 20000)
  setTimeout(() => { showAlert(); distanceAlert2() }, 23000)
  setTimeout(() => { hideAlert() }, 23000)
  setTimeout(() => { moveCar(car2, 2, 74 / 100) }, 24000)
  setTimeout(() => { moveCar(EV, 1, -1) }, 32000)
  setTimeout(() => { removeCar("arrow") }, 33500)

  setTimeout(() => { msgEVleaving(); handlePlayNotification(false) }, 39000)
  setTimeout(() => { handleRemoveCars() }, 47000)
}
