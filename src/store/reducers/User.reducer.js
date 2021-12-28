import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    UserData: null,
    IsAuth: false,
    Token: "",
    Tasks: [],
}

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {

        setUserDataSuccess: (state, action) => {
            state.UserData = action.payload.User
            state.Token = action.payload.Token
            state.IsAuth = true

            AsyncStorage.setItem('@Token', action.payload.Token)
            AsyncStorage.setItem('@UserData', JSON.stringify(action.payload.User))
        },
        Logout: (state, action) => {
            state.UserData = null
            state.Token = ""
            state.IsAuth = false

            AsyncStorage.removeItem('@Token')
            AsyncStorage.removeItem('@UserData')
        },
        SetTasks: (state, action) => {
            state.Tasks = action.payload || []
        },
        Addtask: (state, action) => {
            state.Tasks = [action.payload, ...state.Tasks,]
        },
        DeleteTask: (state, action) => {
            state.Tasks = state.Tasks.filter(x => x.id !== action.payload)
        },
        UpdateTask: (state, action) => {

            const index = state.Tasks.findIndex(x => x.id == action.payload.id)
            const newArr = state.Tasks
            newArr[index] = action.payload

            state.Tasks = newArr
        },

    },
})

export const { setUserDataSuccess, Logout, SetTasks, Addtask, DeleteTask, UpdateTask } = UserSlice.actions

export default UserSlice.reducer