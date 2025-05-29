import { configureStore } from '@reduxjs/toolkit'
// import userReducer from './user/userSlice'
import adminViewSlice from './AdminView/AdminViewSlice'
import userSlice from './user/userSlice'

export const store = configureStore({
  reducer: {
    // user: userReducer,
    adminView: adminViewSlice,
    user: userSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
