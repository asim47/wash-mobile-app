import { configureStore } from '@reduxjs/toolkit'
import CommonReducer from './reducers/Common.reducer'
import UserReducer from './reducers/User.reducer'

export const store = configureStore({
    reducer: {
        common: CommonReducer,
        User:UserReducer,
    },
})