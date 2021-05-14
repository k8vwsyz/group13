import { LaneChange } from "../components/infotainment/Lanes"
import { Car } from "../interfaces/car"

export const calculateLaneChangeX = (laneChange: LaneChange, laneWidth: number, dividerWidth: number, arrowWidth: number) => {
  const { laneDivider } = laneChange
  const xCenter = laneWidth * laneDivider + dividerWidth * laneDivider
  return xCenter - arrowWidth / 2 // account for width of arrow
}

export const calculateLaneChangeY = (laneChange: LaneChange, height: number) => {
  // Y center of car - the height of the arrow. (Y is an offset from the top so larger number = further down on the component)
  return height * laneChange.height
}

export const calculateCarX = (car: Car, laneWidth: number, dividerWidth: number, carWidth: number) => {
  return laneWidth * car.lane + dividerWidth * car.lane + (laneWidth - carWidth) / 2
}

export const calculateCarY = (car: Car, height: number) => {
  return height * car.height
}