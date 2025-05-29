import { configureStore } from '@reduxjs/toolkit'
// import userReducer from './user/userSlice'
import adminViewSlice from './AdminView/AdminViewSlice'

export const store = configureStore({
  reducer: {
    // user: userReducer,
    adminView: adminViewSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
