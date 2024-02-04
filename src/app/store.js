import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/slices/userSlice'
import counterReducer from '../features/counter/counterSlice'
export default configureStore({
  reducer: {
    use: userReducer,
    counter: counterReducer
  }
})