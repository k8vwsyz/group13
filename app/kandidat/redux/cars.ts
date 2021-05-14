import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Car, NewCar } from '../interfaces/car'
import { thunkEmitDispatch } from './genericThunk'

export interface CarsState {
  cars: Car[]
}

export type DurationChanged = {
  id: string,
  duration: number
}

const initialState: CarsState = {
  cars: [],
}


export const carMoved_ = (car: Car) => {
  const action = carMovedSimple(car)
  return thunkEmitDispatch('car_moved', [car], action)
}


const randomElement = (sprites: any[]): any => sprites[Math.floor(Math.random() * sprites.length)]

const sprites = [
  { sprite: "car5s.png", ratio: 1.441860465 },
  { sprite: "truck.png", ratio: 4 },
]

export const newCarAdded_ = (newCar: NewCar) => {
  const id = nanoid()
  const { sprite, ratio } = randomElement(sprites)
  const car: Car = { id, sprite, hwRatio: ratio, duration: 1.8, ...newCar }
  const action = carAddedSimple(car)
  return thunkEmitDispatch('car_added', [car], action)
}

export const carAdded_ = (car: Car) => {
  const action = carAddedSimple(car)
  return thunkEmitDispatch('car_added', [car], action)
}

export const carsRemoved_ = () => {
  const action = carsRemoved()
  return thunkEmitDispatch('cars_removed', [], action)
}

export const carRemoved_ = (id: string) => {
  const action = carRemoved(id)
  return thunkEmitDispatch('car_removed', [id], action)
}

export const carDurationChanged_ = (id: string, duration: number) => {
  const action = carDurationChanged({ id, duration })
  return thunkEmitDispatch('car_duration_changed', [id, duration], action)
}

export const counterSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    carAddedSimple: (state, action: PayloadAction<Car>) => { state.cars.push(action.payload) },
    carMovedSimple: (state, action: PayloadAction<Car>) => {
      const { id } = action.payload
      const carId = state.cars.findIndex(car => car.id === id)
      if (carId !== -1)
        state.cars[carId] = action.payload
    },
    carsRemoved: (state) => { state.cars = [] },
    carRemoved: (state, action: PayloadAction<string>) => {
      const newCars = state.cars.filter(car => car.id !== action.payload)
      state.cars = newCars
    },
    carDurationChanged: (state, action: PayloadAction<DurationChanged>) => {
      const { id, duration } = action.payload
      const carId = state.cars.findIndex(car => car.id === id)
      if (carId !== -1)
        state.cars[carId].duration = duration
    }
  }
})

export const { carAddedSimple, carMovedSimple, carsRemoved, carRemoved, carDurationChanged } = counterSlice.actions

export const selectCars = (state: RootState) => state.cars.cars

export default counterSlice.reducer

