import { configureStore } from '@reduxjs/toolkit'
import carsReducer from './cars'
import infotainmentReducer from './infotainment'
import userReducer from './user'

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    infotainment: infotainmentReducer,
    user: userReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
