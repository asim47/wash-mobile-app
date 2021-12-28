import axios from "axios"
import { Alert } from "react-native"
import { END_POINT } from "../../utils/constants"
import * as ReducerActions from "../reducers"




export const RegisterFunction = (Name, Email, Pass, Address) => async (dispatch, getState) => {
    try {

        const body = {
            "Name": Name,
            "Email": Email,
            "Address": Address,
            "Password": Pass
        }


        const res = await axios.post(`${END_POINT}/api/v1/user/`, body);
        dispatch(ReducerActions.setUserDataSuccess(res.data))

    } catch (error) {
        console.log(error)
        console.log(error?.response?.data?.Msg)
        return error?.response?.data?.Msg || "Something went wrong"
    }
}



export const LoginFunction = (Email, Pass) => async (dispatch, getState) => {
    try {

        const body = {
            "Email": Email,
            "Password": Pass
        }


        const res = await axios.post(`${END_POINT}/api/v1/user/login`, body);

        dispatch(ReducerActions.setUserDataSuccess(res.data))

    } catch (error) {
        console.log(error)
        console.log(error?.response?.data?.Msg)
        return error?.response?.data?.Msg || "Something went wrong"
    }
}



export const GetTasks = () => async (dispatch, getState) => {
    try {


        const res = await axios.get(`${END_POINT}/api/v1/user/task`, {
            headers: {
                "x-auth-token": getState().User.Token
            }
        });


        dispatch(ReducerActions.SetTasks(res.data.Tasks))

    } catch (error) {
        console.log(error)
        console.log(error?.response?.data?.Msg)
        return error?.response?.data?.Msg || "Something went wrong"
    }
}



export const AddNewTask = (summary) => async (dispatch, getState) => {
    try {


        const res = await axios.post(`${END_POINT}/api/v1/user/task`, {
            "Summary": summary
        }, {
            headers: {
                "x-auth-token": getState().User.Token
            }
        });


        dispatch(ReducerActions.Addtask(res.data.Task))

    } catch (error) {
        console.log(error)
        console.log(error?.response?.data?.Msg)
        return error?.response?.data?.Msg || "Something went wrong"
    }
}



export const DeleteTask = (ID) => async (dispatch, getState) => {
    try {


        const res = await axios.delete(`${END_POINT}/api/v1/user/task?TaskID=${ID}`, {
            headers: {
                "x-auth-token": getState().User.Token
            }
        });


        dispatch(ReducerActions.DeleteTask(ID))

        Alert.alert("Task deleted successfully!")

    } catch (error) {
        console.log(error)
        console.log(error?.response?.data?.Msg)
        return error?.response?.data?.Msg || "Something went wrong"
    }
}

export const UpdateStaus = (ID, Status) => async (dispatch, getState) => {
    try {


        const res = await axios.put(`${END_POINT}/api/v1/user/task`, {
            "TaskID": ID,
            "IsDone": Status
        }, {
            headers: {
                "x-auth-token": getState().User.Token
            }
        });


        dispatch(ReducerActions.UpdateTask(res.data.UpdatedTask))

        Alert.alert("Task updated successfully!")

    } catch (error) {
        console.log(error)
        console.log(error?.response?.data?.Msg)
        return error?.response?.data?.Msg || "Something went wrong"
    }
}


export const UpdateSummary = (ID, Summary) => async (dispatch, getState) => {
    try {


        const res = await axios.put(`${END_POINT}/api/v1/user/task`, {
            "TaskID": ID,
            "Summary": Summary
        }, {
            headers: {
                "x-auth-token": getState().User.Token
            }
        });


        dispatch(ReducerActions.UpdateTask(res.data.UpdatedTask))

        Alert.alert("Task updated successfully!")

    } catch (error) {
        console.log(error)
        console.log(error?.response?.data?.Msg)
        return error?.response?.data?.Msg || "Something went wrong"
    }
}


export const VerifyToken = (Token) => async (dispatch, getState) => {
    try {


        const res = await axios.get(`${END_POINT}/api/v1/user/verifyToken`, {
            headers: {
                "x-auth-token": Token
            }
        });


        dispatch(ReducerActions.setUserDataSuccess(res.data))

        // Alert.alert("Task updated successfully!")

    } catch (error) {
        console.log(error)
        console.log(error?.response?.data?.Msg)

        dispatch(ReducerActions.Logout())
    }
}