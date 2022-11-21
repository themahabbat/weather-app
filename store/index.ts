import { configureStore } from '@reduxjs/toolkit'
import { weatherSlice } from './slices/weather'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    [weatherSlice.name]: weatherSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
